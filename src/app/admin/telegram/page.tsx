/*
 * Propiedad de BlacKraken Solutions <blackraken.com>
 * Desarrollado por: NABAOL
 * Fecha de creación: 2026-08-14
 */
import { requireAdmin } from "@/lib/admin-guard";
import { testTelegramAction } from "./actions";
import type { TelegramTopic } from "@/lib/telegram";

export const metadata = {
  title: "Telegram — Admin Muxlyve",
  robots: "noindex",
};
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
  await requireAdmin();
  const { sent, failed } = await searchParams;

  return (
    <main
      style={{ padding: "2rem 1.5rem", maxWidth: "600px", margin: "0 auto" }}
    >
      <h1 style={{ fontSize: "1.6rem", marginBottom: "0.4rem" }}>Telegram</h1>
      <p
        style={{
          color: "var(--muted)",
          fontSize: "0.9rem",
          marginBottom: "2rem",
        }}
      >
        Notificaciones automáticas: reportes de error, feedback, compras y
        nuevas versiones se mandan al chat/tema configurado en las variables de
        entorno <code>TELEGRAM_*</code>. Prueba cada tema acá.
      </p>

      {sent && (
        <div
          className="card"
          style={{
            borderColor: "var(--success)",
            color: "var(--success)",
            marginBottom: "1.5rem",
          }}
        >
          Mensaje de prueba enviado al tema &quot;{sent}&quot;. Revisa Telegram.
        </div>
      )}
      {failed && (
        <div
          className="card"
          style={{
            borderColor: "#f85149",
            color: "#f85149",
            marginBottom: "1.5rem",
          }}
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

      <h2 style={{ fontSize: "1.1rem", margin: "2.5rem 0 0.6rem" }}>
        Comandos del bot
      </h2>
      <p
        style={{
          color: "var(--muted)",
          fontSize: "0.9rem",
          marginBottom: "0.8rem",
        }}
      >
        Escríbelos directo en el chat/grupo configurado (requiere el webhook
        activo — ver <code>TELEGRAM_WEBHOOK_SECRET</code> en{" "}
        <code>.env.local.example</code>).
      </p>
      <ul
        style={{
          color: "var(--muted)",
          fontSize: "0.88rem",
          lineHeight: 1.9,
          paddingLeft: "1.2rem",
        }}
      >
        <li>
          <code>/licencias correo@ejemplo.com</code> — busca licencias por email
        </li>
        <li>
          <code>/estado</code> — licencias activas, reportes 24h, feedback sin
          leer
        </li>
        <li>
          <code>/pendientes</code> — feedback sin leer + reportes recientes
        </li>
        <li>
          <code>/resumen</code> — compras, reportes y feedback de hoy
        </li>
      </ul>
    </main>
  );
}
