import type { Metadata } from "next";
import { ArticleLayout } from "@/components/help/ArticleLayout";
import { ArticleBody } from "@/components/help/ArticleBody";
import { buildArticleMetadata } from "@/lib/help-metadata";

const SLUG = "instalacion-primer-arranque";

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
      <ArticleBody slug={SLUG} />
    </ArticleLayout>
  );
}
