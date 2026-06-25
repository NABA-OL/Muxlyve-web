import { NextRequest, NextResponse } from "next/server";
import { createLicense } from "@/lib/licenses";
import { sendLicenseEmail } from "@/lib/email";
import { ensureSchema } from "@/lib/db";

// Freemius firma el cuerpo del webhook con HMAC-SHA256.
// Verifica el header exacto en: Freemius Dashboard → App → Webhooks.
// Normalmente es "x-fs-signature" o "x-wc-webhook-signature".
async function verifyFreemius(req: NextRequest, body: string): Promise<boolean> {
  const secret = process.env.FREEMIUS_SECRET_KEY;
  if (!secret) return false;

  const sig =
    req.headers.get("x-fs-signature") ??
    req.headers.get("x-wc-webhook-signature");
  if (!sig) return false;

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const hmac = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(body),
  );
  const expected = Buffer.from(hmac).toString("hex");
  return sig === expected;
}

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

  // Freemius events: "purchase.completed", "subscription.new", etc.
  // Ajusta los nombres de campo según el payload real de Freemius.
  const event = payload.event as string;
  if (!["purchase.completed", "subscription.new"].includes(event)) {
    return NextResponse.json({ ok: true, skipped: true });
  }

  const purchase = payload.purchase as Record<string, unknown> | undefined;
  const license = (payload.license ?? purchase?.license) as
    | Record<string, unknown>
    | undefined;

  const email = (purchase?.billing_email ?? payload.email) as string;
  const key = license?.secret_key as string;
  const orderId = (purchase?.id as string | undefined) ?? null;

  if (!email || !key) {
    return NextResponse.json({ error: "Missing email or key" }, { status: 400 });
  }

  await ensureSchema();
  await createLicense({ key, email, orderId: orderId ?? undefined });
  await sendLicenseEmail(email, key).catch(() => {
    // Email failure no bloquea la respuesta al webhook
  });

  return NextResponse.json({ ok: true });
}
