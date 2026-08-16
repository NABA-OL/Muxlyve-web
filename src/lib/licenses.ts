// Desarrollado por BlacKraken Solutions
import { createHmac } from "crypto";
import { getDb } from "./db";

export interface License {
  key: string;
  email: string;
  status: "active" | "cancelled" | "refunded" | "disabled";
  max_devices: number;
  devices: string[];
  order_id: string | null;
  plan: "monthly" | "annual" | "lifetime" | null;
  renews_at: string | null;
  expires_at: string | null;
  created_at: string;
}

// Keys stored as HMAC-SHA256 so DB leak doesn't expose usable keys.
// KEY_HASH_SECRET must be set in env; without it keys are stored plaintext (unsafe).
function hashKey(key: string): string {
  const secret = process.env.KEY_HASH_SECRET;
  if (!secret) return key; // ponytail: fallback keeps app working before env is set
  return createHmac("sha256", secret).update(key.trim()).digest("hex");
}

export async function findLicense(key: string): Promise<License | null> {
  const sql = getDb();
  const rows = await sql`SELECT * FROM licenses WHERE key = ${hashKey(key)}`;
  return (rows[0] as License) ?? null;
}

export async function findLicensesByEmail(email: string): Promise<License[]> {
  const sql = getDb();
  const rows = await sql`
    SELECT * FROM licenses WHERE email ILIKE ${email} ORDER BY created_at DESC LIMIT 10
  `;
  return rows as License[];
}

export async function createLicense(data: {
  key: string;
  email: string;
  orderId?: string;
  maxDevices?: number;
  plan?: "monthly" | "annual" | "lifetime";
  renewsAt?: Date | null;
}): Promise<void> {
  const sql = getDb();
  await sql`
    INSERT INTO licenses (key, email, order_id, max_devices, plan, renews_at)
    VALUES (
      ${hashKey(data.key)}, ${data.email}, ${data.orderId ?? null},
      ${data.maxDevices ?? 2}, ${data.plan ?? null}, ${data.renewsAt ?? null}
    )
    ON CONFLICT (key) DO UPDATE
      SET status = 'active', devices = '[]'::jsonb,
          email = EXCLUDED.email, order_id = EXCLUDED.order_id,
          plan = EXCLUDED.plan, renews_at = EXCLUDED.renews_at
      WHERE licenses.status IN ('cancelled', 'refunded', 'disabled')
  `;
}

export async function activateDevice(
  key: string,
  machineId: string,
): Promise<License> {
  const sql = getDb();
  const hashed = hashKey(key);

  const existing = await sql`
    SELECT * FROM licenses WHERE key = ${hashed} AND devices @> ${JSON.stringify([machineId])}::jsonb
  `;
  if (existing[0]) return existing[0] as License;

  const rows = await sql`
    UPDATE licenses
    SET devices = devices || ${JSON.stringify([machineId])}::jsonb
    WHERE key = ${hashed}
      AND status = 'active'
      AND jsonb_array_length(devices) < max_devices
    RETURNING *
  `;
  if (!rows[0]) throw new Error("DEVICE_LIMIT_REACHED_OR_INVALID");
  return rows[0] as License;
}

export async function validateDevice(
  key: string,
  machineId: string,
): Promise<License> {
  const sql = getDb();
  const rows = await sql`
    SELECT * FROM licenses
    WHERE key = ${hashKey(key)}
      AND status = 'active'
      AND devices @> ${JSON.stringify([machineId])}::jsonb
  `;
  if (!rows[0]) throw new Error("NOT_FOUND");
  return rows[0] as License;
}

export async function cancelLicense(key: string): Promise<void> {
  const sql = getDb();
  await sql`
    UPDATE licenses
    SET status = 'cancelled', devices = '[]'::jsonb
    WHERE key = ${hashKey(key)}
  `;
}

// User cancelled auto-renewal but access continues until period end.
// Keep status=active and devices; clear renewsAt, set expiresAt.
export async function softCancelLicense(key: string, expiresAt?: Date | null): Promise<void> {
  const sql = getDb();
  await sql`
    UPDATE licenses SET renews_at = NULL, expires_at = ${expiresAt ?? null}
    WHERE key = ${hashKey(key)}
  `;
}

export async function releaseDevice(
  key: string,
  machineId: string,
): Promise<void> {
  const sql = getDb();
  // jsonb - removes the element from the array directly in DB, no fetch needed
  await sql`
    UPDATE licenses
    SET devices = devices - ${machineId}
    WHERE key = ${hashKey(key)}
  `;
}
