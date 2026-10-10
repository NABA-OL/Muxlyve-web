/*
 * Propiedad de BlacKraken Solutions
 * Desarrollado por: NABAOL
 * Fecha de creación: 2026-07-25
 * Correo: nabaol.dev@gmail.com
 * Copyright (c) 2026 BlacKraken Solutions. Todos los derechos reservados.
 */

import { requireAdmin } from "@/lib/admin-guard";
import { getDb, ensureSchema } from "@/lib/db";
import { updateFeedbackStatusAction } from "./actions";

type Feedback = {
  id: number;
  email: string | null;
  app_version: string | null;
  platform: string | null;
  description: string;
  status: string;
  ip: string;
  created_at: string;
};

export const dynamic = "force-dynamic";

const STATUS_LABEL: Record<string, string> = {
  new: "Nuevo",
  read: "Leído",
  archived: "Archivado",
};

const STATUS_COLOR: Record<string, string> = {
  new: "#4da3ff",
  read: "#8b949e",
  archived: "#3fb950",
};

export default async function FeedbackPage() {
  await requireAdmin();
  await ensureSchema();
  const sql = getDb();
  const items = (await sql`
    SELECT id, email, app_version, platform, description, status, ip, created_at
    FROM feedback
    ORDER BY created_at DESC
    LIMIT 50
  `) as Feedback[];

  return (
    <main style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ fontWeight: 700, fontSize: "1.4rem", marginBottom: "1.5rem" }}>
        Feedback ({items.length})
      </h1>

      {items.length === 0 ? (
        <p style={{ color: "var(--muted)" }}>No hay feedback aún.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {items.map((f) => (
            <div
              key={f.id}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "0.5rem",
                padding: "1rem 1.25rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  gap: "0.5rem 1.5rem",
                  marginBottom: "0.5rem",
                  fontSize: "0.82rem",
                  color: "var(--muted)",
                }}
              >
                <span>#{f.id}</span>
                <span>{new Date(f.created_at).toLocaleString("es-CO")}</span>
                {f.email && <span>{f.email}</span>}
                {f.platform && <span>{f.platform}</span>}
                {f.app_version && <span>v{f.app_version}</span>}
                <span style={{ opacity: 0.6 }}>{f.ip}</span>
                <span
                  style={{
                    color: STATUS_COLOR[f.status] ?? "var(--muted)",
                    fontWeight: 600,
                  }}
                >
                  {STATUS_LABEL[f.status] ?? f.status}
                </span>
              </div>

              <p style={{ margin: "0 0 0.85rem", whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                {f.description}
              </p>

              <div style={{ display: "flex", gap: "0.6rem" }}>
                {f.status === "new" && (
                  <form action={updateFeedbackStatusAction}>
                    <input type="hidden" name="id" value={f.id} />
                    <input type="hidden" name="status" value="read" />
                    <button type="submit" className="btn btn-ghost" style={{ fontSize: "0.8rem" }}>
                      Marcar leído
                    </button>
                  </form>
                )}
                {f.status !== "archived" && (
                  <form action={updateFeedbackStatusAction}>
                    <input type="hidden" name="id" value={f.id} />
                    <input type="hidden" name="status" value="archived" />
                    <button type="submit" className="btn btn-ghost" style={{ fontSize: "0.8rem" }}>
                      Archivar
                    </button>
                  </form>
                )}
                {f.status === "archived" && (
                  <form action={updateFeedbackStatusAction}>
                    <input type="hidden" name="id" value={f.id} />
                    <input type="hidden" name="status" value="new" />
                    <button type="submit" className="btn btn-ghost" style={{ fontSize: "0.8rem" }}>
                      Reabrir
                    </button>
                  </form>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
