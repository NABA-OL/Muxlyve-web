import { NextRequest, NextResponse } from "next/server";
import { getDb, ensureSchema } from "@/lib/db";
import { sendTelegramMessage, sendTelegramDocument } from "@/lib/telegram";

const MAX_BODY_BYTES = 100 * 1024;
const RATE_LIMIT = 5;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

function err(message: string, status = 400) {
  return NextResponse.json({ ok: false, error: message }, { status });
}

export async function POST(req: NextRequest) {
  const contentLength = Number(req.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) return err("Payload too large", 413);

  let body: unknown;
  try {
    const raw = await req.text();
    if (raw.length > MAX_BODY_BYTES) return err("Payload too large", 413);
    body = JSON.parse(raw);
  } catch {
    return err("Invalid JSON");
  }

  if (typeof body !== "object" || body === null) return err("Invalid body");
  const b = body as Record<string, unknown>;

  const email = typeof b.email === "string" ? b.email.trim() : "";
  const appVersion = typeof b.appVersion === "string" ? b.appVersion.slice(0, 32) : "";
  const platform = typeof b.platform === "string" ? b.platform.slice(0, 32) : "";
  const osVersion = typeof b.osVersion === "string" ? b.osVersion.slice(0, 128) : "";
  const description = typeof b.description === "string" ? b.description.slice(0, 4000) : "";
  const log = typeof b.log === "string" ? b.log.slice(0, 20_000) : "";

  if (!description) return err("description is required");
  if (email && !EMAIL_RE.test(email)) return err("Invalid email format");

  const ip = getIp(req);

  try {
    await ensureSchema();
    const sql = getDb();

    const [row] = await sql`
      SELECT COUNT(*)::int AS cnt FROM error_reports
      WHERE ip = ${ip} AND created_at > now() - INTERVAL '1 hour'
    `;
    if ((row as { cnt: number }).cnt >= RATE_LIMIT) {
      return err("Rate limit exceeded. Try again later.", 429);
    }

    await sql`
      INSERT INTO error_reports (email, app_version, platform, os_version, description, log_excerpt, ip)
      VALUES (
        ${email || null},
        ${appVersion || null},
        ${platform || null},
        ${osVersion || null},
        ${description},
        ${log || null},
        ${ip}
      )
    `;
  } catch {
    return err("Internal error", 500);
  }

  const caption = [
    "🐛 Nuevo reporte de error",
    `Email: ${email || "no proporcionado"}`,
    `Versión: ${appVersion || "?"} · ${platform || "?"} ${osVersion}`.trim(),
    "",
    description,
  ].join("\n");

  if (log) {
    await sendTelegramDocument(
      log,
      `reporte-${Date.now()}.txt`,
      caption.slice(0, 1024),
      "reports",
    ).catch(() => {});
  } else {
    await sendTelegramMessage(caption, "reports").catch(() => {});
  }

  return NextResponse.json({ ok: true });
}
