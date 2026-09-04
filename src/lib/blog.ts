/*
 * Propiedad de BlacKraken Solutions
 * Desarrollado por: NABAOL
 * Fecha de creación: 2026-09-03
 */

import sanitizeHtml from "sanitize-html";
import { getDb } from "./db";
import { routing, type Locale } from "@/i18n/routing";

export type PostStatus = "draft" | "published";

export interface BlogPost {
  id: number;
  slug: string;
  locale: Locale;
  title: string;
  excerpt: string;
  body: string;
  status: PostStatus;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

/** Slug URL-safe a partir de un título. */
export function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

/**
 * El cuerpo se escribe desde el panel (contentEditable), así que llega como
 * HTML. Se sanitiza SIEMPRE antes de guardar: es la única barrera entre el
 * editor y el HTML que termina renderizado en la página pública.
 */
export function sanitizeBody(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: [
      "p", "br", "strong", "em", "u", "s", "blockquote",
      "h2", "h3", "h4", "ul", "ol", "li", "a", "code", "pre",
      "img", "figure", "figcaption", "hr", "table", "thead",
      "tbody", "tr", "th", "td",
    ],
    allowedAttributes: {
      a: ["href", "title", "target", "rel"],
      img: ["src", "alt", "width", "height", "loading"],
    },
    allowedSchemes: ["http", "https", "mailto"],
    transformTags: {
      // Todo enlace externo sale con rel seguro, sin depender de quien escriba.
      a: (tagName, attribs) => ({
        tagName,
        attribs: attribs.href?.startsWith("http")
          ? { ...attribs, target: "_blank", rel: "noopener noreferrer" }
          : attribs,
      }),
    },
  });
}

function isLocale(value: string): value is Locale {
  return (routing.locales as readonly string[]).includes(value);
}

export async function listPublishedPosts(locale: string): Promise<BlogPost[]> {
  if (!isLocale(locale)) return [];
  try {
    const sql = getDb();
    const rows = await sql`
      SELECT * FROM blog_posts
      WHERE locale = ${locale} AND status = 'published'
      ORDER BY published_at DESC NULLS LAST, created_at DESC
    `;
    return rows as BlogPost[];
  } catch {
    return [];
  }
}

export async function getPublishedPost(
  slug: string,
  locale: string,
): Promise<BlogPost | null> {
  if (!isLocale(locale)) return null;
  try {
    const sql = getDb();
    const rows = await sql`
      SELECT * FROM blog_posts
      WHERE slug = ${slug} AND locale = ${locale} AND status = 'published'
      LIMIT 1
    `;
    return (rows[0] as BlogPost) ?? null;
  } catch {
    return null;
  }
}

/** Locales en los que ese slug ya está publicado — para hreflang. */
export async function getPostLocales(slug: string): Promise<Locale[]> {
  try {
    const sql = getDb();
    const rows = await sql`
      SELECT locale FROM blog_posts
      WHERE slug = ${slug} AND status = 'published'
    `;
    return (rows as { locale: string }[])
      .map((r) => r.locale)
      .filter(isLocale);
  } catch {
    return [];
  }
}

/** Todas las entradas publicadas (cualquier locale) — sitemap y prerender. */
export async function listAllPublished(): Promise<
  { slug: string; locale: Locale; updated_at: string }[]
> {
  try {
    const sql = getDb();
    const rows = await sql`
      SELECT slug, locale, updated_at FROM blog_posts WHERE status = 'published'
    `;
    return (rows as { slug: string; locale: string; updated_at: string }[])
      .filter((r) => isLocale(r.locale))
      .map((r) => ({ ...r, locale: r.locale as Locale }));
  } catch {
    return [];
  }
}

// ── Admin ────────────────────────────────────────────────────────────────────

export async function listAllPosts(): Promise<BlogPost[]> {
  const sql = getDb();
  const rows = await sql`
    SELECT * FROM blog_posts
    ORDER BY COALESCE(published_at, created_at) DESC, locale
  `;
  return rows as BlogPost[];
}

export async function getPostById(id: number): Promise<BlogPost | null> {
  const sql = getDb();
  const rows = await sql`SELECT * FROM blog_posts WHERE id = ${id} LIMIT 1`;
  return (rows[0] as BlogPost) ?? null;
}

export async function getPostBySlugLocale(
  slug: string,
  locale: string,
): Promise<BlogPost | null> {
  const sql = getDb();
  const rows = await sql`
    SELECT * FROM blog_posts WHERE slug = ${slug} AND locale = ${locale} LIMIT 1
  `;
  return (rows[0] as BlogPost) ?? null;
}

export async function upsertPost(data: {
  slug: string;
  locale: Locale;
  title: string;
  excerpt: string;
  body: string;
  status: PostStatus;
}): Promise<void> {
  const sql = getDb();
  const publishedAt = data.status === "published" ? new Date() : null;
  await sql`
    INSERT INTO blog_posts (slug, locale, title, excerpt, body, status, published_at)
    VALUES (
      ${data.slug}, ${data.locale}, ${data.title}, ${data.excerpt},
      ${sanitizeBody(data.body)}, ${data.status}, ${publishedAt}
    )
    ON CONFLICT (slug, locale) DO UPDATE SET
      title = EXCLUDED.title,
      excerpt = EXCLUDED.excerpt,
      body = EXCLUDED.body,
      status = EXCLUDED.status,
      -- se conserva la fecha original de publicación si ya estaba publicada
      published_at = COALESCE(blog_posts.published_at, EXCLUDED.published_at),
      updated_at = now()
  `;
}

export async function deletePost(id: number): Promise<void> {
  const sql = getDb();
  await sql`DELETE FROM blog_posts WHERE id = ${id}`;
}

export async function setPostStatus(
  id: number,
  status: PostStatus,
): Promise<void> {
  const sql = getDb();
  if (status === "published") {
    await sql`
      UPDATE blog_posts
      SET status = 'published', published_at = COALESCE(published_at, now()), updated_at = now()
      WHERE id = ${id}
    `;
    return;
  }
  await sql`
    UPDATE blog_posts SET status = 'draft', updated_at = now() WHERE id = ${id}
  `;
}
