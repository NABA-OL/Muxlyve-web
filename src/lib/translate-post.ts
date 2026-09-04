/*
 * Propiedad de BlacKraken Solutions <blackraken.com>
 * Desarrollado por: NABAOL
 * Fecha de creación: 2026-09-03
 */

import type { Locale } from "@/i18n/routing";

/**
 * Traducción de entradas del blog con la API de Anthropic.
 *
 * Está apagado mientras no exista `ANTHROPIC_API_KEY`: `isTranslationEnabled()`
 * devuelve false y el panel muestra el botón deshabilitado. En cuanto se
 * agregue la variable en Vercel, el flujo queda activo sin tocar código.
 *
 * Importante: se traduce UNA vez al publicar y se guarda en la base, no en cada
 * visita — así el HTML de cada idioma es estático e indexable. Y la traducción
 * queda editable en el panel antes de publicar: Google penaliza el contenido
 * traducido a máquina que se publica sin revisar.
 */

const API_URL = "https://api.anthropic.com/v1/messages";
const MODEL = "claude-sonnet-5";

/** Términos que no se traducen ni se adaptan. */
const GLOSSARY = [
  "Muxlyve",
  "BlacKraken Solutions",
  "Stream Deck",
  "OBS",
  "Streamlabs",
  "XSplit",
  "vMix",
  "N.Air",
  "Twitch",
  "Kick",
  "YouTube",
  "TikTok",
  "RTMP",
  "RTMPS",
  "SRT",
  "bitrate",
  "multistreaming",
];

const LOCALE_NAMES: Record<Locale, string> = {
  es: "español neutro",
  en: "English",
  pt: "português do Brasil",
  fr: "français",
};

export function isTranslationEnabled(): boolean {
  return Boolean(process.env.ANTHROPIC_API_KEY);
}

export interface TranslatedPost {
  title: string;
  excerpt: string;
  body: string;
}

interface AnthropicResponse {
  content?: { type: string; text?: string }[];
}

/**
 * Traduce una entrada al idioma destino. Devuelve null si la traducción está
 * apagada o si la API falla — el llamador decide qué mostrar.
 */
export async function translatePost(
  post: { title: string; excerpt: string; body: string },
  target: Locale,
): Promise<TranslatedPost | null> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return null;

  const prompt = [
    `Traduce esta entrada de blog al ${LOCALE_NAMES[target]}.`,
    "",
    "Reglas:",
    `- No traduzcas ni adaptes estos términos: ${GLOSSARY.join(", ")}.`,
    "- Conserva exactamente las etiquetas HTML del cuerpo; traduce solo el texto visible.",
    "- Mantén el tono directo y técnico del original, sin agregar ni quitar información.",
    "- Responde SOLO con un objeto JSON válido, sin markdown ni texto alrededor,",
    '  con las claves: "title", "excerpt", "body".',
    "",
    "Entrada:",
    JSON.stringify({ title: post.title, excerpt: post.excerpt, body: post.body }),
  ].join("\n");

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 8000,
        messages: [{ role: "user", content: prompt }],
      }),
    });
    if (!res.ok) return null;

    const data = (await res.json()) as AnthropicResponse;
    const text = data.content?.find((c) => c.type === "text")?.text;
    if (!text) return null;

    // El modelo puede envolver el JSON en un bloque de código pese a la
    // instrucción; se extrae el primer objeto que aparezca.
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) return null;

    const parsed = JSON.parse(match[0]) as Partial<TranslatedPost>;
    if (!parsed.title || !parsed.body) return null;

    return {
      title: parsed.title,
      excerpt: parsed.excerpt ?? "",
      body: parsed.body,
    };
  } catch {
    return null;
  }
}
