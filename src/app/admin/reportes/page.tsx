/*
 * Propiedad de BlacKraken Solutions
 * Desarrollado por: NABAOL
 * Fecha de creación: 2026-07-05
 * Correo: nabaol.dev@gmail.com
 * Copyright (c) 2026 BlacKraken Solutions. Todos los derechos reservados.
 */

import { requireAdmin } from "@/lib/admin-guard";
import { getDb, ensureSchema } from "@/lib/db";

type Report = {
  id: number;
  email: string | null;
  app_version: string | null;
  platform: string | null;
  os_version: string | null;
  description: string;
  log_excerpt: string | null;
  ip: string;
  created_at: string;
};

export const dynamic = "force-dynamic";

export default async function ReportesPage() {
  await requireAdmin();
  await ensureSchema();
  const sql = getDb();
  const reports = (await sql`
    SELECT id, email, app_version, platform, os_version, description, log_excerpt, ip, created_at
    FROM error_reports
    ORDER BY created_at DESC
    LIMIT 50
  `) as Report[];

  return (
    <main style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ fontWeight: 700, fontSize: "1.4rem", marginBottom: "1.5rem" }}>
        Reportes de error ({reports.length})
      </h1>

      {reports.length === 0 ? (
        <p style={{ color: "var(--muted)" }}>No hay reportes aún.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {reports.map((r) => (
            <div
              key={r.id}
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
                  gap: "0.5rem 1.5rem",
                  marginBottom: "0.5rem",
                  fontSize: "0.82rem",
                  color: "var(--muted)",
                }}
              >
                <span>#{r.id}</span>
                <span>{new Date(r.created_at).toLocaleString("es-CO")}</span>
                {r.email && <span>{r.email}</span>}
                {r.platform && <span>{r.platform}</span>}
                {r.app_version && <span>v{r.app_version}</span>}
                {r.os_version && <span>{r.os_version}</span>}
                <span style={{ opacity: 0.6 }}>{r.ip}</span>
              </div>

              <p style={{ margin: "0 0 0.75rem", whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                {r.description}
              </p>

              {r.log_excerpt && (
                <details>
                  <summary
                    style={{ cursor: "pointer", fontSize: "0.82rem", color: "var(--muted)", userSelect: "none" }}
                  >
                    Ver log
                  </summary>
                  <pre
                    style={{
                      marginTop: "0.5rem",
                      padding: "0.75rem",
                      background: "rgba(0,0,0,0.15)",
                      borderRadius: "0.35rem",
                      fontSize: "0.75rem",
                      overflowX: "auto",
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-all",
                      maxHeight: "300px",
                      overflowY: "auto",
                    }}
                  >
                    {r.log_excerpt}
                  </pre>
                </details>
              )}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
