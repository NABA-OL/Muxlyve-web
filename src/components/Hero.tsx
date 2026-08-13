import type { CSSProperties } from "react";
import { useTranslations } from "next-intl";
import { PLATFORMS } from "@/lib/platforms";
import { PlatformIcon } from "./PlatformIcon";
import { HeroFlowBGLazy } from "./HeroFlowBGLazy";
import { GlassButton } from "./GlassButton";
import styles from "./Hero.module.css";

export function Hero() {
  const t = useTranslations("hero");
  const tDescarga = useTranslations("landing.descarga");

  return (
    <header className={styles.hero}>
      <div className={styles.bgLayer} aria-hidden="true">
        <HeroFlowBGLazy />
      </div>
      <div className={styles.scrim} aria-hidden="true" />

      <div className={`container ${styles.content}`}>
        <span className="eyebrow">{t("eyebrow")}</span>
        <h1 className={styles.title}>{t("title")}</h1>

        <div className={styles.platformRail} aria-hidden="true">
          {PLATFORMS.map((p) => (
            <div
              key={p.id}
              className={styles.badge}
              style={
                {
                  borderColor: p.color,
                  "--badge-color": p.color,
                } as CSSProperties
              }
            >
              <span style={{ color: p.color }}>
                <PlatformIcon id={p.id} size={18} />
              </span>
            </div>
          ))}
        </div>

        <p className={styles.lead}>{t("lead")}</p>
        <div className={styles.actions}>
          <GlassButton href="/descargar">{t("ctaPrimary")}</GlassButton>
          <GlassButton href="#precio" variant="ghost">
            {t("ctaSecondary")}
          </GlassButton>
        </div>
        <p className={styles.note}>
          <span className={styles.noteItem}>
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M0 0h11.4v11.4H0zm12.6 0H24v11.4H12.6zM0 12.6h11.4V24H0zm12.6 0H24V24H12.6z" />
            </svg>
            {tDescarga("windows")}
          </span>
          <span className={styles.noteDivider}>·</span>
          <span className={styles.noteItem}>
            <svg
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M18.71 19.5c-.83 1.24-1.66 2.45-3 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.29-.02 2.51.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.48.26 3.65 1.84-.09.06-2.18 1.27-2.16 3.73.02 2.99 2.78 4.02 2.91 4.07-.03.09-.45 1.63-1.5 3.16zM12.75 5.09c.66-.8 1.1-1.92.98-3.04-1.12.04-2.48.74-3.27 1.67-.61.71-1.15 1.85-1.01 2.96 1.25.1 2.51-.59 3.3-1.59z" />
            </svg>
            {tDescarga("mac")}
          </span>
        </p>
      </div>
    </header>
  );
}
