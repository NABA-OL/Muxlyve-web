import { ArticleLayout } from "@/components/help/ArticleLayout";
import { ScreenshotPlaceholder } from "@/components/help/ScreenshotPlaceholder";

export const metadata = {
  title: "Conectar OBS (o cualquier software de streaming) — Ayuda",
  description:
    "Server RTMP y stream key para apuntar OBS, Streamlabs, XSplit, vMix o cualquier encoder a Muxlyve.",
};

export default function Page() {
  return (
    <ArticleLayout title="Conectar OBS (o cualquier software de streaming)">
      <ul>
        <li>
          Server RTMP: <code>rtmp://localhost:19350/live</code> (puerto
          configurable).
        </li>
        <li>
          Stream Key: la que definas vos (<code>STREAM_KEY</code>, por
          defecto <code>mistream</code>).
        </li>
      </ul>
      <ScreenshotPlaceholder
        src="/help/conectar-tu-software.png"
        label="configuración de stream en OBS con el server/key de Muxlyve"
      />
      <p>
        <strong>No es un plugin de OBS</strong> — es una app aparte, funciona
        igual con Streamlabs, XSplit, vMix, o cualquier encoder de hardware
        que hable RTMP.
      </p>
    </ArticleLayout>
  );
}
