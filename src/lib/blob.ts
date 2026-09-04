/*
 * Propiedad de BlacKraken Solutions <blackraken.com>
 * Desarrollado por: NABAOL
 * Fecha de creación: 2026-08-16
 */
import { put, del } from "@vercel/blob";

// El store se conectó con prefijo custom (BLOB_MUXLYVE); soporta también el nombre default.
function blobToken(): string | undefined {
  return process.env.BLOB_MUXLYVE_READ_WRITE_TOKEN || process.env.BLOB_READ_WRITE_TOKEN;
}

// Path único por subida (nunca reusa el nombre anterior) — evita que el CDN
// sirva la imagen vieja cacheada bajo la misma URL tras un reemplazo.
export async function uploadAvatar(hashedKey: string, bytes: Buffer): Promise<string> {
  const result = await put(`avatars/${hashedKey}-${Date.now()}.jpg`, bytes, {
    access: "public",
    contentType: "image/jpeg",
    addRandomSuffix: false,
    token: blobToken(),
  });
  return result.url;
}

export async function deleteAvatar(url: string): Promise<void> {
  await del(url, { token: blobToken() });
}
