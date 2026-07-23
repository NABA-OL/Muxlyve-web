import { ArticleLayout } from "@/components/help/ArticleLayout";

export const metadata = {
  title: "Programar inicio y comprobación previa — Ayuda",
  description:
    "Cómo programar el arranque automático de tus destinos y revisar que todo esté bien antes de salir en vivo.",
};

export default function Page() {
  return (
    <ArticleLayout title="Programar inicio y comprobación previa">
      <h2>Programar inicio</h2>
      <p>
        Elegí una hora futura para que los destinos seleccionados arranquen
        solos, sin tener que estar pendiente en el momento exacto.
      </p>
      <ol>
        <li>Abrí &quot;Programar inicio&quot; en el panel.</li>
        <li>Elegí los destinos y la hora.</li>
        <li>Confirmá con &quot;Programar&quot;.</li>
      </ol>
      <h2>Comprobación previa</h2>
      <p>
        Botón &quot;Comprobar antes de salir en vivo&quot; — corre una
        revisión rápida antes de arrancar, útil para no salir en vivo con
        algo mal configurado. Está en el mismo panel de acciones que
        &quot;Programar inicio&quot;.
      </p>
    </ArticleLayout>
  );
}
