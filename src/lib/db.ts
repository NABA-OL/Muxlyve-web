// Desarrollado por BlacKraken Solutions
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
  await sql`ALTER TABLE licenses ADD COLUMN IF NOT EXISTS name TEXT`;
  await sql`ALTER TABLE licenses ADD COLUMN IF NOT EXISTS nickname VARCHAR(24)`;
  await sql`ALTER TABLE licenses ADD COLUMN IF NOT EXISTS avatar_url TEXT`;
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
  await sql`
    CREATE TABLE IF NOT EXISTS error_reports (
      id          SERIAL PRIMARY KEY,
      email       TEXT,
      app_version TEXT,
      platform    TEXT,
      os_version  TEXT,
      description TEXT NOT NULL,
      log_excerpt TEXT,
      ip          TEXT NOT NULL,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS feedback (
      id          SERIAL PRIMARY KEY,
      email       TEXT,
      app_version TEXT,
      platform    TEXT,
      description TEXT NOT NULL,
      status      TEXT NOT NULL DEFAULT 'new',
      ip          TEXT NOT NULL,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
}
