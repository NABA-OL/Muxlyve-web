/*
 * Propiedad de BlacKraken Solutions <blackraken.com>
 * Desarrollado por: NABAOL
 * Fecha de creación: 2026-08-13
 *  * Correo: nabaol.dev@gmail.com
 * Copyright (c) 2026 BlacKraken Solutions. Todos los derechos reservados.
 */

import {
  ogImageAlt,
  ogImageContentType,
  ogImageSize,
  renderOgImage,
} from "@/lib/og-image";
import { routing } from "@/i18n/routing";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = ogImageAlt;

// Pregenera la imagen por idioma en build: sin esto cada request (y cada
// ?query aleatoria que salta la caché de la CDN) ejecuta ImageResponse.
export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function Image() {
  return renderOgImage();
}
