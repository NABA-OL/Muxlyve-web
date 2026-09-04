"use client";

/*
 * Propiedad de BlacKraken Solutions <blackraken.com>
 * Desarrollado por: NABAOL
 * Fecha de creación: 2026-08-28
 */
import { useState } from "react";
import { useTranslations } from "next-intl";
import styles from "./VideoShowcase.module.css";

interface Props {
  youtubeId: string;
}

export function VideoShowcase({ youtubeId }: Props) {
  const t = useTranslations("landing.video");
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div className={styles.frame}>
        <iframe
          className={styles.iframe}
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
          title={t("title")}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className={styles.frame}>
      <button
        type="button"
        className={styles.thumbButton}
        onClick={() => setPlaying(true)}
        aria-label={t("play")}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- miniatura hotlinked de YouTube, sin costo de ancho de banda propio */}
        <img
          className={styles.thumb}
          src={`https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`}
          alt=""
          width={1280}
          height={720}
          loading="lazy"
        />
        <span className={styles.playButton} aria-hidden="true">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </button>
    </div>
  );
}
