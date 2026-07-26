import Link from "next/link";
import { ArticleLayout } from "@/components/help/ArticleLayout";
import { ScreenshotPlaceholder } from "@/components/help/ScreenshotPlaceholder";

export const metadata = {
  title: "Controlar Muxlyve desde otra máquina de tu red — Ayuda",
  description:
    "Cómo controlar destinos, chat y Stream Deck desde otra máquina de tu red, con acceso remoto seguro.",
};

export default function Page() {
  return (
    <ArticleLayout
      slug="acceso-remoto-lan"
      title="Controlar Muxlyve desde otra máquina en tu red"
    >
      <p>
        Caso de uso: Usas tu computadora secundaria para transmitir con muxlyve
        recibiendo la señal desde tu PC principal con OBS, puedes controlar
        Muxlyve desde tu PC principal sin problema.
      </p>
      <p>
        Activa en Preferencias con &quot;Permitir Stream Deck / chat desde otra
        máquina&quot;. La conexión usa un token de acceso — solo un dispositivo
        con ese token puede controlar tu instancia.
      </p>
      <ScreenshotPlaceholder
        src="/help/acceso-remoto-lan-1.png"
        label='toggle "Permitir Stream Deck / chat desde otra máquina" en Preferencias'
      />
      <ScreenshotPlaceholder
        src="/help/acceso-remoto-lan-2.png"
        label="token generado para conectar a esta instancia de Muxlyve desde stream deck"
      />
      <p>
        Relacionado:{" "}
        <Link href="/ayuda/overlay-chat-obs">
          Mostrar el chat en tu transmisión
        </Link>{" "}
        y <Link href="/ayuda/stream-deck">Plugin de Stream Deck</Link>.
      </p>
    </ArticleLayout>
  );
}
