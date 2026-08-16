/*
 * Propiedad de BlacKraken Solutions
 * Desarrollado por: NABAOL
 * Fecha de creación: 2026-08-16
 */
import { put, del } from "@vercel/blob";

// El store se conectó con prefijo custom (BLOB_MUXLYVE); soporta también el nombre default.
function blobToken(): string | undefined {
  return process.env.BLOB_MUXLYVE_READ_WRITE_TOKEN || process.env.BLOB_READ_WRITE_TOKEN;
}

export async function uploadAvatar(hashedKey: string, bytes: Buffer): Promise<string> {
  const result = await put(`avatars/${hashedKey}.jpg`, bytes, {
    access: "public",
    contentType: "image/jpeg",
    addRandomSuffix: false,
    allowOverwrite: true,
    token: blobToken(),
  });
  return result.url;
}

export async function deleteAvatar(url: string): Promise<void> {
  await del(url, { token: blobToken() });
}
