import { ArticleLayout } from "@/components/help/ArticleLayout";
import { ScreenshotPlaceholder } from "@/components/help/ScreenshotPlaceholder";

export const metadata = {
  title: "Chat unificado — Ayuda",
  description:
    "Ve los mensajes de Twitch y Kick en un solo lugar y responde desde Muxlyve sin cambiar de pestaña.",
};

export default function Page() {
  return (
    <ArticleLayout slug="chat-unificado" title="Chat unificado">
      <p>
        Ve los mensajes de Twitch y Kick en un solo lugar, sin cambiar de
        pestaña. Puedes responder desde la app a todas las plataformas
        conectadas a la vez.
      </p>
      <p>
        Moderación (modo lento, solo emotes, fijar mensaje, timeout y ban) —
        hoy es <strong>solo Twitch</strong>, por límite de la API pública de
        Kick, no decisión de Muxlyve.
      </p>
      <ScreenshotPlaceholder
        src="/help/chat-unificado.png"
        label="panel de chat con mensajes de ambas plataformas"
      />

      <h2>Timeout y ban</h2>
      <p>
        Desde el mismo chat, sin salir a la web de Twitch: timeout (1 min /
        10 min / 1 hora) o ban permanente sobre un mensaje. Moderas sin
        cambiar de ventana.
      </p>
      <ScreenshotPlaceholder
        src="/help/chat-unificado-moderacion.png"
        label="menú de moderación (timeout/ban) abierto junto a un mensaje del chat"
      />
    </ArticleLayout>
  );
}
