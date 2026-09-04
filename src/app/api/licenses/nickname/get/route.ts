/*
 * Propiedad de BlacKraken Solutions <blackraken.com>
 * Desarrollado por: NABAOL
 * Fecha de creación: 2026-08-16
 */
import { NextRequest, NextResponse } from "next/server";
import { getNickname } from "@/lib/licenses";

export async function POST(req: NextRequest) {
  const body = (await req.json()) as { key?: string; token?: string; machineId?: string };
  const { key, token, machineId } = body;

  if (!key || !token || !machineId) {
    return NextResponse.json({ error: "MISSING_PARAMS" }, { status: 400 });
  }
  if (token !== key) {
    return NextResponse.json({ error: "INVALID_TOKEN" }, { status: 401 });
  }

  try {
    const nickname = await getNickname(key, machineId);
    return NextResponse.json({ nickname });
  } catch {
    return NextResponse.json({ error: "INVALID_LICENSE" }, { status: 403 });
  }
}
