import { ArticleLayout } from "@/components/help/ArticleLayout";
import { ScreenshotPlaceholder } from "@/components/help/ScreenshotPlaceholder";

export const metadata = {
  title: "Avisar en Discord y Telegram cuando arrancás en vivo — Ayuda",
  description:
    "Cómo configurar webhooks de Discord y bots de Telegram para que Muxlyve avise automáticamente apenas empieza tu transmisión.",
};

export default function Page() {
  return (
    <ArticleLayout
      slug="avisos-discord-telegram"
      title="Avisar en Discord y Telegram cuando arrancás en vivo"
    >
      <p>
        Muxlyve manda un mensaje automático apenas empieza la transmisión, a
        hasta 3 webhooks de Discord y 3 bots de Telegram a la vez — mismo
        mensaje para todos.
      </p>
      <ScreenshotPlaceholder
        src="/help/avisos-discord-telegram-1.png"
        label="Preferencias → Webhooks con una fila de Discord y una de Telegram"
      />

      <h2>Discord</h2>
      <ol>
        <li>En Discord: Ajustes del canal → Integraciones → Webhooks.</li>
        <li>Copiá la URL del webhook.</li>
        <li>Pegala en Muxlyve, en Preferencias → Webhooks.</li>
        <li>
          Tocá &quot;Probar&quot; para confirmar que funciona antes de salir
          en vivo.
        </li>
      </ol>

      <h2>Crear el bot con BotFather</h2>
      <ol>
        <li>
          Buscar <code>@BotFather</code> en Telegram (es el bot oficial para
          crear bots) y abrirle un chat.
        </li>
        <li>
          Escribir <code>/newbot</code>.
        </li>
        <li>
          Elegir un nombre para mostrar, y después un username que termine
          en &quot;bot&quot; (ej. <code>mi_canal_avisos_bot</code>) —
          BotFather avisa si ya está tomado.
        </li>
        <li>
          BotFather responde con el token — una línea larga tipo{" "}
          <code>123456789:AAHqhK9DsSNGCQnQanCwHzXTVo1TVe0MYCA</code>. Ese es
          el que va en Muxlyve. Si se pierde: en BotFather,{" "}
          <code>/mybots</code> → elegir el bot → &quot;API Token&quot; →
          &quot;Revoke current token&quot; genera uno nuevo.
        </li>
      </ol>
      <ScreenshotPlaceholder
        src="/help/avisos-discord-telegram-botfather.png"
        label="BotFather entregando el token después de /newbot"
      />

      <h2>Sacar el chat ID — el método cambia según sea grupo o canal</h2>
      <p>
        <strong>Si es un grupo (o supergrupo):</strong>
      </p>
      <ol>
        <li>
          Agregar <code>@RawDataBot</code> (o <code>@getidsbot</code>) al
          grupo como a cualquier miembro.
        </li>
        <li>
          Apenas entra, tira un mensaje con toda la data del chat — buscar
          &quot;id&quot; ahí (empieza con signo menos, ej.{" "}
          <code>-1001234567890</code>).
        </li>
        <li>
          Copiar ese número, sacar al bot del grupo si no lo querés ahí más.
        </li>
      </ol>
      <ScreenshotPlaceholder
        src="/help/avisos-discord-telegram-grupo-id.png"
        label="mensaje de RawDataBot mostrando el id del grupo"
      />

      <p>
        <strong>Si es un canal:</strong> los canales funcionan distinto — un
        bot agregado como simple miembro no ve ni puede postear nada ahí,
        así que el método del grupo no funciona en un canal. Dos formas de
        conseguir el ID igual:
      </p>
      <ol>
        <li>
          Reenviar un mensaje (la más simple, no hace falta agregar ningún
          bot al canal): reenviar cualquier mensaje DEL canal, por privado,
          a <code>@JsonDumpBot</code> o <code>@RawDataBot</code>. Responde
          con el JSON completo — buscar{" "}
          <code>&quot;forward_from_chat&quot;:{"{"}&quot;id&quot;:-100...{"}"}</code>. Ese es el ID.
        </li>
      </ol>
      <ScreenshotPlaceholder
        src="/help/avisos-discord-telegram-canal-forward.png"
        label="reenviando un mensaje del canal a JsonDumpBot y el id en la respuesta"
      />
      <ol start={2}>
        <li>
          Con el propio bot: en el canal → Administradores → agregar el bot
          como administrador (no como miembro — como miembro no alcanza).
          Publicar algo, después abrir{" "}
          <code>https://api.telegram.org/bot&lt;TOKEN&gt;/getUpdates</code>{" "}
          (reemplazando <code>&lt;TOKEN&gt;</code> por el token real) y
          buscar{" "}
          <code>&quot;channel_post&quot;:{"{"}&quot;chat&quot;:{"{"}&quot;id&quot;:-100...{"}"}{"}"}</code>.
        </li>
      </ol>
      <p>
        El link de invitación (<code>t.me/+AbCdEfGh...</code>) NO sirve
        como chat ID — es solo un enlace para unirse, no identifica al canal
        ante la API.
      </p>
      <p>
        Atajo si el grupo/canal es público (tiene @usuario): usar{" "}
        <code>@usuario_del_canal</code> directo en el campo Chat ID de
        Muxlyve, sin buscar ningún número.
      </p>
      <p>
        Los IDs de grupos, supergrupos y canales siempre empiezan en{" "}
        <code>-100</code> cuando son numéricos — si el número no arranca
        así, seguramente es el ID de una persona, no el del grupo/canal.
      </p>

      <h2>Guardar en Muxlyve</h2>
      <ol>
        <li>Pegá el token y el chat ID en Muxlyve.</li>
        <li>
          Tocá &quot;Guardar&quot; — a diferencia de Discord, en Telegram
          hace falta guardar explícito porque el bot necesita el token y el
          chat ID juntos.
        </li>
      </ol>

      <h2>Editar el mensaje</h2>
      <p>
        Hay un botón dedicado en la pantalla principal (ícono junto a
        &quot;Programar inicio&quot;) para editar el mensaje de aviso. Es el
        mismo texto para ambas plataformas: Discord entiende{" "}
        <strong>negrita</strong>, <em>itálica</em> y enlaces; Telegram lo
        muestra como texto plano.
      </p>
      <p>
        Desde ese mismo modal, &quot;Probar&quot; manda el mensaje guardado
        a todos los canales configurados de una.
      </p>
      <ScreenshotPlaceholder
        src="/help/avisos-discord-telegram-2.png"
        label='modal "Mensaje de aviso"'
      />
      <ScreenshotPlaceholder
        src="/help/avisos-discord-telegram-3.png"
        label='modal "Mensaje de aviso"'
      />
    </ArticleLayout>
  );
}
