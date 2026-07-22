import { ArticleLayout } from "@/components/help/ArticleLayout";
import { ScreenshotPlaceholder } from "@/components/help/ScreenshotPlaceholder";

export const metadata = {
  title: "Instalación y primer arranque — Ayuda",
  description:
    "Cómo descargar, instalar y activar tu licencia de Muxlyve por primera vez, en Windows o macOS.",
};

export default function Page() {
  return (
    <ArticleLayout title="Instalación y primer arranque">
      <ol>
        <li>
          Descargá el instalador (Windows <code>.exe</code> / macOS{" "}
          <code>.dmg</code>) desde la página de descarga.
        </li>
        <li>
          Windows: seguí los pasos del instalador.
          <ScreenshotPlaceholder
            src="/help/instalacion-primer-arranque-1.png"
            label="pantalla del instalador NSIS bilingüe"
          />
          Mac: arrastrá Muxlyve a la carpeta Aplicaciones.
        </li>
        <li>
          Primer arranque: activá tu licencia.
          <ScreenshotPlaceholder
            src="/help/instalacion-primer-arranque-2.png"
            label="modal de activar licencia"
          />
        </li>
        <li>
          Muxlyve detecta el idioma de tu sistema automáticamente (español o
          inglés) — se puede cambiar después en Preferencias.
        </li>
      </ol>
    </ArticleLayout>
  );
}
