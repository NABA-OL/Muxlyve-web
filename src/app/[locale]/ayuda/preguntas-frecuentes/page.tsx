/*
 * Propiedad de BlacKraken Solutions
 * Desarrollado por: NABAOL
 * Fecha de creación: 2026-08-13
 */

import type { Metadata } from "next";
import { ArticleLayout } from "@/components/help/ArticleLayout";
import { ArticleBody } from "@/components/help/ArticleBody";
import { ArticleJsonLd } from "@/components/help/ArticleJsonLd";
import { buildArticleMetadata } from "@/lib/help-metadata";
import { buildFaqJsonLd } from "@/lib/help-schema";

const SLUG = "preguntas-frecuentes";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildArticleMetadata(locale, SLUG);
}

export default async function Page() {
  const jsonLd = await buildFaqJsonLd(SLUG);
  return (
    <ArticleLayout slug={SLUG}>
      {jsonLd && <ArticleJsonLd data={jsonLd} />}
      <ArticleBody slug={SLUG} />
    </ArticleLayout>
  );
}
