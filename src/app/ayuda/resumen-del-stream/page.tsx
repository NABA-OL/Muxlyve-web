import { ArticleLayout } from "@/components/help/ArticleLayout";
import { ScreenshotPlaceholder } from "@/components/help/ScreenshotPlaceholder";

export const metadata = {
  title: "Resumen del stream — Ayuda",
  description:
    "El resumen automático que arma Muxlyve al terminar una transmisión: duración, espectadores, chat y bitrate.",
};

export default function Page() {
  return (
    <ArticleLayout slug="resumen-del-stream" title="Resumen del stream">
      <p>
        Al terminar una transmisión, Muxlyve arma un resumen automático con:
      </p>
      <ul>
        <li>Duración total.</li>
        <li>Pico de espectadores por plataforma.</li>
        <li>Cantidad de mensajes de chat recibidos.</li>
        <li>Bitrate promedio por destino.</li>
      </ul>
      <ScreenshotPlaceholder
        src="/help/resumen-del-stream.png"
        label="Informacion que muestra resumen de la ultima transmision"
      />
    </ArticleLayout>
  );
}
