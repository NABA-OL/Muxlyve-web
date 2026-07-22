import { ArticleLayout } from "@/components/help/ArticleLayout";
import { ScreenshotPlaceholder } from "@/components/help/ScreenshotPlaceholder";

export const metadata = {
  title: "Chat unificado — Ayuda",
  description:
    "Ve los mensajes de Twitch y Kick en un solo lugar y responde desde Muxlyve sin cambiar de pestaña.",
};

export default function Page() {
  return (
    <ArticleLayout title="Chat unificado">
      <p>
        Ve los mensajes de Twitch y Kick en un solo lugar, sin cambiar de
        pestaña. Podés responder desde la app a todas las plataformas
        conectadas a la vez.
      </p>
      <p>
        Moderación (modo lento, solo emotes, fijar mensaje) — hoy es{" "}
        <strong>solo Twitch</strong>, por límite de la API pública de Kick, no
        decisión de Muxlyve.
      </p>
      <ScreenshotPlaceholder
        src="/help/chat-unificado.png"
        label="panel de chat con mensajes de ambas plataformas"
      />
    </ArticleLayout>
  );
}
