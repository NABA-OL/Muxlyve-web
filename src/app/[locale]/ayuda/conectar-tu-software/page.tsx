import { ArticleLayout } from "@/components/help/ArticleLayout";
import { ScreenshotPlaceholder } from "@/components/help/ScreenshotPlaceholder";

export const metadata = {
  title: "Conectar tu software de streaming (OBS, Streamlabs, Xsplit, etc.) — Ayuda",
  description:
    "Server RTMP y stream key para apuntar OBS, Streamlabs, XSplit, vMix o cualquier encoder a Muxlyve.",
};

export default function Page() {
  return (
    <ArticleLayout
      slug="conectar-tu-software"
      title="Conectar tu software de streaming (OBS, Streamlabs, Xsplit, etc.)"
    >
      <p>
        Muxlyve funciona con cualquier encoder que envie video por RTMP/RTMPS.
      </p>
      <ul>
        <li>
          Server RTMP: <code>rtmp://localhost:19350/live</code> (puerto
          configurable).
        </li>
        <li>
          Stream Key: Por defecto se asigna la clave pero si deseas puedes asignar la clave que desees.
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
