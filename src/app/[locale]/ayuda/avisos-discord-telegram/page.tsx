/*
 * Propiedad de BlacKraken Solutions <blackraken.com>
 * Desarrollado por: NABAOL
 * Fecha de creación: 2026-08-13
 *  * Correo: nabaol.dev@gmail.com
 * Copyright (c) 2026 BlacKraken Solutions. Todos los derechos reservados.
 */

import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ArticleLayout } from "@/components/help/ArticleLayout";
import { ArticleBody } from "@/components/help/ArticleBody";
import { buildArticleMetadata } from "@/lib/help-metadata";

const SLUG = "avisos-discord-telegram";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildArticleMetadata(locale, SLUG);
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <ArticleLayout slug={SLUG}>
      <ArticleBody slug={SLUG} />
    </ArticleLayout>
  );
}
