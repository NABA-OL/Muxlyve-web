import { NextRequest, NextResponse } from "next/server";
import { activateDevice } from "@/lib/licenses";
import { ensureSchema } from "@/lib/db";

export async function POST(req: NextRequest) {
  const body = await req.json() as { key?: string; machineId?: string };
  const { key, machineId } = body;

  if (!key || !machineId) {
    return NextResponse.json(
      { ok: false, error: "MISSING_PARAMS" },
      { status: 400 },
    );
  }

  await ensureSchema();

  console.log("activate: key length", key.length, "machineId length", machineId.length);

  try {
    const license = await activateDevice(key, machineId);
    return NextResponse.json({ ok: true, status: license.status });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "ERROR";
    // Log first 8 chars of key to diagnose mismatch without exposing full key
    console.error("activate failed:", msg, "key prefix:", key.slice(0, 8));
    const status = msg === "DEVICE_LIMIT_REACHED_OR_INVALID" ? 403 : 400;
    return NextResponse.json({ ok: false, error: msg }, { status });
  }
}
