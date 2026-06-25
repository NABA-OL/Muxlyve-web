import { getDb } from "./db";

export async function getSetting(key: string, fallback = ""): Promise<string> {
  try {
    const sql = getDb();
    const rows = await sql`SELECT value FROM settings WHERE key = ${key}`;
    return (rows[0] as { value: string } | undefined)?.value ?? fallback;
  } catch {
    return fallback;
  }
}

export async function setSetting(key: string, value: string): Promise<void> {
  const sql = getDb();
  await sql`
    INSERT INTO settings (key, value, updated_at)
    VALUES (${key}, ${value}, now())
    ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now()
  `;
}
