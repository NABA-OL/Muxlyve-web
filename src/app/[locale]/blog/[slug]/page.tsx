/*
 * Propiedad de BlacKraken Solutions
 * Desarrollado por: NABAOL
 * Fecha de creación: 2026-09-03
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { routing, type Locale } from "@/i18n/routing";
import { getPublishedPost, getPostLocales, listAllPublished } from "@/lib/blog";
import styles from "../blog.module.css";

export const revalidate = 300;
// Entradas nuevas se sirven en el primer request y quedan cacheadas.
export const dynamicParams = true;

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://muxlyve.com";

function localePath(locale: Locale, path: string): string {
  return locale === routing.defaultLocale ? path : `/${locale}${path}`;
}

export async function generateStaticParams() {
  const posts = await listAllPublished();
  return posts.map((p) => ({ locale: p.locale, slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getPublishedPost(slug, locale);
  if (!post) return {};

  // hreflang solo hacia los idiomas en los que la entrada existe publicada.
  const translated = await getPostLocales(slug);
  const languages: Record<string, string> = {};
  for (const l of translated) {
    languages[l] = `${BASE}${localePath(l, `/blog/${slug}`)}`;
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: localePath(locale as Locale, `/blog/${slug}`),
      languages,
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: localePath(locale as Locale, `/blog/${slug}`),
      publishedTime: post.published_at ?? undefined,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = await getPublishedPost(slug, locale);
  if (!post) notFound();

  const t = await getTranslations("blog");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.published_at,
    dateModified: post.updated_at,
    inLanguage: locale,
    url: `${BASE}${localePath(locale as Locale, `/blog/${slug}`)}`,
    author: {
      "@type": "Organization",
      name: "BlacKraken Solutions",
      url: "https://blackraken.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Muxlyve",
      url: BASE,
      logo: { "@type": "ImageObject", url: `${BASE}/icon-muxlyve.svg` },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />
      <main id="main-content">
        <section>
          <div className={`container ${styles.article}`}>
            <Link href="/blog" className={styles.back}>
              {t("backToIndex")}
            </Link>
            <h1 className={styles.postTitle}>{post.title}</h1>
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
            {/* El cuerpo se sanitiza al guardar (sanitizeBody en lib/blog.ts),
                nunca se confía en lo que venga del editor. */}
            <div
              className={styles.postBody}
              dangerouslySetInnerHTML={{ __html: post.body }}
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
