/*
 * Propiedad de BlacKraken Solutions <blackraken.com>
 * Desarrollado por: NABAOL
 * Fecha de creación: 2026-08-14
 */
import { NextRequest, NextResponse } from "next/server";
import { sendTelegramMessage } from "@/lib/telegram";

async function verifySignature(req: NextRequest, body: string): Promise<boolean> {
  const secret = process.env.GITHUB_WEBHOOK_SECRET;
  if (!secret) return false;

  const sig = req.headers.get("x-hub-signature-256");
  if (!sig?.startsWith("sha256=")) return false;

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const hmac = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(body));
  const expected = "sha256=" + Buffer.from(hmac).toString("hex");
  return sig === expected;
}

interface ReleasePayload {
  action: string;
  release?: {
    tag_name: string;
    name: string | null;
    html_url: string;
    prerelease: boolean;
    draft: boolean;
  };
}

export async function POST(req: NextRequest) {
  const body = await req.text();

  const valid = await verifySignature(req, body);
  if (!valid) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let payload: ReleasePayload;
  try {
    payload = JSON.parse(body) as ReleasePayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (payload.action !== "published" || !payload.release || payload.release.draft) {
    return NextResponse.json({ ok: true, skipped: true });
  }

  const { tag_name, name, html_url, prerelease } = payload.release;
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://muxlyve.com";

  await sendTelegramMessage(
    [
      prerelease ? "🧪 Nueva versión pre-release" : "🚀 Nueva versión disponible",
      `${name || tag_name} (${tag_name})`,
      "",
      `Descargar: ${base}/descargar`,
      `Notas: ${html_url}`,
    ].join("\n"),
    "releases",
  ).catch(() => {});

  return NextResponse.json({ ok: true });
}
