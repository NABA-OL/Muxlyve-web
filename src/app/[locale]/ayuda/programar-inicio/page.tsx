import { ArticleLayout } from "@/components/help/ArticleLayout";
import { ScreenshotPlaceholder } from "@/components/help/ScreenshotPlaceholder";

export const metadata = {
  title: "Programar inicio y comprobación previa — Ayuda",
  description:
    "Cómo programar el arranque automático de tus destinos y revisar que todo esté bien antes de salir en vivo.",
};

export default function Page() {
  return (
    <ArticleLayout
      slug="programar-inicio"
      title="Programar inicio y comprobación previa"
    >
      <h2>Programar inicio</h2>
      <p>
        Elige una hora futura para que los destinos seleccionados arranquen
        solos, sin tener que estar pendiente en el momento exacto.
      </p>
      <ol>
        <li>Abre &quot;Programar inicio&quot; en el panel.</li>
        <li>Elige los destinos y la hora.</li>
        <li>Confirma con &quot;Programar&quot;.</li>
      </ol>
      <ScreenshotPlaceholder
        src="/help/programar-inicio-1.png"
        label="Panel de acciones que muestra programar inicio"
      />
      <ScreenshotPlaceholder
        src="/help/programar-inicio-2.png"
        label="Modal para confirmar la programación de inicio de cada plataforma configurada"
      />
      <h2>Comprobación previa</h2>
      <p>
        Botón &quot;Comprobar antes de salir en vivo&quot; — corre una
        revisión rápida antes de arrancar, útil para no salir en vivo con
        algo mal configurado. Está en el mismo panel de acciones que
        &quot;Programar inicio&quot;.
      </p>
      <ScreenshotPlaceholder
        src="/help/comprobacion-previa-1.png"
        label="Panel de acciones que muestra comprobación previa"
      />
      <ScreenshotPlaceholder
        src="/help/comprobacion-previa-2.png"
        label="Modal para validar la comprobación previa del stream"
      />
    </ArticleLayout>
  );
}
