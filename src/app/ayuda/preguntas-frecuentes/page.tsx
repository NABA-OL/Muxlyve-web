import { ArticleLayout } from "@/components/help/ArticleLayout";

export const metadata = {
  title: "Preguntas frecuentes — Ayuda",
  description:
    "Internet, reconexión de TikTok, compatibilidad con otros encoders, calidad de la señal, límite de bitrate, notificaciones, Linux y cómo reportar un bug.",
};

export default function Page() {
  return (
    <ArticleLayout slug="preguntas-frecuentes" title="Preguntas frecuentes">
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

      <h2>¿Puedo ponerle un límite de bitrate a un destino?</h2>
      <p>
        Sí, es opcional. En la tarjeta de cada destino puedes desplegar
        &quot;Bitrate máximo (kbps) — opcional&quot; y poner un tope. Mientras
        tu bitrate real se mantenga por debajo, Muxlyve sigue reenviando sin
        recodificar. Solo si se sostiene por encima del límite, recodifica
        ese destino puntual para bajarlo al tope. Sin límite configurado,
        nunca recodifica.
      </p>

      <h2>¿Me avisa si se cae un destino mientras hago otra cosa?</h2>
      <p>
        Sí. Si tienes otra ventana o juego en primer plano y un destino se
        cae, Muxlyve manda una notificación nativa del sistema operativo (no
        una alerta dentro de la app). En algunas distros de Linux sin daemon
        de notificaciones esto puede no estar disponible — falla en
        silencio, no rompe la app.
      </p>

      <h2>¿Muxlyve corre en Linux?</h2>
      <p>
        Hoy la app está disponible para Windows y macOS. Linux está en el
        roadmap, pero todavía no confirmado.
      </p>

      <h2>¿Dónde reporto un bug?</h2>
      <p>
        Botón &quot;Reportar un problema&quot; dentro de la app — adjunta los
        logs automáticamente. Si prefieres no hacerlo desde ahí, escríbenos
        directo a{" "}
        <a href="mailto:soporte@muxlyve.app">soporte@muxlyve.app</a>.
      </p>
    </ArticleLayout>
  );
}
