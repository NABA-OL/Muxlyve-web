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
    <ArticleLayout title="Mostrar el chat en tu transmisión (overlay para OBS)">
      <ol>
        <li>Abrí Preferencias → Información de conexión → Conexión del chat.</li>
        <li>
          Copiá la URL de <code>/chat-overlay</code>.
        </li>
        <li>
          En OBS: Fuente → Navegador → pegá la URL. Fondo transparente, sin
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
        ¿Vas a controlar el overlay desde otra máquina de tu red? Mirá{" "}
        <Link href="/ayuda/acceso-remoto-lan">
          Usar Muxlyve desde otra máquina de tu red
        </Link>
        .
      </p>
    </ArticleLayout>
  );
}
