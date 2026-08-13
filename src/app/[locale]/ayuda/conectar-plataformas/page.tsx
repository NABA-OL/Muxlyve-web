import Link from "next/link";
import { ArticleLayout } from "@/components/help/ArticleLayout";
import { ScreenshotPlaceholder } from "@/components/help/ScreenshotPlaceholder";

export const metadata = {
  title: "Conectar tus plataformas — Ayuda",
  description:
    "Cómo vincular Twitch, Kick, YouTube y TikTok en Muxlyve, prender o apagar cada destino en caliente, y agregar destinos personalizados por RTMP, RTMPS o SRT.",
};

export default function Page() {
  return (
    <ArticleLayout
      slug="conectar-plataformas"
      title="Conectar tus plataformas (Twitch, Kick, YouTube, TikTok)"
    >
      <p>
        Twitch, Kick y YouTube: inicia sesión con un clic (OAuth), sin pegar
        claves a mano.
      </p>
      <ScreenshotPlaceholder
        src="/help/conectar-plataformas-1.png"
        label="tarjeta de Twitch con botón Conectar"
      />
      <p>
        TikTok no tiene login público — copia el servidor y la clave desde la
        app de TikTok. Esa clave se regenera cada ~2 horas; es una limitación
        de la plataforma, no de Muxlyve.
      </p>
      <p>
        Prende o apaga cada destino con un toggle, en caliente, sin cortar la
        transmisión.
      </p>
      <ScreenshotPlaceholder
        src="/help/conectar-plataformas-2.png"
        label="toggle verde/rojo de una plataforma activa"
      />

      <h2>Destinos personalizados</h2>
      <p>
        Además de Twitch, Kick, YouTube y TikTok con integración directa,
        puedes agregar cualquier destino personalizado usando{" "}
        <code>rtmp://</code>, <code>rtmps://</code> (RTMP cifrado) o{" "}
        <code>srt://</code>. Útil para servidores privados, CDNs propias o
        cualquier plataforma que no esté en la lista.
      </p>
      <p>
        <strong>Importante:</strong> esto es el destino de salida, a donde
        Muxlyve reenvía tu señal. La entrada no cambia — tu software de
        streaming (OBS, Streamlabs, XSplit, etc.) se sigue conectando a
        Muxlyve por RTMP simple en <code>localhost</code>, como se explica en{" "}
        <Link href="/ayuda/conectar-tu-software">
          Conectar OBS (o cualquier software de streaming)
        </Link>
        .
      </p>
    </ArticleLayout>
  );
}
