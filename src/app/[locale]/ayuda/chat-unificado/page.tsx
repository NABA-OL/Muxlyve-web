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

      <h2>Traducir mensajes del chat</h2>
      <p>
        En Preferencias → Chat, activa &quot;Traducir mensajes del chat&quot;
        (apagado por defecto). Cuando llega un mensaje en un idioma distinto
        al de la app, Muxlyve muestra la traducción como una línea aparte
        debajo del mensaje original — nunca lo reemplaza.
      </p>
      <p>
        Usa un servicio externo no oficial (Google Translate), así que es{" "}
        <em>best-effort</em>: puede fallar sin avisar en algún mensaje puntual
        y el chat sigue funcionando igual de bien, solo sin esa traducción.
      </p>
      <ScreenshotPlaceholder
        src="/help/chat-traduccion.png"
        label="toggle de traducción en Preferencias → Chat, y un mensaje con su traducción debajo"
      />
    </ArticleLayout>
  );
}
