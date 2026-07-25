import Link from "next/link";
import { ArticleLayout } from "@/components/help/ArticleLayout";
import { ScreenshotPlaceholder } from "@/components/help/ScreenshotPlaceholder";

export const metadata = {
  title: "Usar Muxlyve desde otra máquina de tu red — Ayuda",
  description:
    "Cómo controlar destinos, chat y Stream Deck desde otra máquina de tu red, con acceso remoto seguro.",
};

export default function Page() {
  return (
    <ArticleLayout
      slug="acceso-remoto-lan"
      title="Usar Muxlyve desde otra máquina en tu red (emisora secundaria)"
    >
      <p>
        Caso de uso: transmitís desde una PC potente, pero controlás todo
        (destinos, chat, Stream Deck) desde una laptop o Mac Mini en la misma
        red.
      </p>
      <p>
        Activalo en Preferencias con &quot;Permitir Stream Deck / chat desde
        otra máquina&quot;. La conexión usa un token de acceso — solo un
        dispositivo con ese token puede controlar tu instancia.
      </p>
      <ScreenshotPlaceholder
        src="/help/acceso-remoto-lan.png"
        label='toggle "Permitir Stream Deck / chat desde otra máquina" en Preferencias'
      />
      <p>
        Relacionado:{" "}
        <Link href="/ayuda/overlay-chat-obs">
          Mostrar el chat en tu transmisión
        </Link>{" "}
        y{" "}
        <Link href="/ayuda/stream-deck">Plugin de Stream Deck</Link>.
      </p>
    </ArticleLayout>
  );
}
