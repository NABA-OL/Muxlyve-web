import { ArticleLayout } from "@/components/help/ArticleLayout";
import { ScreenshotPlaceholder } from "@/components/help/ScreenshotPlaceholder";

export const metadata = {
  title: "Instalación y primer arranque — Ayuda",
  description:
    "Cómo descargar, instalar y activar tu licencia de Muxlyve por primera vez, en Windows o macOS.",
};

export default function Page() {
  return (
    <ArticleLayout
      slug="instalacion-primer-arranque"
      title="Instalación y primer arranque"
    >
      <ol>
        <li>
          Descarga el instalador (Windows <code>.exe</code> / macOS{" "}
          <code>.dmg</code>) desde la página de descarga.
        </li>
        <li>
          Windows: sigue los pasos del instalador.
          <ScreenshotPlaceholder
            src="/help/instalacion-primer-arranque-1.png"
            label="pantalla del instalador NSIS bilingüe"
          />
          Mac: arrastra Muxlyve a la carpeta Aplicaciones.
          <ScreenshotPlaceholder
            src="/help/instalacion-primer-arranque-2.png"
            label="pantalla de instalador de mac"
          />
        </li>
        <li>
          Primer arranque: activa tu licencia.
          <ScreenshotPlaceholder
            src="/help/instalacion-primer-arranque-3.png"
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
