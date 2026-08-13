/*
 * Propiedad de BlacKraken Solutions
 * Desarrollado por: NABAOL
 * Fecha de creación: 2026-08-13
 */

import { getTranslations } from "next-intl/server";
import { HELP_ARTICLES } from "@/lib/help-articles";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://muxlyve.com";

export async function GET() {
  const t = await getTranslations({ locale: "es", namespace: "help" });
  const helpLinks = HELP_ARTICLES.map(
    (a) =>
      `- [${t(`articles.${a.slug}.title`)}](${BASE}/ayuda/${a.slug}): ${t(`articles.${a.slug}.summary`)}`,
  ).join("\n");

  const body = `# Muxlyve

> Software de multistreaming para Windows. Transmite a Twitch, Kick, YouTube y TikTok al mismo tiempo, sin marca de agua.

Muxlyve es una aplicación de escritorio (no un servicio en la nube) que recibe el stream de tu software de encoding (OBS, Streamlabs, XSplit, etc.) y lo reenvía en simultáneo a varias plataformas.

## Páginas principales

- [Inicio](${BASE}/): Presentación del producto y características.
- [Demo](${BASE}/demo): Panel de Muxlyve interactivo con datos de muestra, sin instalar nada.
- [Descargar](${BASE}/descargar): Última versión para descargar.
- [Centro de ayuda](${BASE}/ayuda): Documentación completa de uso.
- [Gestionar licencia](${BASE}/gestionar-licencia): Autogestión de licencia del usuario.

## Ayuda

${helpLinks}

## Legal

- [Privacidad](${BASE}/privacidad)
- [Términos](${BASE}/terminos)
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
