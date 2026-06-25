import { neon } from "@neondatabase/serverless";

export function getDb() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL not configured");
  return neon(url);
}

export async function ensureSchema(): Promise<void> {
  const sql = getDb();
  await sql`
    CREATE TABLE IF NOT EXISTS licenses (
      key         TEXT PRIMARY KEY,
      email       TEXT NOT NULL,
      status      TEXT NOT NULL DEFAULT 'active',
      max_devices INT  NOT NULL DEFAULT 2,
      devices     JSONB NOT NULL DEFAULT '[]',
      order_id    TEXT,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
}
