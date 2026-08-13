/*
 * Propiedad de BlacKraken Solutions
 * Desarrollado por: NABAOL
 * Fecha de creación: 2026-08-13
 */

import type { Metadata } from "next";
import { ArticleLayout } from "@/components/help/ArticleLayout";
import { ArticleBody } from "@/components/help/ArticleBody";
import { buildArticleMetadata } from "@/lib/help-metadata";

const SLUG = "stream-deck";

// TODO: reemplazar con la URL real cuando el plugin de Stream Deck esté publicado.
const STREAM_DECK_PLUGIN_URL = "#";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildArticleMetadata(locale, SLUG);
}

export default function Page() {
  return (
    <ArticleLayout slug={SLUG}>
      <ArticleBody
        slug={SLUG}
        extraTags={{
          link1: (chunks) => (
            <a href={STREAM_DECK_PLUGIN_URL} target="_blank" rel="noopener noreferrer">
              {chunks}
            </a>
          ),
        }}
      />
    </ArticleLayout>
  );
}
