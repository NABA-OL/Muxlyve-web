// Desarrollado por BlacKraken Solutions
import { NextRequest, NextResponse } from "next/server";
import { createLicense, cancelLicense, softCancelLicense } from "@/lib/licenses";
import { sendLicenseEmail } from "@/lib/email";
import { sendTelegramMessage, escapeTelegramHtml, telegramSpoiler } from "@/lib/telegram";
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
// Hard cancel: revoke access immediately, evict devices
const HARD_CANCEL_TYPES = new Set(["license.cancelled", "license.expired", "refund.created"]);
// Soft cancel: user cancelled auto-renew, access continues until period ends
const SOFT_CANCEL_TYPES = new Set(["subscription.cancelled"]);

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

  if (HARD_CANCEL_TYPES.has(type)) {
    if (licenseKey) {
      await ensureSchema();
      await cancelLicense(licenseKey);
    }
    return NextResponse.json({ ok: true, type });
  }

  if (SOFT_CANCEL_TYPES.has(type)) {
    if (licenseKey) {
      const sub = objects?.subscription as Record<string, unknown> | undefined;
      const nextPayment = sub?.next_payment as Record<string, unknown> | string | undefined;
      const expiryStr = (typeof nextPayment === "object" ? nextPayment?.date : nextPayment) as string | undefined;
      const expiresAt = expiryStr ? new Date(expiryStr) : null;
      await ensureSchema();
      await softCancelLicense(licenseKey, expiresAt);
    }
    return NextResponse.json({ ok: true, type });
  }

  if (!PURCHASE_TYPES.has(type)) {
    return NextResponse.json({ ok: true, skipped: true, type });
  }

  const purchase = (objects?.purchase ?? objects?.payment) as Record<string, unknown> | undefined;
  const subscription = objects?.subscription as Record<string, unknown> | undefined;
  const user = objects?.user as Record<string, unknown> | undefined;
  const email = (user?.email ?? purchase?.billing_email) as string | undefined;
  const orderId = (purchase?.id as string | number | undefined)?.toString() ?? null;
  const first = (user?.first as string | undefined)?.trim();
  const last = (user?.last as string | undefined)?.trim();
  const name = [first, last].filter(Boolean).join(" ").trim() || null;

  // Determine plan from subscription billing_cycle; no subscription = lifetime
  // Freemius sends billing_cycle as a number: 1 = monthly, 12 = annual
  let plan: "monthly" | "annual" | "lifetime" = "lifetime";
  let renewsAt: Date | null = null;
  if (subscription) {
    const cycle = Number(subscription.billing_cycle ?? 1);
    plan = cycle >= 12 ? "annual" : "monthly";
    const nextDate = (subscription.next_payment as Record<string, unknown> | undefined)?.date as string | undefined
      ?? subscription.next_payment as string | undefined;
    if (nextDate) renewsAt = new Date(nextDate);
  }

  if (!email || !licenseKey) {
    console.error("Freemius webhook: missing email or license key. objects:", JSON.stringify(objects));
    return NextResponse.json({ error: "Missing email or key" }, { status: 400 });
  }

  await ensureSchema();
  await createLicense({ key: licenseKey, email, orderId: orderId ?? undefined, plan, renewsAt, name });
  await sendLicenseEmail(email, licenseKey).catch(() => {});
  await sendTelegramMessage(
    [
      "💰 Nueva compra",
      `Email: ${escapeTelegramHtml(email)}`,
      `Plan: ${escapeTelegramHtml(plan)}`,
      `Licencia: ${telegramSpoiler(licenseKey)}`,
    ].join("\n"),
    "purchases",
    "HTML",
  ).catch(() => {});

  return NextResponse.json({ ok: true });
}
