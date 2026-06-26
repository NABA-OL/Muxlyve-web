import { getDb } from "./db";

export interface License {
  key: string;
  email: string;
  status: "active" | "cancelled" | "refunded" | "disabled";
  max_devices: number;
  devices: string[];
  order_id: string | null;
  created_at: string;
}

export async function findLicense(key: string): Promise<License | null> {
  const sql = getDb();
  const rows = await sql`SELECT * FROM licenses WHERE key = ${key}`;
  return (rows[0] as License) ?? null;
}

export async function createLicense(data: {
  key: string;
  email: string;
  orderId?: string;
  maxDevices?: number;
}): Promise<void> {
  const sql = getDb();
  await sql`
    INSERT INTO licenses (key, email, order_id, max_devices)
    VALUES (${data.key}, ${data.email}, ${data.orderId ?? null}, ${data.maxDevices ?? 2})
    ON CONFLICT (key) DO NOTHING
  `;
}

export async function activateDevice(
  key: string,
  machineId: string,
): Promise<License> {
  const sql = getDb();

  const existing = await sql`
    SELECT * FROM licenses WHERE key = ${key} AND devices @> ${JSON.stringify([machineId])}::jsonb
  `;
  if (existing[0]) return existing[0] as License;

  const rows = await sql`
    UPDATE licenses
    SET devices = devices || ${JSON.stringify([machineId])}::jsonb
    WHERE key = ${key}
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
    WHERE key = ${key}
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
    WHERE key = ${key}
  `;
}

export async function releaseDevice(
  key: string,
  machineId: string,
): Promise<void> {
  const license = await findLicense(key);
  if (!license) return;

  const updated = license.devices.filter((d) => d !== machineId);
  const sql = getDb();
  await sql`
    UPDATE licenses
    SET devices = ${JSON.stringify(updated)}::jsonb
    WHERE key = ${key}
  `;
}
