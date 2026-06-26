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
      plan        TEXT,
      renews_at   TIMESTAMPTZ,
      expires_at  TIMESTAMPTZ,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
  // Add columns to existing tables that predate this migration
  await sql`ALTER TABLE licenses ADD COLUMN IF NOT EXISTS plan TEXT`;
  await sql`ALTER TABLE licenses ADD COLUMN IF NOT EXISTS renews_at TIMESTAMPTZ`;
  await sql`ALTER TABLE licenses ADD COLUMN IF NOT EXISTS expires_at TIMESTAMPTZ`;
  await sql`
    CREATE TABLE IF NOT EXISTS settings (
      key        TEXT PRIMARY KEY,
      value      TEXT NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
  await sql`
    INSERT INTO settings (key, value) VALUES
      ('price_monthly',  ''),
      ('price_annual',   ''),
      ('price_lifetime', '')
    ON CONFLICT DO NOTHING
  `;
}
