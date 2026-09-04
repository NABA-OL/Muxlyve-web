/*
 * Propiedad de BlacKraken Solutions <blackraken.com>
 * Desarrollado por: NABAOL
 * Fecha de creación: 2026-08-27
 */

// Estos builders se llaman desde middleware.ts (runtime de Edge), que corre
// antes del pipeline de renderizado de Next — ahí next-intl/server no tiene
// contexto de request para resolver getTranslations(). Por eso el contenido
// (locale por defecto, "es", que es el que evaluó el audit) va inline acá en
// vez de leerse de messages/es.json. Si cambia el copy de la home o de
// /privacidad, hay que actualizar también esta copia.

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://muxlyve.com";

interface Step {
  title: string;
  body: string;
}

interface Feature {
  title: string;
  body: string;
}

interface FeatureGroup {
  title: string;
  features: Feature[];
}

const HOME_STEPS: Step[] = [
  {
    title: "Conecta tu software",
    body: "Apunta OBS, Streamlabs, XSplit, vMix, N.Air o cualquier encoder RTMP/S a Muxlyve como servidor de salida.",
  },
  {
    title: "Conecta tus plataformas",
    body: "Vincula Twitch, Kick y YouTube con un clic (OAuth), o pega tu clave de TikTok.",
  },
  {
    title: "Transmite a las 4 a la vez",
    body: "Una sola señal, sin recodificar, sin marca de agua y sin depender de un servidor ajeno.",
  },
];

const HOME_FEATURE_GROUPS: FeatureGroup[] = [
  {
    title: "Streaming",
    features: [
      { title: "Sin marca de agua", body: "Tu transmisión sale limpia a cada plataforma." },
      { title: "Corre en tu máquina", body: "El video se reparte desde tu PC, no por un servidor intermediario." },
      { title: "Reconexión automática", body: "Si una plataforma se cae, Muxlyve la reconecta sola." },
      { title: "Preview en vivo", body: "Mira exactamente lo que está saliendo a cada destino." },
      { title: "Programar inicio", body: "Elige destinos y hora, y Muxlyve arranca solo." },
      { title: "Resumen del stream", body: "Duración, pico de espectadores y bitrate promedio por destino." },
      { title: "Perfiles de destinos", body: "Guarda combinaciones de destinos con un clic. Hasta 6 perfiles." },
      { title: "Historial de sesiones", body: "Registro local de cada transmisión: fecha, duración, plataformas." },
    ],
  },
  {
    title: "Chat y clips",
    features: [
      { title: "Chat unificado", body: "Los mensajes de Twitch y Kick en un solo lugar, con moderación." },
      { title: "Overlay de chat para OBS", body: "Fuente de Navegador en OBS, fondo transparente." },
      { title: "Grabador de clips", body: "Buffer circular y grabación completa, cada una con su switch." },
      { title: "Comando !clip en el chat", body: "Guarda un clip del buffer al instante desde el chat." },
    ],
  },
  {
    title: "Control remoto",
    features: [
      { title: "Compatible con Stream Deck", body: "Prende destinos y guarda clips desde botones físicos." },
      { title: "Acceso remoto por LAN", body: "Controla Muxlyve desde otra máquina de tu red." },
      { title: "Avisos a Discord y Telegram", body: "Mensaje configurable al iniciar y al finalizar la transmisión." },
    ],
  },
];

export function buildHomeMarkdown(): string {
  const stepsMd = HOME_STEPS.map((s, i) => `${i + 1}. **${s.title}** — ${s.body}`).join("\n");
  const featuresMd = HOME_FEATURE_GROUPS.map(
    (g) => `### ${g.title}\n\n${g.features.map((f) => `- **${f.title}**: ${f.body}`).join("\n")}`,
  ).join("\n\n");

  return `# Transmite a Twitch, Kick, YouTube y TikTok a la vez.

> Software de multistreaming para Windows. Transmite a Twitch, Kick, YouTube y TikTok al mismo tiempo, sin marca de agua.

Sin marca de agua. Desde tu PC. Sin servidores intermediarios ni ancho de banda de terceros.

## Cómo funciona

${stepsMd}

## Características

${featuresMd}

## Precio

Mensual, anual o de por vida — ver [precios y planes](${BASE}/#precio).

## Enlaces

- [Descargar](${BASE}/descargar)
- [Demo interactivo](${BASE}/demo)
- [Centro de ayuda](${BASE}/ayuda)
- [Acerca de](${BASE}/about)
- [Contacto](${BASE}/contact)
- [Privacidad](${BASE}/privacy)
`;
}

