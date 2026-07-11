// Desarrollado por BlacKraken Solutions
import type { CSSProperties } from "react";
import { sendOutreachAction } from "./actions";

type Props = {
  searchParams: Promise<{ sent?: string; error?: string }>;
};

const inputStyle: CSSProperties = {
  background: "var(--surface)",
  border: "1px solid var(--border)",
  borderRadius: "0.4rem",
  padding: "0.6rem 0.8rem",
  color: "var(--fg)",
  fontSize: "0.9rem",
  width: "100%",
  boxSizing: "border-box",
};

export default async function CorreoPage({ searchParams }: Props) {
  const { sent, error } = await searchParams;

  return (
    <main style={{ padding: "2rem", maxWidth: "700px", margin: "0 auto" }}>
      <h1 style={{ fontWeight: 700, fontSize: "1.4rem", marginBottom: "0.35rem" }}>
        Correo de difusión
      </h1>
      <p style={{ color: "var(--muted)", fontSize: "0.88rem", marginBottom: "2rem" }}>
        Redacta y envía un correo con la plantilla de Muxlyve vía Resend.
      </p>

      {sent && (
        <div
          style={{
            background: "rgba(63,185,80,0.10)",
            border: "1px solid rgba(63,185,80,0.35)",
            color: "#3fb950",
            borderRadius: "0.5rem",
            padding: "0.75rem 1rem",
            marginBottom: "1.5rem",
            fontSize: "0.9rem",
          }}
        >
          Correo enviado correctamente.
        </div>
      )}

      {error && (
        <div
          style={{
            background: "rgba(248,81,73,0.10)",
            border: "1px solid rgba(248,81,73,0.35)",
            color: "#f85149",
            borderRadius: "0.5rem",
            padding: "0.75rem 1rem",
            marginBottom: "1.5rem",
            fontSize: "0.9rem",
          }}
        >
          Error: {decodeURIComponent(error)}
        </div>
      )}

      <form
        action={sendOutreachAction}
        style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
      >
        <label style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
          <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>Destinatario</span>
          <input
            type="email"
            name="to"
            required
            placeholder="streamer@email.com"
            style={inputStyle}
          />
        </label>

        <label style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
          <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>Asunto</span>
          <input
            type="text"
            name="subject"
            required
            placeholder="¿Conoces Muxlyve?"
            style={inputStyle}
          />
        </label>

        <label style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
          <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>Cuerpo del correo</span>
          <textarea
            name="body"
            required
            rows={14}
            placeholder={
              "Hola **Nombre**,\n\nMe puse en contacto contigo porque creo que **Muxlyve** puede ayudarte a:\n\n- Transmitir a Twitch, YouTube y Kick al mismo tiempo\n- Sin marca de agua\n- Sin costos recurrentes\n\nSaludos,"
            }
            style={{ ...inputStyle, resize: "vertical", lineHeight: 1.65, fontFamily: "inherit" }}
          />
          <span style={{ fontSize: "0.78rem", color: "var(--muted)" }}>
            Soporta Markdown: <code>**negrita**</code>, <code>*cursiva*</code>, <code>- listas</code>, <code>[link](url)</code>
          </span>
        </label>

        <button
          type="submit"
          className="btn btn-primary"
          style={{ alignSelf: "flex-start" }}
        >
          Enviar correo
        </button>
      </form>

      {/* Vista previa de la plantilla */}
      <div style={{ marginTop: "3rem" }}>
        <h2 style={{ fontSize: "0.95rem", fontWeight: 600, marginBottom: "0.85rem", color: "var(--muted)" }}>
          VISTA PREVIA DE PLANTILLA
        </h2>
        <div
          style={{
            border: "1px solid var(--border)",
            borderRadius: "10px",
            overflow: "hidden",
            fontSize: "0.85rem",
          }}
        >
          {/* Header */}
          <div
            style={{
              background:
                "linear-gradient(135deg, rgba(124,92,255,0.14) 0%, rgba(77,163,255,0.08) 100%)",
              borderBottom: "1px solid rgba(124,92,255,0.25)",
              padding: "1.25rem 2rem",
              textAlign: "center",
            }}
          >
            <span style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--accent)" }}>
              Muxlyve
            </span>
            <p style={{ margin: "0.25rem 0 0", fontSize: "0.72rem", color: "var(--muted)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
              Multistreaming de escritorio
            </p>
          </div>
          {/* Body placeholder */}
          <div style={{ padding: "1.5rem 2rem", color: "var(--muted)", fontStyle: "italic" }}>
            Tu mensaje aparece aquí...
          </div>
          {/* Footer */}
          <div
            style={{
              borderTop: "1px solid var(--border)",
              padding: "0.85rem 2rem",
              textAlign: "center",
              fontSize: "0.75rem",
              color: "var(--muted)",
            }}
          >
            © {new Date().getFullYear()} Muxlyve · muxlyve.com
          </div>
        </div>
      </div>
    </main>
  );
}
