import { ArticleLayout } from "@/components/help/ArticleLayout";
import { ScreenshotPlaceholder } from "@/components/help/ScreenshotPlaceholder";

export const metadata = {
  title: "Exportar e importar tu configuración — Ayuda",
  description:
    "Cómo descargar tus destinos y ajustes en un archivo JSON, y restaurarlos en otra máquina en un clic.",
};

export default function Page() {
  return (
    <ArticleLayout
      slug="exportar-importar-config"
      title="Exportar e importar tu configuración"
    >
      <p>
        Cambiaste de PC, reinstalaste, o le ayudas a alguien a dejar todo
        configurado igual que tú — sin reescribir cada destino y ajuste a
        mano. Desde Preferencias → Sistema, Muxlyve empaqueta tus destinos y
        ajustes en un solo archivo JSON.
      </p>
      <ScreenshotPlaceholder
        src="/help/exportar-importar-config.png"
        label="modal de Preferencias, tab Sistema, con los botones Exportar/Importar"
      />
      <h2>Exportar</h2>
      <p>
        Presiona &quot;Exportar&quot; y elige dónde guardar el archivo. Queda
        todo adentro: destinos, perfiles y el resto de tus ajustes.
      </p>
      <h2>Importar</h2>
      <p>
        Presiona &quot;Importar&quot; y selecciona el archivo. Si el archivo
        viene de una cuenta distinta a la que está activa en ese momento,
        Muxlyve avisa antes de aplicar nada — nunca reemplaza en silencio la
        configuración de otra persona.
      </p>
    </ArticleLayout>
  );
}
