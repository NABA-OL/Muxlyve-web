import { NextRequest, NextResponse } from "next/server";
import { validateDevice } from "@/lib/licenses";

export async function POST(req: NextRequest) {
  const body = await req.json() as { key?: string; machineId?: string };
  const { key, machineId } = body;

  if (!key || !machineId) {
    return NextResponse.json(
      { ok: false, error: "MISSING_PARAMS" },
      { status: 400 },
    );
  }

  try {
    await validateDevice(key, machineId);
    return NextResponse.json({ ok: true, status: "active" });
  } catch {
    return NextResponse.json(
      { ok: false, error: "INVALID_LICENSE" },
      { status: 403 },
    );
  }
}
