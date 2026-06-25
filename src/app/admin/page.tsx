import { getDb, ensureSchema } from "@/lib/db";
import type { License } from "@/lib/licenses";

export const metadata = { title: "Admin — Muxlyve", robots: "noindex" };
export const dynamic = "force-dynamic";

function maskKey(key: string): string {
  const parts = key.split("-");
  if (parts.length < 2) return `${key.slice(0, 4)}****`;
  return `${parts[0]}-****-****-${parts[parts.length - 1]}`;
}

function statusColor(status: string): string {
  if (status === "active") return "var(--success)";
  if (status === "refunded") return "#f85149";
  return "var(--muted)";
}

export default async function AdminPage() {
  let licenses: License[] = [];
  let dbError = false;

  try {
    await ensureSchema();
    const sql = getDb();
    licenses = (await sql`
      SELECT * FROM licenses ORDER BY created_at DESC LIMIT 200
    `) as License[];
  } catch {
    dbError = true;
  }

  const active = licenses.filter((l) => l.status === "active").length;

  return (
    <main style={{ padding: "2rem 1.5rem", maxWidth: "1100px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "1.6rem", marginBottom: "0.4rem" }}>
        Licencias
      </h1>

      {dbError && (
        <div
          className="card"
          style={{
            borderColor: "#f85149",
            color: "#f85149",
            marginBottom: "1.5rem",
          }}
        >
          Sin conexión a la base de datos. Configura{" "}
          <code>DATABASE_URL</code> en las variables de entorno.
        </div>
      )}

      {!dbError && (
        <>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              marginBottom: "2rem",
              flexWrap: "wrap",
            }}
          >
            <Stat label="Total" value={licenses.length} />
            <Stat label="Activas" value={active} accent />
            <Stat label="Otras" value={licenses.length - active} />
          </div>

          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "0.9rem",
              }}
            >
              <thead>
                <tr style={{ color: "var(--muted)", textAlign: "left" }}>
                  {["Llave", "Email", "Estado", "Equipos", "Fecha"].map(
                    (h) => (
                      <th
                        key={h}
                        style={{
                          padding: "0.6rem 0.8rem",
                          borderBottom: "1px solid var(--border)",
                          fontWeight: 600,
                          fontSize: "0.78rem",
                          textTransform: "uppercase",
                          letterSpacing: "0.06em",
                        }}
                      >
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {licenses.map((l) => (
                  <tr
                    key={l.key}
                    style={{ borderBottom: "1px solid var(--border)" }}
                  >
                    <td
                      style={{
                        padding: "0.7rem 0.8rem",
                        fontFamily: "monospace",
                        fontSize: "0.85rem",
                        color: "var(--accent-2)",
                      }}
                    >
                      {maskKey(l.key)}
                    </td>
                    <td style={{ padding: "0.7rem 0.8rem" }}>{l.email}</td>
                    <td style={{ padding: "0.7rem 0.8rem" }}>
                      <span style={{ color: statusColor(l.status) }}>
                        {l.status}
                      </span>
                    </td>
                    <td style={{ padding: "0.7rem 0.8rem", color: "var(--muted)" }}>
                      {l.devices.length} / {l.max_devices}
                    </td>
                    <td style={{ padding: "0.7rem 0.8rem", color: "var(--muted)" }}>
                      {new Date(l.created_at).toLocaleDateString("es-CO", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
                {licenses.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      style={{
                        padding: "2rem",
                        textAlign: "center",
                        color: "var(--muted)",
                      }}
                    >
                      Aún no hay licencias registradas.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </main>
  );
}

function Stat({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent?: boolean;
}) {
  return (
    <div
      className="card"
      style={{ minWidth: "120px", textAlign: "center", padding: "1rem 1.5rem" }}
    >
      <div
        style={{
          fontSize: "2rem",
          fontWeight: 700,
          color: accent ? "var(--accent)" : "var(--text)",
        }}
      >
        {value}
      </div>
      <div style={{ fontSize: "0.8rem", color: "var(--muted)", marginTop: "0.2rem" }}>
        {label}
      </div>
    </div>
  );
}
