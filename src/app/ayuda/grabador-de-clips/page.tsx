import { ArticleLayout } from "@/components/help/ArticleLayout";
import { ScreenshotPlaceholder } from "@/components/help/ScreenshotPlaceholder";

export const metadata = {
  title: "Grabador de clips y grabación completa — Ayuda",
  description:
    "Cómo grabar en un buffer circular mientras transmitís, guardar clips con un clic, y grabar la transmisión completa a un archivo.",
};

export default function Page() {
  return (
    <ArticleLayout title="Grabador de clips y grabación completa">
      <h2>Buffer de clips</h2>
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
      <h2>Grabación completa</h2>
      <p>
        Además del buffer, Muxlyve puede grabar la transmisión completa a un
        solo archivo, desde que arranca hasta que termina. Es independiente
        del buffer de clips — cada uno se activa por separado, con su propio
        switch, en el panel principal.
      </p>
      <p>
        La carpeta de destino se elige en Preferencias → Grabador de clips →
        &quot;Carpeta de grabaciones completas&quot;.
      </p>
    </ArticleLayout>
  );
}
