/*
 * Propiedad de BlacKraken Solutions
 * Desarrollado por: NABAOL
 * Fecha de creación: 2026-08-13
 *  * Correo: nabaol.dev@gmail.com
 * Copyright (c) 2026 BlacKraken Solutions. Todos los derechos reservados.
 */

import { getTranslations } from "next-intl/server";

function stripTags(s: string): string {
  return s
    .replace(/<shot>[\s\S]*?<\/shot>/g, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export async function buildHowToJsonLd(slug: string) {
  const t = await getTranslations(`help.articles.${slug}`);
  const content = t.raw("content") as string;
  const olMatch = content.match(/<ol>([\s\S]*?)<\/ol>/);
  if (!olMatch) return null;
  const steps = [...olMatch[1].matchAll(/<li>([\s\S]*?)<\/li>/g)]
    .map((m) => stripTags(m[1]))
    .filter(Boolean);
  if (steps.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: t("title"),
    description: t("metaDescription"),
    step: steps.map((text, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      text,
    })),
  };
}

export async function buildFaqJsonLd(slug: string) {
  const t = await getTranslations(`help.articles.${slug}`);
  const content = t.raw("content") as string;
  const items = content
    .split(/(?=<h2>)/)
    .filter((s) => s.startsWith("<h2>"))
    .map((s) => ({
      q: stripTags((s.match(/<h2>([\s\S]*?)<\/h2>/) || ["", ""])[1]),
      a: stripTags(s.replace(/<h2>[\s\S]*?<\/h2>/, "")),
    }))
    .filter((qa) => qa.q && qa.a);
  if (items.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}
