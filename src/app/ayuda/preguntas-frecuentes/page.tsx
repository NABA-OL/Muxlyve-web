import { ArticleLayout } from "@/components/help/ArticleLayout";

export const metadata = {
  title: "Preguntas frecuentes — Ayuda",
  description:
    "Internet, reconexión de TikTok, compatibilidad con otros encoders, calidad de la señal y cómo reportar un bug.",
};

export default function Page() {
  return (
    <ArticleLayout title="Preguntas frecuentes">
      <h2>¿Necesito internet solo para transmitir, o también para usar la app?</h2>
      <p>
        Activar la licencia sí necesita internet una vez. Transmitir no
        depende de la nube de Muxlyve — la señal se reenvía directo desde tu
        equipo a cada plataforma.
      </p>

      <h2>¿Por qué TikTok pide reconectar la clave tan seguido?</h2>
      <p>
        Es una limitación de la plataforma de TikTok, no de Muxlyve: la clave
        de transmisión que entrega TikTok se regenera cada ~2 horas.
      </p>

      <h2>¿Funciona con vMix, N.Air o cualquier otro encoder?</h2>
      <p>
        Sí. Muxlyve no es un plugin de OBS — recibe cualquier señal RTMP,
        venga de donde venga.
      </p>

      <h2>¿Baja la calidad de mi transmisión por reenviar a 4 plataformas?</h2>
      <p>
        No. Muxlyve usa <code>-c copy</code>: reenvía la señal sin
        recodificar, con carga mínima de CPU.
      </p>

      <h2>¿Dónde reporto un bug?</h2>
      <p>
        Botón &quot;Reportar un problema&quot; dentro de la app — adjunta los
        logs automáticamente. Si preferís no hacerlo desde ahí, escribinos
        directo a{" "}
        <a href="mailto:soporte@muxlyve.app">soporte@muxlyve.app</a>.
      </p>
    </ArticleLayout>
  );
}
