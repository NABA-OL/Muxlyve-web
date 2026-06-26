import { NextRequest, NextResponse } from "next/server";
import { createLicense, cancelLicense } from "@/lib/licenses";
import { sendLicenseEmail } from "@/lib/email";
import { ensureSchema } from "@/lib/db";

async function verifyFreemius(req: NextRequest, body: string): Promise<boolean> {
  const secret = process.env.FREEMIUS_SECRET_KEY;
  if (!secret) return false;

  const sig = req.headers.get("x-signature") ?? req.headers.get("x-fs-signature");
  if (!sig) return false;

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret.trim()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const hmac = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(body));
  const expectedHex = Buffer.from(hmac).toString("hex");
  const expectedB64 = Buffer.from(hmac).toString("base64");
  return sig === expectedHex || sig === expectedB64;
}

const PURCHASE_TYPES = new Set(["license.created", "subscription.created"]);
const CANCEL_TYPES = new Set([
  "license.cancelled",
  "license.expired",
  "subscription.cancelled",
  "refund.created",
]);

export async function POST(req: NextRequest) {
  const body = await req.text();

  const valid = await verifyFreemius(req, body);
  if (!valid) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let payload: Record<string, unknown>;
  try {
    payload = JSON.parse(body) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const type = payload.type as string;
  console.log("Freemius type:", type, "objects keys:", Object.keys((payload.objects as Record<string, unknown>) ?? {}).join(", "));

  const objects = payload.objects as Record<string, unknown> | undefined;
  const license = objects?.license as Record<string, unknown> | undefined;
  const licenseKey = license?.secret_key as string | undefined;

  if (CANCEL_TYPES.has(type)) {
    if (licenseKey) {
      await ensureSchema();
      await cancelLicense(licenseKey);
    }
    return NextResponse.json({ ok: true, type });
  }

  if (!PURCHASE_TYPES.has(type)) {
    return NextResponse.json({ ok: true, skipped: true, type });
  }

  const purchase = (objects?.purchase ?? objects?.payment) as Record<string, unknown> | undefined;
  const user = objects?.user as Record<string, unknown> | undefined;
  const email = (user?.email ?? purchase?.billing_email) as string | undefined;
  const orderId = (purchase?.id as string | number | undefined)?.toString() ?? null;

  if (!email || !licenseKey) {
    console.error("Freemius webhook: missing email or license key. objects:", JSON.stringify(objects));
    return NextResponse.json({ error: "Missing email or key" }, { status: 400 });
  }

  await ensureSchema();
  await createLicense({ key: licenseKey, email, orderId: orderId ?? undefined });
  await sendLicenseEmail(email, licenseKey).catch(() => {});

  return NextResponse.json({ ok: true });
}
