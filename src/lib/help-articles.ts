export interface HelpArticle {
  slug: string;
  title: string;
  summary: string;
}

export const HELP_ARTICLES: HelpArticle[] = [
  {
    slug: "que-es-muxlyve",
    title: "¿Qué es Muxlyve?",
    summary: "Qué hace Muxlyve y en qué se diferencia de un servicio de restream en la nube.",
  },
  {
    slug: "instalacion-primer-arranque",
    title: "Instalación y primer arranque",
    summary: "Descargar, instalar y activar tu licencia por primera vez.",
  },
  {
    slug: "conectar-tu-software",
    title: "Conectar tu software de streaming (OBS, Streamlabs, Xsplit, etc.)",
    summary: "Server RTMP y stream key para apuntar tu encoder a Muxlyve.",
  },
  {
    slug: "conectar-plataformas",
    title: "Conectar tus plataformas",
    summary: "Vincular Twitch, Kick, YouTube y TikTok, y prender/apagar destinos en caliente.",
  },
  {
    slug: "chat-unificado",
    title: "Chat unificado",
    summary: "Ver y responder los mensajes de Twitch y Kick desde un solo lugar.",
  },
  {
    slug: "overlay-chat-obs",
    title: "Mostrar el chat en tu transmisión",
    summary: "Agregar el overlay de chat como fuente de Navegador en OBS.",
  },
  {
    slug: "grabador-de-clips",
    title: "Grabador de clips y grabación completa",
    summary: "Guardar lo que acaba de pasar con el buffer, o grabar el stream entero a un archivo.",
  },
  {
    slug: "comando-clip-chat",
    title: 'Guardar un clip escribiendo "!clip" en el chat',
    summary: "Moderadores y streamer guardan un clip del buffer sin salir del juego.",
  },
  {
    slug: "perfiles-de-destinos",
    title: 'Perfiles: cambiar de "solo Twitch" a "todo" con un clic',
    summary: "Guardá combinaciones de destinos prendidos y aplicalas con un clic. Hasta 6 perfiles.",
  },
  {
    slug: "programar-inicio",
    title: "Programar inicio y comprobación previa",
    summary: "Elegí destinos y hora para arrancar solo, y revisá que todo esté bien antes de salir en vivo.",
  },
  {
    slug: "resumen-del-stream",
    title: "Resumen del stream",
    summary: "Duración, pico de espectadores, mensajes de chat y bitrate promedio al terminar de transmitir.",
  },
  {
    slug: "stream-deck",
    title: "Plugin de Stream Deck",
    summary: "Prender destinos, activar el buffer y guardar clips con botones físicos.",
  },
  {
    slug: "control-lan",
    title: "Controlar Muxlyve desde otra máquina de tu red",
    summary: "Controlar destinos, chat y Stream Deck desde una máquina distinta a la que transmite.",
  },
  {
    slug: "avisos-discord-telegram",
    title: "Avisos en Discord y Telegram cuando arrancás en vivo",
    summary: "Mensaje automático a hasta 3 webhooks de Discord y 3 bots de Telegram apenas empieza tu stream.",
  },
  {
    slug: "preguntas-frecuentes",
    title: "Preguntas frecuentes",
    summary: "Internet, TikTok, compatibilidad con otros encoders, calidad y reporte de bugs.",
  },
];
