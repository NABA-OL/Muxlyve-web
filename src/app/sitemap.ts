// Desarrollado por BlacKraken Solutions
import type { MetadataRoute } from "next";
import { HELP_ARTICLES } from "@/lib/help-articles";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://muxlyve.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/descargar`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/ayuda`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    ...HELP_ARTICLES.map((a) => ({
      url: `${BASE}/ayuda/${a.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    { url: `${BASE}/privacidad`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/terminos`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];
}
