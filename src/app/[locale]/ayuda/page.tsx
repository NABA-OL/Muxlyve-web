/*
 * Propiedad de BlacKraken Solutions
 * Desarrollado por: NABAOL
 * Fecha de creación: 2026-08-13
 */

import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
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

export default async function AyudaPage() {
  const t = await getTranslations("help");

  return (
    <div>
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
            <h2 className={styles.cardTitle}>{t(`articles.${a.slug}.title`)}</h2>
            <p className={styles.cardSummary}>{t(`articles.${a.slug}.summary`)}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
