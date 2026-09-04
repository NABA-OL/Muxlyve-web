/*
 * Propiedad de BlacKraken Solutions <blackraken.com>
 * Desarrollado por: NABAOL
 * Fecha de creación: 2026-08-13
 *  * Correo: nabaol.dev@gmail.com
 * Copyright (c) 2026 BlacKraken Solutions. Todos los derechos reservados.
 */

import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ScreenshotPlaceholder } from "./ScreenshotPlaceholder";
import styles from "@/app/[locale]/ayuda/ayuda.module.css";

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
  mailto: (chunks) => <a href="mailto:soporte@muxlyve.com">{chunks}</a>,
};

export async function ArticleBody({
  slug,
  extraTags,
}: {
  slug: string;
  extraTags?: TagMap;
}) {
  const t = await getTranslations(`help.articles.${slug}`);
  const tHelp = await getTranslations("help");
  const shots = t.raw("shots") as Shot[];
  // No todos los artículos tienen highlights (los que no traen <tldr>). t.raw
  // registra un MISSING_MESSAGE si la clave no existe, así que se consulta con
  // t.has antes de leerla.
  const highlights = t.has("highlights")
    ? (t.raw("highlights") as string[])
    : undefined;

  return (
    <>
      {t.rich("content", {
        ...BASE_TAGS,
        ...extraTags,
        shot: (chunks) => {
          const shot = shots[Number(chunks)];
          return shot ? (
            <ScreenshotPlaceholder src={shot.src} label={shot.label} />
          ) : null;
        },
        tldr: () =>
          highlights ? (
            <ul className={styles.articleTldr}>
              {highlights.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          ) : null,
        cta: () => (
          <div className={styles.articleCta}>
            <span>{tHelp("ctaText")}</span>
            <Link href="/descargar" className="btn btn-primary">
              {tHelp("ctaButton")}
            </Link>
          </div>
        ),
      })}
    </>
  );
}
