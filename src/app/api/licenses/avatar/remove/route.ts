/*
 * Propiedad de BlacKraken Solutions
 * Desarrollado por: NABAOL
 * Fecha de creación: 2026-08-16
 */
import { NextRequest, NextResponse } from "next/server";
import { getAvatarUrl, clearAvatarUrl } from "@/lib/licenses";
import { deleteAvatar } from "@/lib/blob";

export async function POST(req: NextRequest) {
  const body = (await req.json()) as { key?: string; token?: string; machineId?: string };
  const { key, token, machineId } = body;

  if (!key || !token || !machineId) {
    return NextResponse.json({ ok: false, error: "MISSING_PARAMS" }, { status: 400 });
  }
  if (token !== key) {
    return NextResponse.json({ ok: false, error: "INVALID_TOKEN" }, { status: 401 });
  }

  try {
    const current = await getAvatarUrl(key, machineId);
    if (current) {
      await deleteAvatar(current).catch(() => {});
      await clearAvatarUrl(key, machineId);
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "INVALID_LICENSE" }, { status: 403 });
  }
}
