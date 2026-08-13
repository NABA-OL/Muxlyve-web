import { ArticleLayout } from "@/components/help/ArticleLayout";
import { ScreenshotPlaceholder } from "@/components/help/ScreenshotPlaceholder";

export const metadata = {
  title: "Acerca de Muxlyve — Ayuda",
  description:
    "Dónde ver la versión instalada de Muxlyve y los datos del desarrollador.",
};

export default function Page() {
  return (
    <ArticleLayout slug="acerca-de-muxlyve" title="Acerca de Muxlyve">
      <p>
        &quot;Acerca de Muxlyve&quot; es su propio ítem en el menú de
        Preferencias (antes vivía como un botón dentro de Licencia). Muestra
        la versión instalada y los datos del desarrollador.
      </p>
      <ScreenshotPlaceholder
        src="/help/acerca-de-muxlyve.png"
        label="modal de Acerca de Muxlyve, con versión y datos del desarrollador"
      />
    </ArticleLayout>
  );
}
