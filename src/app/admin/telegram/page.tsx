/*
 * Propiedad de BlacKraken Solutions
 * Desarrollado por: NABAOL
 * Fecha de creación: 2026-08-14
 */
import { testTelegramAction } from "./actions";
import type { TelegramTopic } from "@/lib/telegram";

export const metadata = { title: "Telegram — Admin Muxlyve", robots: "noindex" };
export const dynamic = "force-dynamic";

const BUTTONS: { topic: TelegramTopic; label: string }[] = [
  { topic: "reports", label: "Probar reportes" },
  { topic: "feedback", label: "Probar feedback" },
  { topic: "purchases", label: "Probar compras" },
  { topic: "releases", label: "Probar versiones" },
];

export default async function TelegramPage({
  searchParams,
}: {
  searchParams: Promise<{ sent?: string; failed?: string }>;
}) {
  const { sent, failed } = await searchParams;

  return (
    <main style={{ padding: "2rem 1.5rem", maxWidth: "600px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "1.6rem", marginBottom: "0.4rem" }}>Telegram</h1>
      <p style={{ color: "var(--muted)", fontSize: "0.9rem", marginBottom: "2rem" }}>
        Notificaciones automáticas: reportes de error, feedback, compras y
        nuevas versiones se mandan al chat/tema configurado en las variables
        de entorno <code>TELEGRAM_*</code>. Prueba cada tema acá.
      </p>

      {sent && (
        <div
          className="card"
          style={{ borderColor: "var(--success)", color: "var(--success)", marginBottom: "1.5rem" }}
        >
          Mensaje de prueba enviado al tema &quot;{sent}&quot;. Revisa Telegram.
        </div>
      )}
      {failed && (
        <div
          className="card"
          style={{ borderColor: "#f85149", color: "#f85149", marginBottom: "1.5rem" }}
        >
          No se pudo enviar (tema &quot;{failed}&quot;). Revisa que{" "}
          <code>TELEGRAM_BOT_TOKEN</code> y <code>TELEGRAM_CHAT_ID</code> estén
          configurados.
        </div>
      )}

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.8rem" }}>
        {BUTTONS.map((b) => (
          <form key={b.topic} action={testTelegramAction}>
            <input type="hidden" name="topic" value={b.topic} />
            <button type="submit" className="btn btn-ghost">
              {b.label}
            </button>
          </form>
        ))}
      </div>
    </main>
  );
}
