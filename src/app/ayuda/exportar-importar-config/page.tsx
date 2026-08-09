import { ArticleLayout } from "@/components/help/ArticleLayout";
import { ScreenshotPlaceholder } from "@/components/help/ScreenshotPlaceholder";

export const metadata = {
  title: "Exportar e importar tu configuración — Ayuda",
  description:
    "Cómo hacer backup de tu configuración en un archivo .mux cifrado y protegido con contraseña, y restaurarla en otra máquina.",
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
        mano. Desde Preferencias → Sistema, Muxlyve empaqueta destinos,
        webhooks y el resto de tus ajustes en un solo archivo{" "}
        <code>.mux</code> cifrado y protegido con contraseña.
      </p>
      <ScreenshotPlaceholder
        src="/help/exportar-importar-config-1.png"
        label="modal de Preferencias, tab Sistema, con los botones Exportar/Importar"
      />
      <ScreenshotPlaceholder
        src="/help/exportar-importar-config-2.png"
        label="modal de contraseña para cifrar el archivo a Exportar"
      />
      <ScreenshotPlaceholder
        src="/help/exportar-importar-config-3.png"
        label="ventana para decidir donde guardar el archivo"
      />
      <h2>Exportar</h2>
      <p>
        Presiona &quot;Exportar&quot;, elige una contraseña para proteger el
        archivo y guárdalo donde quieras. Queda todo adentro: destinos,
        webhooks, perfiles y el resto de tus ajustes, cifrado con esa
        contraseña.
      </p>
      <h2>Importar</h2>
      <p>
        Presiona &quot;Importar&quot;, selecciona el archivo <code>.mux</code>{" "}
        e ingresa la contraseña con la que se exportó. Si el archivo viene de
        una cuenta distinta a la que está activa en ese momento, Muxlyve avisa
        antes de aplicar nada — nunca reemplaza en silencio la configuración
        de otra persona.
      </p>
    </ArticleLayout>
  );
}
