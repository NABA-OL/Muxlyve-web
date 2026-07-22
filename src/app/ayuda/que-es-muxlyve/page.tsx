import { ArticleLayout } from "@/components/help/ArticleLayout";
import { ScreenshotPlaceholder } from "@/components/help/ScreenshotPlaceholder";

export const metadata = {
  title: "¿Qué es Muxlyve? — Ayuda",
  description:
    "Muxlyve transmite tu señal a Twitch, Kick, YouTube y TikTok Live al mismo tiempo, sin marca de agua, corriendo en tu propia computadora.",
};

export default function Page() {
  return (
    <ArticleLayout title="¿Qué es Muxlyve?">
      <p>
        Muxlyve transmite tu señal a Twitch, Kick, YouTube y TikTok Live al
        mismo tiempo, sin marca de agua.
      </p>
      <h2>¿En qué se diferencia de un servicio en la nube?</h2>
      <p>
        Servicios como Restream o Castr corren en un servidor de terceros: vos
        les mandás tu señal a ellos, y ellos la reenvían. Muxlyve corre en tu
        propia computadora — vos generás la señal en tu software de streaming
        (OBS, Streamlabs, XSplit, vMix, o cualquier otro que hable RTMP),
        Muxlyve la recibe localmente y la reenvía a cada plataforma
        directamente. No pasa por un servidor de terceros.
      </p>
      <ScreenshotPlaceholder
        src="/help/que-es-muxlyve.png"
        label="panel principal con el preview en vivo"
      />
    </ArticleLayout>
  );
}
