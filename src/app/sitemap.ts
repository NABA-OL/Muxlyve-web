/*
 * Propiedad de BlacKraken Solutions <blackraken.com>
 * Desarrollado por: NABAOL
 * Fecha de creación: 2026-08-13
 *  * Correo: nabaol.dev@gmail.com
 * Copyright (c) 2026 BlacKraken Solutions. Todos los derechos reservados.
 */

import type { MetadataRoute } from "next";
import { HELP_ARTICLES } from "@/lib/help-articles";
import { routing, type Locale } from "@/i18n/routing";
import { listAllPublished } from "@/lib/blog";

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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Las entradas del blog viven en la base; si no responde, el sitemap sale
  // igual con las rutas estáticas (listAllPublished ya devuelve [] si falla).
  const posts = await listAllPublished();

  return [
    ...entry("/", "weekly", 1),
    ...entry("/precio", "monthly", 0.9),
    ...entry("/blog", "weekly", 0.7),
    ...posts.map((p) => ({
      url: localeUrl(p.locale, `/blog/${p.slug}`),
      lastModified: new Date(p.updated_at),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...["twitch-kick", "twitch-tiktok", "youtube-tiktok"].flatMap((combo) =>
      entry(`/multistream/${combo}`, "monthly", 0.8),
    ),
    ...entry("/alternativa-restream", "monthly", 0.9),
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
