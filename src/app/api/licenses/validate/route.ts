// Desarrollado por NABA-OL
import { NextRequest, NextResponse } from "next/server";
import { validateDevice } from "@/lib/licenses";

export async function POST(req: NextRequest) {
  const body = await req.json() as { key?: string; machineId?: string };
  const { key, machineId } = body;

  if (!key || !machineId) {
    return NextResponse.json({ valid: false, error: "MISSING_PARAMS" }, { status: 400 });
  }

  try {
    const license = await validateDevice(key, machineId);
    return NextResponse.json({
      valid: true,
      email: license.email,
      plan: license.plan ?? "lifetime",
      status: license.status,
      renewsAt: license.renews_at ? new Date(license.renews_at).getTime() : null,
      expiresAt: license.expires_at ? new Date(license.expires_at).getTime() : null,
    });
  } catch {
    return NextResponse.json({ valid: false, error: "INVALID_LICENSE" }, { status: 403 });
  }
}
