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
    return NextResponse.json({ valid: true, email: license.email });
  } catch {
    return NextResponse.json({ valid: false, error: "INVALID_LICENSE" }, { status: 403 });
  }
}
