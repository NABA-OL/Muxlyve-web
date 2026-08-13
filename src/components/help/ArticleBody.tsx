/*
 * Propiedad de BlacKraken Solutions
 * Desarrollado por: NABAOL
 * Fecha de creación: 2026-08-13
 */

import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import { ScreenshotPlaceholder } from "./ScreenshotPlaceholder";

interface Shot {
  src: string;
  label: string;
}

type TagMap = Record<string, (chunks: ReactNode) => ReactNode>;

const BASE_TAGS: TagMap = {
  h2: (chunks) => <h2>{chunks}</h2>,
  p: (chunks) => <p>{chunks}</p>,
  ul: (chunks) => <ul>{chunks}</ul>,
  ol: (chunks) => <ol>{chunks}</ol>,
  olcont: (chunks) => <ol start={2}>{chunks}</ol>,
  li: (chunks) => <li>{chunks}</li>,
  strong: (chunks) => <strong>{chunks}</strong>,
  em: (chunks) => <em>{chunks}</em>,
  code: (chunks) => <code>{chunks}</code>,
  mailto: (chunks) => <a href="mailto:soporte@muxlyve.app">{chunks}</a>,
};

export async function ArticleBody({
  slug,
  extraTags,
}: {
  slug: string;
  extraTags?: TagMap;
}) {
  const t = await getTranslations(`help.articles.${slug}`);
  const shots = t.raw("shots") as Shot[];

  return (
    <>
      {t.rich("content", {
        ...BASE_TAGS,
        ...extraTags,
        shot: (chunks) => {
          const shot = shots[Number(chunks)];
          return shot ? <ScreenshotPlaceholder src={shot.src} label={shot.label} /> : null;
        },
      })}
    </>
  );
}
