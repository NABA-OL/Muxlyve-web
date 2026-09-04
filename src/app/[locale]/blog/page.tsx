/*
 * Propiedad de BlacKraken Solutions
 * Desarrollado por: NABAOL
 * Fecha de creación: 2026-09-03
 */

import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { buildAlternates } from "@/lib/i18n-meta";
import { listPublishedPosts } from "@/lib/blog";
import styles from "./blog.module.css";

// Las entradas viven en la base: se regenera cada 5 min, y al publicar desde el
// panel la server action llama revalidatePath("/blog") para que salga al toque.
export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog.meta" });
  return {
    alternates: buildAlternates(locale, "/blog"),
    title: t("title"),
    description: t("description"),
  };
}

export default async function BlogIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("blog");
  const posts = await listPublishedPosts(locale);

  return (
    <>
      <Nav />
      <main id="main-content">
        <section>
          <div className="container">
            <div className={styles.header}>
              <span className="eyebrow">{t("eyebrow")}</span>
              <h1 className="section-title">{t("title")}</h1>
              <p className="section-lead">{t("lead")}</p>
            </div>

            {posts.length === 0 ? (
              <p className={styles.empty}>{t("empty")}</p>
            ) : (
              <div className={styles.grid}>
                {posts.map((post) => (
                  <article key={post.id} className="card">
                    <Link href={`/blog/${post.slug}`} className={styles.cardLink}>
                      <h2 className={styles.cardTitle}>{post.title}</h2>
                      {post.excerpt && (
                        <p className={styles.cardExcerpt}>{post.excerpt}</p>
                      )}
                      {post.published_at && (
                        <time
                          className={styles.date}
                          dateTime={new Date(post.published_at).toISOString()}
                        >
                          {new Date(post.published_at).toLocaleDateString(locale, {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </time>
                      )}
                    </Link>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
