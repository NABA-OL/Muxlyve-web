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

      <h2>Historial de sesiones</h2>
      <p>
        Cada vez que sales en vivo de verdad, Muxlyve guarda un registro
        automático: fecha, duración, plataformas usadas y pico de
        espectadores. Tu propio historial de streams, sin depender del
        analytics de cada plataforma por separado.
      </p>
      <p>
        100% local — no requiere cuenta ni nube — y guarda las últimas 100
        sesiones.
      </p>
      <ScreenshotPlaceholder
        src="/help/historial-sesiones.png"
        label="pestaña Historial en Preferencias, con varias sesiones listadas"
      />
    </ArticleLayout>
  );
}
