import { ArticleLayout } from "@/components/help/ArticleLayout";
import { ScreenshotPlaceholder } from "@/components/help/ScreenshotPlaceholder";

export const metadata = {
  title: "Plugin de Stream Deck — Ayuda",
  description:
    "Prender destinos, activar el buffer y guardar clips desde botones físicos con el plugin oficial de Stream Deck.",
};

// TODO: reemplazar con la URL real cuando el plugin de Stream Deck esté publicado.
const STREAM_DECK_PLUGIN_URL = "#";

export default function Page() {
  return (
    <ArticleLayout slug="stream-deck" title="Plugin de Stream Deck">
      <p>
        Prendé y apagá destinos, activá el buffer y guardá clips con botones
        físicos, sin tocar el teclado.
      </p>
      <p>
        Si tu Stream Deck corre en otra computadora que la que transmite,
        activá &quot;Permitir Stream Deck / chat desde otra máquina&quot; en
        Preferencias.
      </p>
      <ScreenshotPlaceholder
        src="/help/stream-deck-1.png"
        label="botones del Stream Deck con los íconos de cada plataforma"
      />
      <ScreenshotPlaceholder
        src="/help/stream-deck-2.png"
        label="botones del Stream Deck con los íconos de cada plataforma"
      />
      <ScreenshotPlaceholder
        src="/help/stream-deck-3.png"
        label="botones del Stream Deck con los íconos de cada plataforma"
      />
      <ScreenshotPlaceholder
        src="/help/stream-deck-4.png"
        label="botones del Stream Deck con los íconos de cada plataforma"
      />
      <ScreenshotPlaceholder
        src="/help/stream-deck-5.png"
        label="botones del Stream Deck con los íconos de cada plataforma"
      />
      <ScreenshotPlaceholder
        src="/help/stream-deck-6.png"
        label="botones del Stream Deck con los íconos de cada plataforma"
      />
      <ScreenshotPlaceholder
        src="/help/stream-deck-7.png"
        label="botones del Stream Deck con los íconos de cada plataforma"
      />
      <ScreenshotPlaceholder
        src="/help/stream-deck-8.png"
        label="botones del Stream Deck con los íconos de cada plataforma"
      />
      <ScreenshotPlaceholder
        src="/help/stream-deck-9.png"
        label="botones del Stream Deck con los íconos de cada plataforma"
      />
      <ScreenshotPlaceholder
        src="/help/stream-deck-10.png"
        label="botones del Stream Deck con los íconos de cada plataforma"
      />
      <p>
        <a href={STREAM_DECK_PLUGIN_URL} target="_blank" rel="noopener noreferrer">
          Ir al plugin →
        </a>
      </p>
    </ArticleLayout>
  );
}
