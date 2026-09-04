/*
 * Propiedad de BlacKraken Solutions <blackraken.com>
 * Desarrollado por: NABAOL
 * Fecha de creación: 2026-08-13
 *  * Correo: nabaol.dev@gmail.com
 * Copyright (c) 2026 BlacKraken Solutions. Todos los derechos reservados.
 */

import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { HELP_ARTICLES } from "@/lib/help-articles";
import { buildAlternates } from "@/lib/i18n-meta";
import styles from "./ayuda.module.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "help" });
  return {
    alternates: buildAlternates(locale, "/ayuda"),
    title: t("indexMetaTitle"),
    description: t("indexMetaDescription"),
  };
}

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://muxlyve.com";

export default async function AyudaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("help");

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: t("indexTitle"),
    description: t("indexIntro"),
    url: `${BASE}/ayuda`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: HELP_ARTICLES.map((a, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: t(`articles.${a.slug}.title`),
        url: `${BASE}/ayuda/${a.slug}`,
      })),
    },
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <h1 className={styles.articleTitle}>{t("indexTitle")}</h1>
      <p className={styles.intro}>{t("indexIntro")}</p>
      <div className={styles.grid}>
        {HELP_ARTICLES.map((a) => (
          <Link
            key={a.slug}
            href={`/ayuda/${a.slug}`}
            className="card"
            style={{ display: "block" }}
          >
            <h2 className={styles.cardTitle}>
              {t(`articles.${a.slug}.title`)}
            </h2>
            <p className={styles.cardSummary}>
              {t(`articles.${a.slug}.summary`)}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
