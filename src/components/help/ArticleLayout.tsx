/*
 * Propiedad de BlacKraken Solutions <blackraken.com>
 * Desarrollado por: NABAOL
 * Fecha de creación: 2026-08-13
 *  * Correo: nabaol.dev@gmail.com
 * Copyright (c) 2026 BlacKraken Solutions. Todos los derechos reservados.
 */

import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { HELP_ARTICLES } from "@/lib/help-articles";
import { ShareButton } from "./ShareButton";
import styles from "@/app/[locale]/ayuda/ayuda.module.css";

interface Props {
  slug: string;
  children: ReactNode;
}

export async function ArticleLayout({ slug, children }: Props) {
  const t = await getTranslations();
  const index = HELP_ARTICLES.findIndex((a) => a.slug === slug);
  const prev = index > 0 ? HELP_ARTICLES[index - 1] : null;
  const next =
    index >= 0 && index < HELP_ARTICLES.length - 1
      ? HELP_ARTICLES[index + 1]
      : null;

  const title = t(`help.articles.${slug}.title`);

  return (
    <article>
      <div className={styles.articleHeader}>
        <h1 className={styles.articleTitle}>{title}</h1>
        <ShareButton title={title} />
      </div>
      <div className={styles.prose}>{children}</div>
      {(prev || next) && (
        <nav className={styles.pager} aria-label={t("help.pagerAria")}>
          {prev ? (
            <Link href={`/ayuda/${prev.slug}`} className={styles.pagerLink}>
              <span className={styles.pagerLabel}>{t("help.pagerPrev")}</span>
              <span className={styles.pagerTitle}>
                {t(`help.articles.${prev.slug}.title`)}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/ayuda/${next.slug}`}
              className={`${styles.pagerLink} ${styles.pagerLinkNext}`}
            >
              <span className={styles.pagerLabel}>{t("help.pagerNext")}</span>
              <span className={styles.pagerTitle}>
                {t(`help.articles.${next.slug}.title`)}
              </span>
            </Link>
          ) : (
            <span />
          )}
        </nav>
      )}
    </article>
  );
}
