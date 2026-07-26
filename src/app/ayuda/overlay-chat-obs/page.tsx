import Link from "next/link";
import { ArticleLayout } from "@/components/help/ArticleLayout";
import { ScreenshotPlaceholder } from "@/components/help/ScreenshotPlaceholder";

export const metadata = {
  title: "Mostrar el chat en tu transmisión — Ayuda",
  description:
    "Cómo agregar el overlay de chat de Muxlyve como fuente de Navegador en OBS.",
};

export default function Page() {
  return (
    <ArticleLayout
      slug="overlay-chat-obs"
      title="Mostrar el chat en tu transmisión (overlay para OBS)"
    >
      <ol>
        <li>Abre Conexión RTMP → Conexión del chat → URL del chat.</li>
        <ScreenshotPlaceholder
          src="/help/overlay-chat-obs-3.png"
          label="URL del chat"
        />
        <li>
          Copia la URL de <code>/chat-overlay</code>.
        </li>
        <li>
          Si tu muxlyve esta en otra maquina copia la URL de la otra maquina{" "}
          <code>/chat-overlay</code>.
        </li>
        <ScreenshotPlaceholder
          src="/help/overlay-chat-obs-4.png"
          label="Si tu muxlyve esta en otra maquina copia la URL de la otra maquina"
        />
        <li>
          En OBS: Fuente → Navegador → pega la URL. Fondo transparente, sin
          controles.
          <ScreenshotPlaceholder
            src="/help/overlay-chat-obs-1.png"
            label="fuente de navegador de OBS apuntando al overlay"
          />
        </li>
      </ol>
      <ScreenshotPlaceholder
        src="/help/overlay-chat-obs-2.png"
        label="overlay de chat compuesto sobre la escena"
      />
      <p>
        ¿Vas a controlar el overlay desde otra máquina de tu red?{" "}
        <Link href="/ayuda/control-lan">
          Usar Muxlyve desde otra máquina de tu red
        </Link>
        .
      </p>
    </ArticleLayout>
  );
}
