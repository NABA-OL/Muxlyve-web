import { ArticleLayout } from "@/components/help/ArticleLayout";
import { ScreenshotPlaceholder } from "@/components/help/ScreenshotPlaceholder";

export const metadata = {
  title: "Aviso cuando se corta el audio — Ayuda",
  description:
    "Muxlyve te avisa con una notificación nativa si no detecta audio real durante 20 segundos mientras estás en vivo.",
};

export default function Page() {
  return (
    <ArticleLayout slug="audio-cortado" title="Aviso cuando se corta el audio">
      <p>
        Micrófono desconectado, app de captura caída — te enteras en el
        momento, no cuando alguien te lo dice en el chat 20 minutos después.
      </p>
      <p>
        Si Muxlyve no detecta audio real durante 20 segundos mientras estás
        en vivo, manda una notificación nativa del sistema. Mide sobre la
        señal real de entrada, así que no se dispara por una pausa normal.
      </p>
      <ScreenshotPlaceholder
        src="/help/audio-cortado.png"
        label='notificación nativa de "se cortó el audio" O el toggle en Preferencias'
      />
      <p>
        Es desactivable desde Preferencias, para quien prefiera no recibir
        este aviso.
      </p>
    </ArticleLayout>
  );
}
