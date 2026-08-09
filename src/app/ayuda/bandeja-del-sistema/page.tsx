import { ArticleLayout } from "@/components/help/ArticleLayout";
import { ScreenshotPlaceholder } from "@/components/help/ScreenshotPlaceholder";

export const metadata = {
  title: "Bandeja del sistema — Ayuda",
  description:
    "El ícono de Muxlyve en la bandeja del sistema muestra viewers en vivo por plataforma sin tener el panel abierto.",
};

export default function Page() {
  return (
    <ArticleLayout slug="bandeja-del-sistema" title="Bandeja del sistema">
      <p>
        Mientras transmites, el ícono de Muxlyve en la bandeja del sistema
        (system tray) muestra el estado en vivo de tu stream — viewers por
        plataforma — sin necesidad de tener el panel principal abierto.
      </p>
      <ScreenshotPlaceholder
        src="/help/bandeja-del-sistema.png"
        label="ícono de Muxlyve en la bandeja del sistema con el desplegable de viewers por plataforma"
      />
    </ArticleLayout>
  );
}
