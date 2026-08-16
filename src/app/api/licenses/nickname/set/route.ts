/*
 * Propiedad de BlacKraken Solutions
 * Desarrollado por: NABAOL
 * Fecha de creación: 2026-08-16
 */
import { NextRequest, NextResponse } from "next/server";
import { setNickname } from "@/lib/licenses";

const MAX_NICKNAME_LENGTH = 24;

export async function POST(req: NextRequest) {
  const body = (await req.json()) as {
    key?: string;
    token?: string;
    machineId?: string;
    nickname?: string;
  };
  const { key, token, machineId } = body;
  const nickname = body.nickname?.trim();

  if (!key || !token || !machineId || !nickname) {
    return NextResponse.json({ ok: false, error: "MISSING_PARAMS" }, { status: 400 });
  }
  if (token !== key) {
    return NextResponse.json({ ok: false, error: "INVALID_TOKEN" }, { status: 401 });
  }
  if (nickname.length > MAX_NICKNAME_LENGTH) {
    return NextResponse.json({ ok: false, error: "NICKNAME_TOO_LONG" }, { status: 400 });
  }

  try {
    const saved = await setNickname(key, machineId, nickname);
    return NextResponse.json({ ok: true, nickname: saved });
  } catch {
    return NextResponse.json({ ok: false, error: "INVALID_LICENSE" }, { status: 403 });
  }
}
