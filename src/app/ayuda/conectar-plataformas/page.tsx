import { ArticleLayout } from "@/components/help/ArticleLayout";
import { ScreenshotPlaceholder } from "@/components/help/ScreenshotPlaceholder";

export const metadata = {
  title: "Conectar tus plataformas — Ayuda",
  description:
    "Cómo vincular Twitch, Kick, YouTube y TikTok en Muxlyve, y prender o apagar cada destino en caliente.",
};

export default function Page() {
  return (
    <ArticleLayout
      slug="conectar-plataformas"
      title="Conectar tus plataformas (Twitch, Kick, YouTube, TikTok)"
    >
      <p>
        Twitch, Kick y YouTube: iniciá sesión con un clic (OAuth), sin pegar
        claves a mano.
      </p>
      <ScreenshotPlaceholder
        src="/help/conectar-plataformas-1.png"
        label="tarjeta de Twitch con botón Conectar"
      />
      <p>
        TikTok no tiene login público — copiá el servidor y la clave desde la
        app de TikTok. Esa clave se regenera cada ~2 horas; es una limitación
        de la plataforma, no de Muxlyve.
      </p>
      <p>
        Prendé o apagá cada destino con un toggle, en caliente, sin cortar la
        transmisión.
      </p>
      <ScreenshotPlaceholder
        src="/help/conectar-plataformas-2.png"
        label="toggle verde/rojo de una plataforma activa"
      />
    </ArticleLayout>
  );
}
