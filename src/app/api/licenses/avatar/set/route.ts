/*
 * Propiedad de BlacKraken Solutions
 * Desarrollado por: NABAOL
 * Fecha de creación: 2026-08-16
 */
import { NextRequest, NextResponse } from "next/server";
import { getAvatarUrl, setAvatarUrl, hashLicenseKey } from "@/lib/licenses";
import { uploadAvatar, deleteAvatar } from "@/lib/blob";

// ~2.2MB decoded — plenty for a 256x256 jpeg, caps abuse before we touch the buffer.
const MAX_BASE64_LENGTH = 3_000_000;

export async function POST(req: NextRequest) {
  const body = (await req.json()) as {
    key?: string;
    token?: string;
    machineId?: string;
    imageBase64?: string;
    mimeType?: string;
  };
  const { key, token, machineId, imageBase64, mimeType } = body;

  if (!key || !token || !machineId || !imageBase64 || !mimeType) {
    return NextResponse.json({ ok: false, error: "MISSING_PARAMS" }, { status: 400 });
  }
  if (token !== key) {
    return NextResponse.json({ ok: false, error: "INVALID_TOKEN" }, { status: 401 });
  }
  if (mimeType !== "image/jpeg") {
    return NextResponse.json({ ok: false, error: "INVALID_MIME_TYPE" }, { status: 400 });
  }
  if (imageBase64.length > MAX_BASE64_LENGTH) {
    return NextResponse.json({ ok: false, error: "IMAGE_TOO_LARGE" }, { status: 400 });
  }

  let oldAvatarUrl: string | null;
  try {
    oldAvatarUrl = await getAvatarUrl(key, machineId);
  } catch {
    return NextResponse.json({ ok: false, error: "INVALID_LICENSE" }, { status: 403 });
  }

  let bytes: Buffer;
  try {
    bytes = Buffer.from(imageBase64, "base64");
  } catch {
    return NextResponse.json({ ok: false, error: "INVALID_IMAGE" }, { status: 400 });
  }

  const avatarUrl = await uploadAvatar(hashLicenseKey(key), bytes);
  await setAvatarUrl(key, machineId, avatarUrl);
  if (oldAvatarUrl) await deleteAvatar(oldAvatarUrl).catch(() => {});

  return NextResponse.json({ ok: true, avatarUrl });
}
