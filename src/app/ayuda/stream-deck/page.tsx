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
    <ArticleLayout title="Plugin de Stream Deck">
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
        src="/help/stream-deck.png"
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
