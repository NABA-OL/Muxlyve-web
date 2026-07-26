import { ArticleLayout } from "@/components/help/ArticleLayout";
import { ScreenshotPlaceholder } from "@/components/help/ScreenshotPlaceholder";

export const metadata = {
  title: 'Perfiles: cambiar de "solo Twitch" a "todo" con un clic — Ayuda',
  description:
    "Cómo guardar combinaciones de destinos prendidos y aplicarlas con un clic, sin tocar cada toggle a mano.",
};

export default function Page() {
  return (
    <ArticleLayout
      slug="perfiles-de-destinos"
      title='Perfiles: cambiar de "solo Twitch" a "todo" con un clic'
    >
      <p>
        Un perfil guarda una combinación de destinos prendidos con un
        nombre. Un clic aplica ese perfil: prende esos destinos, apaga el
        resto — no &quot;suma&quot;, reemplaza.
      </p>
      <h2>Crear un perfil</h2>
      <ol>
        <li>Prendé y apagá los destinos como querés dejarlos.</li>
        <li>Tocá &quot;Guardar actual&quot;.</li>
        <li>Ponele un nombre (por ejemplo &quot;Solo Twitch&quot; o &quot;Todo&quot;).</li>
      </ol>
      <ScreenshotPlaceholder
        src="/help/perfiles-de-destinos-1.png"
        label="Fila de chips de perfiles con 'Guardar actual'"
      />
      <ScreenshotPlaceholder
        src="/help/perfiles-de-destinos-2.png"
        label="Modal para crear perfil"
      />
      <ScreenshotPlaceholder
        src="/help/perfiles-de-destinos-3.png"
        label="Fila de perfiles creados"
      />
      <h2>Borrar un perfil</h2>
      <p>
        Tocá la ✕ del chip del perfil. Límite: 6 perfiles guardados.
      </p>
      <p>
        Si borrás un destino que un perfil usaba, el perfil sigue
        funcionando con el resto de los destinos que tenía guardados.
      </p>
      <h2>Desde el Stream Deck</h2>
      <p>
        También se puede asignar un perfil a un botón físico del Stream
        Deck.
      </p>
    </ArticleLayout>
  );
}
