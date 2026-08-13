/*
 * Propiedad de BlacKraken Solutions
 * Desarrollado por: NABAOL
 * Fecha de creación: 2026-08-13
 *  * Correo: nabaol.dev@gmail.com
 * Copyright (c) 2026 BlacKraken Solutions. Todos los derechos reservados.
 */

import type { Metadata } from "next";
import { ArticleLayout } from "@/components/help/ArticleLayout";
import { ArticleBody } from "@/components/help/ArticleBody";
import { buildArticleMetadata } from "@/lib/help-metadata";
import { Link } from "@/i18n/navigation";

const SLUG = "conectar-plataformas";

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
            <Link href="/ayuda/conectar-tu-software">{chunks}</Link>
          ),
        }}
      />
    </ArticleLayout>
  );
}
