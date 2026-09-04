/*
 * Propiedad de BlacKraken Solutions <blackraken.com>
 * Desarrollado por: NABAOL
 * Fecha de creación: 2026-09-03
 */
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { routing, type Locale } from "@/i18n/routing";
import {
  deletePost,
  getPostById,
  setPostStatus,
  slugify,
  upsertPost,
  type PostStatus,
} from "@/lib/blog";
import { ensureSchema } from "@/lib/db";
import { translatePost, isTranslationEnabled } from "@/lib/translate-post";

const MAX_TITLE = 200;
const MAX_EXCERPT = 400;
const MAX_BODY = 100_000;

function isLocale(value: string): value is Locale {
  return (routing.locales as readonly string[]).includes(value);
}

/** Refresca las rutas públicas que muestran la entrada. */
function revalidateBlog(slug: string, locale: Locale): void {
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  revalidatePath(`${prefix}/blog`);
  revalidatePath(`${prefix}/blog/${slug}`);
  revalidatePath("/sitemap.xml");
}

export async function savePostAction(formData: FormData): Promise<void> {
  await ensureSchema();

  const title = String(formData.get("title") ?? "").trim();
  const localeRaw = String(formData.get("locale") ?? "");
  const body = String(formData.get("body") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const statusRaw = String(formData.get("status") ?? "draft");
  const slugRaw = String(formData.get("slug") ?? "").trim();

  if (!title || !body || !isLocale(localeRaw)) {
    redirect("/admin/blog?error=campos");
  }
  if (
    title.length > MAX_TITLE ||
    excerpt.length > MAX_EXCERPT ||
    body.length > MAX_BODY
  ) {
    redirect("/admin/blog?error=largo");
  }

  const status: PostStatus = statusRaw === "published" ? "published" : "draft";
  const slug = slugify(slugRaw || title);
  if (!slug) redirect("/admin/blog?error=slug");

  await upsertPost({ slug, locale: localeRaw, title, excerpt, body, status });
  revalidateBlog(slug, localeRaw);
  revalidatePath("/admin/blog");

  redirect(`/admin/blog?saved=${encodeURIComponent(slug)}`);
}

export async function togglePublishAction(formData: FormData): Promise<void> {
  const id = Number(formData.get("id"));
  const next = String(formData.get("next") ?? "");
  if (!id || (next !== "published" && next !== "draft")) return;

  await ensureSchema();
  const post = await getPostById(id);
  if (!post) return;

  await setPostStatus(id, next);
  revalidateBlog(post.slug, post.locale);
  revalidatePath("/admin/blog");
}

export async function deletePostAction(formData: FormData): Promise<void> {
  const id = Number(formData.get("id"));
  if (!id) return;

  await ensureSchema();
  const post = await getPostById(id);
  if (!post) return;

  await deletePost(id);
  revalidateBlog(post.slug, post.locale);
  revalidatePath("/admin/blog");
}

/**
 * Traduce una entrada existente a los demás idiomas y las guarda como
 * BORRADOR, nunca publicadas: la traducción automática hay que revisarla antes
 * de publicarla (Google penaliza el contenido traducido a máquina sin revisar).
 */
export async function translatePostAction(formData: FormData): Promise<void> {
  const id = Number(formData.get("id"));
  if (!id) return;

  if (!isTranslationEnabled()) {
    redirect("/admin/blog?error=sin-api-key");
  }

  await ensureSchema();
  const source = await getPostById(id);
  if (!source) redirect("/admin/blog?error=no-existe");

  const targets = routing.locales.filter((l) => l !== source.locale);
  let ok = 0;

  for (const target of targets) {
    const translated = await translatePost(
      { title: source.title, excerpt: source.excerpt, body: source.body },
      target,
    );
    if (!translated) continue;

    await upsertPost({
      slug: source.slug,
      locale: target,
      title: translated.title,
      excerpt: translated.excerpt,
      body: translated.body,
      status: "draft",
    });
    ok++;
  }

  revalidatePath("/admin/blog");
  redirect(`/admin/blog?translated=${ok}`);
}