export function buildAboutMarkdown(): string {
  return `# Acerca de Muxlyve

> Software de multistreaming de escritorio para Windows y macOS, creado por BlacKraken Solutions.

## Qué es Muxlyve

Muxlyve es una aplicación de escritorio que recibe la señal de tu software de encoding (OBS, Streamlabs, XSplit, vMix o cualquier otro que hable RTMP) y la reenvía en simultáneo a Twitch, Kick, YouTube y TikTok, sin marca de agua y sin pasar por servidores en la nube de terceros. Todo el reenvío ocurre desde tu propio equipo.

## Quién lo desarrolla

Muxlyve es un producto de BlacKraken Solutions, un estudio de desarrollo de software y automatización. BlacKraken diseñó Muxlyve como alternativa de escritorio a servicios de multistream basados en la nube (como Restream o Castr), que suelen cobrar por ancho de banda o limitar la calidad en sus planes gratuitos.

## Por qué existe

Transmitir a varias plataformas a la vez normalmente implica depender de un servicio externo, pagar mensualidad por ancho de banda o aceptar una marca de agua sobre el video. Muxlyve resuelve esto reenviando la señal directo desde el computador del usuario a cada plataforma, sin intermediarios.

## Contacto

Para soporte, prensa o alianzas, escribe a [soporte@muxlyve.com](mailto:soporte@muxlyve.com) o visita la [página de contacto](${BASE}/contact).
`;
}

export function buildContactMarkdown(): string {
  return `# Contacto

## Soporte técnico

Para dudas de uso, activación de licencia o problemas técnicos, escribe a [soporte@muxlyve.com](mailto:soporte@muxlyve.com). También puedes revisar el [centro de ayuda](${BASE}/ayuda) antes de escribir, la mayoría de dudas frecuentes ya están documentadas ahí.

## Reportar un error

Desde la propia aplicación, el botón "Reportar un problema" adjunta automáticamente los logs relevantes. Si prefieres no usar ese flujo, escribe directo a [soporte@muxlyve.com](mailto:soporte@muxlyve.com) describiendo qué pasó.

## Comunidad

Únete al [Discord de Muxlyve](https://discord.gg/ttRqRkAG) para hablar con otros streamers que usan la app y con el equipo de desarrollo.

## Gestión de licencia

Para activar, transferir o revisar el estado de tu licencia, usa [gestionar licencia](${BASE}/gestionar-licencia).

## Prensa y alianzas

Para consultas comerciales o de prensa, usa el mismo correo: [soporte@muxlyve.com](mailto:soporte@muxlyve.com).
`;
}

export function buildPrivacyMarkdown(): string {
  const list = (items: string[]) => items.map((i) => `- ${i}`).join("\n");

  const s1items = [
    "Dirección de correo electrónico (proporcionada al autenticarse con Google o al adquirir una licencia).",
    "Identificador de dispositivo, usado exclusivamente para gestionar activaciones de licencia.",
    "Información de pago procesada por Freemius; Muxlyve no almacena datos de tarjetas.",
  ];
  const s2items = [
    "Activar y validar tu licencia de Muxlyve.",
    "Enviarte el correo de confirmación de compra.",
    "Gestionar soporte técnico cuando lo solicites.",
  ];
  const s4items = [
    "Leer el nombre y la foto de tu canal de YouTube, para mostrar con qué cuenta está conectada la app.",
    "Obtener la URL y la clave RTMP de tu transmisión en vivo activa, para no tener que copiarla manualmente desde YouTube Studio.",
    "Mostrar el chat en vivo de tu transmisión de YouTube dentro de la app (solo lectura).",
    "Mostrar el número de espectadores en vivo de tu transmisión.",
  ];

  return `# Política de Privacidad

**Última actualización:** 14 de agosto de 2026

## 1. Información que recopilamos

Muxlyve recopila únicamente la información necesaria para proveer el servicio:

${list(s1items)}

## 2. Uso de la información

Usamos tu información para:

${list(s2items)}

## 3. Compartir información

No vendemos ni compartimos tu información personal con terceros, excepto con los proveedores necesarios para operar el servicio (Freemius para pagos, Neon para base de datos, Vercel para infraestructura).

## 4. Datos de Google/YouTube (OAuth)

Si inicias sesión con Google, recibimos tu correo y nombre de perfil para identificarte en la app. Si además conectas tu cuenta de YouTube, usamos el permiso de solo lectura youtube.readonly únicamente para:

${list(s4items)}

Todo el acceso es de solo lectura: Muxlyve nunca publica, modifica ni elimina nada en tu cuenta de YouTube. Estos datos se usan únicamente para autocompletar la configuración y mostrar información dentro de la propia app — no se almacenan en nuestros servidores ni se comparten con terceros. No usamos estos datos con fines publicitarios, no los vendemos ni los usamos para entrenar modelos de inteligencia artificial o machine learning.

## 5. Retención de datos

Conservamos tus datos mientras tu licencia esté activa. Puedes solicitar la eliminación de tu información escribiéndonos a soporte@muxlyve.com.

## 6. Seguridad

Las claves de licencia se almacenan cifradas (HMAC-SHA256). Usamos HTTPS en todas las comunicaciones.

## 7. Contacto

Para cualquier consulta sobre privacidad: soporte@muxlyve.com
`;
}
