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

  // Log all headers for debugging (names only, not values)
  console.log("Freemius webhook headers:", [...req.headers.keys()].join(", "));

  const sig =
    req.headers.get("x-signature") ??
    req.headers.get("x-fs-signature") ??
    req.headers.get("x-wc-webhook-signature") ??
    req.headers.get("x-freemius-signature");

  if (!sig) {
    console.error("Freemius webhook: no signature header found");
    return false;
  }

  console.log("Freemius sig header present, length:", sig.length);

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret.trim()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const hmac = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(body),
  );
  const expectedHex = Buffer.from(hmac).toString("hex");
  const expectedB64 = Buffer.from(hmac).toString("base64");

  const match = sig === expectedHex || sig === expectedB64;
  if (!match) {
    console.error("Freemius sig mismatch — sig length:", sig.length, "hex length:", expectedHex.length);
  }
  return match;
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

  const event = payload.event as string;
  console.log("Freemius event:", event, "keys:", Object.keys(payload).join(", "));
  if (!["purchase.completed", "subscription.new", "purchase.new", "payment.new"].includes(event)) {
    return NextResponse.json({ ok: true, skipped: true, event });
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
