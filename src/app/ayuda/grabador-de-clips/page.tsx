import { ArticleLayout } from "@/components/help/ArticleLayout";
import { ScreenshotPlaceholder } from "@/components/help/ScreenshotPlaceholder";

export const metadata = {
  title: "Grabador de clips (buffer) — Ayuda",
  description:
    "Cómo grabar en un buffer circular mientras transmitís y guardar clips con un clic.",
};

export default function Page() {
  return (
    <ArticleLayout title="Grabador de clips (buffer)">
      <p>
        Muxlyve graba en un buffer circular (30s / 1min / 2min) mientras
        transmitís, para poder guardar &quot;lo que acaba de pasar&quot; sin
        grabar todo el stream entero.
      </p>
      <p>
        Activá el buffer, y con un clic guardá el clip en una carpeta
        configurable.
      </p>
      <ScreenshotPlaceholder
        src="/help/grabador-de-clips.png"
        label="sección de grabador con el toggle activado"
      />
    </ArticleLayout>
  );
}
