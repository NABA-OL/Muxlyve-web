/*
 * Propiedad de BlacKraken Solutions
 * Desarrollado por: NABAOL
 * Fecha de creación: 2026-08-13
 */

import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { buildAlternates } from "@/lib/i18n-meta";

export async function buildArticleMetadata(
  locale: string,
  slug: string,
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "help" });
  return {
    alternates: buildAlternates(locale, `/ayuda/${slug}`),
    title: `${t(`articles.${slug}.title`)} — ${t("metaSuffix")}`,
    description: t(`articles.${slug}.metaDescription`),
  };
}
