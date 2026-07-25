import { ArticleLayout } from "@/components/help/ArticleLayout";
import { ScreenshotPlaceholder } from "@/components/help/ScreenshotPlaceholder";

export const metadata = {
  title: 'Guardar un clip escribiendo "!clip" en el chat — Ayuda',
  description:
    "Cómo moderadores y streamer guardan un clip del buffer escribiendo !clip en el chat, sin salir del juego.",
};

export default function Page() {
  return (
    <ArticleLayout
      slug="comando-clip-chat"
      title='Guardar un clip escribiendo "!clip" en el chat'
    >
      <p>
        Cualquier moderador del canal, o el streamer, puede escribir{" "}
        <code>!clip</code> en Twitch, Kick o YouTube y se guarda un clip del
        buffer al instante. Un viewer normal (no mod) no puede.
      </p>
      <h2>Requisitos</h2>
      <ul>
        <li>Buffer de clips activado.</li>
        <li>Transmisión en curso.</li>
      </ul>
      <p>Límite: un clip cada 15 segundos.</p>
      <ScreenshotPlaceholder
        src="/help/comando-clip-chat.png"
        label='toggle "Comando !clip en el chat" en Preferencias'
      />
      <h2>Desactivarlo</h2>
      <p>
        Se puede apagar del todo en Preferencias → Grabador de clips.
      </p>
    </ArticleLayout>
  );
}
