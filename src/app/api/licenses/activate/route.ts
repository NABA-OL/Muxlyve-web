// Desarrollado por BlacKraken Solutions
import { NextRequest, NextResponse } from "next/server";
import { activateDevice } from "@/lib/licenses";
import { ensureSchema } from "@/lib/db";

export async function POST(req: NextRequest) {
  const body = await req.json() as { key?: string; machineId?: string };
  const { key, machineId } = body;

  if (!key || !machineId) {
    return NextResponse.json({ valid: false, error: "MISSING_PARAMS" }, { status: 400 });
  }

  await ensureSchema();

  try {
    const license = await activateDevice(key, machineId);
    return NextResponse.json({
      valid: true,
      token: key,
      email: license.email,
      name: license.name,
      nickname: license.nickname,
      plan: license.plan ?? "lifetime",
      status: license.status,
      renewsAt: license.renews_at ? new Date(license.renews_at).getTime() : null,
      expiresAt: license.expires_at ? new Date(license.expires_at).getTime() : null,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "ERROR";
    const status = msg === "DEVICE_LIMIT_REACHED_OR_INVALID" ? 403 : 400;
    return NextResponse.json({ valid: false, error: msg }, { status });
  }
}
