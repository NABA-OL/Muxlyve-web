/*
 * Propiedad de BlacKraken Solutions
 * Desarrollado por: NABAOL
 * Fecha de creación: 2026-08-13
 *  * Correo: nabaol.dev@gmail.com
 * Copyright (c) 2026 BlacKraken Solutions. Todos los derechos reservados.
 */

import type { MetadataRoute } from "next";
import { HELP_ARTICLES } from "@/lib/help-articles";
import { routing, type Locale } from "@/i18n/routing";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://muxlyve.com";

function localeUrl(locale: Locale, path: string): string {
  return locale === routing.defaultLocale ? `${BASE}${path}` : `${BASE}/${locale}${path}`;
}

function entry(
  path: string,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
  priority: number,
): MetadataRoute.Sitemap {
  const languages: Record<string, string> = {};
  for (const l of routing.locales) languages[l] = localeUrl(l, path);
  languages["x-default"] = `${BASE}${path}`;

  return routing.locales.map((locale) => ({
    url: localeUrl(locale, path),
    lastModified: new Date(),
    changeFrequency,
    priority,
    alternates: { languages },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...entry("/", "weekly", 1),
    ...entry("/demo", "weekly", 0.8),
    ...entry("/descargar", "weekly", 0.9),
    ...entry("/ayuda", "monthly", 0.7),
    ...HELP_ARTICLES.flatMap((a) => entry(`/ayuda/${a.slug}`, "monthly", 0.6)),
    ...entry("/privacidad", "yearly", 0.3),
    ...entry("/terminos", "yearly", 0.3),
    // Rutas raíz fijas (sin variantes de locale) — páginas ancla de confianza.
    { url: `${BASE}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];
}
