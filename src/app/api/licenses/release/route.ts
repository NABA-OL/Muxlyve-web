import { NextRequest, NextResponse } from "next/server";
import { releaseDevice } from "@/lib/licenses";

export async function POST(req: NextRequest) {
  const body = await req.json() as { key?: string; machineId?: string };
  const { key, machineId } = body;

  if (!key || !machineId) {
    return NextResponse.json(
      { ok: false, error: "MISSING_PARAMS" },
      { status: 400 },
    );
  }

  await releaseDevice(key, machineId);
  return NextResponse.json({ ok: true });
}
