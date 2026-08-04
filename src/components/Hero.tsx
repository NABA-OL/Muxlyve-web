import type { CSSProperties } from "react";
import { PLATFORMS } from "@/lib/platforms";
import { PlatformIcon } from "./PlatformIcon";
import { HeroFlowBGLazy } from "./HeroFlowBGLazy";
import { GlassButton } from "./GlassButton";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <header className={styles.hero}>
      <div className={styles.bgLayer} aria-hidden="true">
        <HeroFlowBGLazy />
      </div>
      <div className={styles.scrim} aria-hidden="true" />

      <div className={`container ${styles.content}`}>
        <span className="eyebrow">Multistreaming de escritorio</span>
        <h1 className={styles.title}>
          Transmite a{" "}
          Twitch, Kick, YouTube y TikTok
          {" "}
          a la vez.
        </h1>

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

        <p className={styles.lead}>
          Sin marca de agua. Desde tu PC. Sin servidores intermediarios ni
          ancho de banda de terceros.
        </p>
        <div className={styles.actions}>
          <GlassButton href="/descargar">Descargar gratis</GlassButton>
          <GlassButton href="#precio" variant="ghost">
            Ver precio
          </GlassButton>
        </div>
        <p className={styles.note}>Windows · Mac próximamente</p>
      </div>
    </header>
  );
}
