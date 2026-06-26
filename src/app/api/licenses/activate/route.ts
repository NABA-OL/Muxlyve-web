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
    // token = the original plaintext key; Electron stores it to send on validate calls
    return NextResponse.json({ valid: true, token: key, email: license.email });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "ERROR";
    const status = msg === "DEVICE_LIMIT_REACHED_OR_INVALID" ? 403 : 400;
    return NextResponse.json({ valid: false, error: msg }, { status });
  }
}
