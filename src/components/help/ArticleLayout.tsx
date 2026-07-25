import type { ReactNode } from "react";
import Link from "next/link";
import { HELP_ARTICLES } from "@/lib/help-articles";
import styles from "@/app/ayuda/ayuda.module.css";

interface Props {
  slug: string;
  title: string;
  children: ReactNode;
}

export function ArticleLayout({ slug, title, children }: Props) {
  const index = HELP_ARTICLES.findIndex((a) => a.slug === slug);
  const prev = index > 0 ? HELP_ARTICLES[index - 1] : null;
  const next =
    index >= 0 && index < HELP_ARTICLES.length - 1
      ? HELP_ARTICLES[index + 1]
      : null;

  return (
    <article>
      <h1 className={styles.articleTitle}>{title}</h1>
      <div className={styles.prose}>{children}</div>
      {(prev || next) && (
        <nav className={styles.pager} aria-label="Navegación entre artículos">
          {prev ? (
            <Link href={`/ayuda/${prev.slug}`} className={styles.pagerLink}>
              <span className={styles.pagerLabel}>← Anterior</span>
              <span className={styles.pagerTitle}>{prev.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/ayuda/${next.slug}`}
              className={`${styles.pagerLink} ${styles.pagerLinkNext}`}
            >
              <span className={styles.pagerLabel}>Siguiente →</span>
              <span className={styles.pagerTitle}>{next.title}</span>
            </Link>
          ) : (
            <span />
          )}
        </nav>
      )}
    </article>
  );
}
