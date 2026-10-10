/*
 * Propiedad de BlacKraken Solutions <blackraken.com>
 * Desarrollado por: NABAOL
 * Fecha de creación: 2026-09-03
 */

import { requireAdmin } from "@/lib/admin-guard";
import Link from "next/link";
import { ensureSchema } from "@/lib/db";
import { listAllPosts, getPostById } from "@/lib/blog";
import { isTranslationEnabled } from "@/lib/translate-post";
import { PostForm } from "./PostForm";
import {
  togglePublishAction,
  deletePostAction,
  translatePostAction,
} from "./actions";

export const metadata = { title: "Blog — Admin Muxlyve", robots: "noindex" };
export const dynamic = "force-dynamic";

const LOCALE_LABEL: Record<string, string> = {
  es: "ES",
  en: "EN",
  pt: "PT",
  fr: "FR",
};

const ERRORS: Record<string, string> = {
  campos: "Faltan campos obligatorios (título, cuerpo o idioma).",
  largo: "Algún campo excede el largo permitido.",
  slug: "El slug quedó vacío tras normalizarlo.",
  "sin-api-key":
    "Traducción automática apagada: falta ANTHROPIC_API_KEY en las variables de entorno.",
  "no-existe": "La entrada ya no existe.",
};

export default async function AdminBlogPage({
  searchParams,
}: {
  searchParams: Promise<{
    edit?: string;
    saved?: string;
    error?: string;
    translated?: string;
  }>;
}) {
  await requireAdmin();
  const { edit, saved, error, translated } = await searchParams;

  await ensureSchema();
  const posts = await listAllPosts();
  const editing = edit ? await getPostById(Number(edit)) : null;
  const canTranslate = isTranslationEnabled();

  return (
    <main
      style={{ padding: "2rem 1.5rem", maxWidth: "980px", margin: "0 auto" }}
    >
      <h1 style={{ fontSize: "1.6rem", marginBottom: "0.4rem" }}>Blog</h1>
      <p
        style={{
          color: "var(--muted)",
          fontSize: "0.9rem",
          marginBottom: "2rem",
        }}
      >
        Las entradas se guardan en la base y salen publicadas al instante (la
        página pública se revalida sola al guardar). Escribe en español; los
        demás idiomas se agregan como entradas aparte con el mismo slug.
      </p>

      {saved && (
        <div
          className="card"
          style={{
            borderColor: "var(--success)",
            color: "var(--success)",
            marginBottom: "1.5rem",
          }}
        >
          Guardado: <code>{saved}</code>
        </div>
      )}
      {translated && (
        <div
          className="card"
          style={{
            borderColor: "var(--success)",
            color: "var(--success)",
            marginBottom: "1.5rem",
          }}
        >
          {translated} traducción(es) creadas como borrador. Revísalas antes de
          publicar.
        </div>
      )}
      {error && (
        <div
          className="card"
          style={{
            borderColor: "#f85149",
            color: "#f85149",
            marginBottom: "1.5rem",
          }}
        >
          {ERRORS[error] ?? "Error desconocido."}
        </div>
      )}

      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>
          {editing ? `Editando: ${editing.title}` : "Nueva entrada"}
        </h2>
        <PostForm
          key={editing?.id ?? "new"}
          initial={
            editing
              ? {
                  slug: editing.slug,
                  locale: editing.locale,
                  title: editing.title,
                  excerpt: editing.excerpt,
                  body: editing.body,
                  status: editing.status,
                }
              : undefined
          }
        />
        {editing && (
          <p style={{ marginTop: "1rem" }}>
            <Link
              href="/admin/blog"
              style={{ color: "var(--muted)", fontSize: "0.85rem" }}
            >
              Cancelar edición / crear una nueva
            </Link>
          </p>
        )}
      </section>

      <section>
        <h2 style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>
          Entradas ({posts.length})
        </h2>

        {!canTranslate && (
          <p
            style={{
              color: "var(--muted)",
              fontSize: "0.82rem",
              marginBottom: "1rem",
            }}
          >
            Traducción automática apagada. Agrega <code>ANTHROPIC_API_KEY</code>{" "}
            en Vercel y el botón &quot;Traducir&quot; queda activo — genera los
            otros 3 idiomas como borrador para que los revises.
          </p>
        )}

        {posts.length === 0 ? (
          <p style={{ color: "var(--muted)" }}>Todavía no hay entradas.</p>
        ) : (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}
          >
            {posts.map((p) => (
              <div
                key={p.id}
                className="card"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "1rem",
                  flexWrap: "wrap",
                  alignItems: "center",
                }}
              >
                <div style={{ minWidth: 0 }}>
                  <div
                    style={{
                      display: "flex",
                      gap: "0.6rem",
                      alignItems: "center",
                      flexWrap: "wrap",
                      marginBottom: "0.25rem",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        color: "var(--accent-2)",
                        border: "1px solid var(--border)",
                        borderRadius: "4px",
                        padding: "0.05rem 0.35rem",
                      }}
                    >
                      {LOCALE_LABEL[p.locale] ?? p.locale}
                    </span>
                    <strong style={{ fontSize: "0.95rem" }}>{p.title}</strong>
                    <span
                      style={{
                        fontSize: "0.78rem",
                        color:
                          p.status === "published" ? "#3fb950" : "var(--muted)",
                      }}
                    >
                      {p.status === "published" ? "Publicada" : "Borrador"}
                    </span>
                  </div>
                  <code style={{ fontSize: "0.78rem", color: "var(--muted)" }}>
                    /blog/{p.slug}
                  </code>
                </div>

                <div
                  style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}
                >
                  <Link
                    href={`/admin/blog?edit=${p.id}`}
                    className="btn btn-ghost"
                    style={{ fontSize: "0.8rem" }}
                  >
                    Editar
                  </Link>
                  <form action={togglePublishAction}>
                    <input type="hidden" name="id" value={p.id} />
                    <input
                      type="hidden"
                      name="next"
                      value={p.status === "published" ? "draft" : "published"}
                    />
                    <button
                      type="submit"
                      className="btn btn-ghost"
                      style={{ fontSize: "0.8rem" }}
                    >
                      {p.status === "published" ? "Despublicar" : "Publicar"}
                    </button>
                  </form>
                  <form action={translatePostAction}>
                    <input type="hidden" name="id" value={p.id} />
                    <button
                      type="submit"
                      className="btn btn-ghost"
                      disabled={!canTranslate}
                      title={
                        canTranslate
                          ? "Genera los otros idiomas como borrador"
                          : "Falta ANTHROPIC_API_KEY"
                      }
                      style={{
                        fontSize: "0.8rem",
                        opacity: canTranslate ? 1 : 0.45,
                        cursor: canTranslate ? "pointer" : "not-allowed",
                      }}
                    >
                      Traducir
                    </button>
                  </form>
                  <form action={deletePostAction}>
                    <input type="hidden" name="id" value={p.id} />
                    <button
                      type="submit"
                      className="btn btn-ghost"
                      style={{ fontSize: "0.8rem", color: "#f85149" }}
                    >
                      Eliminar
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
