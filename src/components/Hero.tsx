import Link from "next/link";
import type { CSSProperties } from "react";
import { PLATFORMS } from "@/lib/platforms";
import { PlatformIcon } from "./PlatformIcon";
import styles from "./Hero.module.css";

const SOURCE = { x: 70, y: 180 };
const DEST_X = 380;
const DEST_Y = [60, 140, 220, 300];

const channels = PLATFORMS.map((p, i) => {
  const y = DEST_Y[i];
  const lineDelay = 0.3 + i * 0.22;
  return {
    ...p,
    y,
    d: `M${SOURCE.x} ${SOURCE.y} C 210 ${SOURCE.y} 250 ${y} ${DEST_X} ${y}`,
    lineDelay,
    popDelay: lineDelay + 0.55,
  };
});

export function Hero() {
  return (
    <header className={styles.hero}>
      <div className="container">
        <div className={styles.grid}>
          <div>
            <span className="eyebrow">Multistreaming de escritorio</span>
            <h1 className={styles.title}>
              Transmite a{" "}
              <span className="gradient-text">
                Twitch, Kick, YouTube y TikTok
              </span>{" "}
              a la vez.
            </h1>
            <p className={styles.lead}>
              Sin marca de agua. Desde tu PC. Un pago único, sin suscripciones ni
              servidores intermediarios.
            </p>
            <div className={styles.actions}>
              <Link href="/descargar" className="btn btn-primary">
                Descargar gratis
              </Link>
              <Link href="#precio" className="btn btn-ghost">
                Ver precio
              </Link>
            </div>
            <p className={styles.note}>
              Windows · Mac próximamente · No necesita tarjeta
            </p>
          </div>

          <svg
            className={styles.stage}
            viewBox="0 0 460 360"
            role="img"
            aria-label="Una fuente de video se reparte a Twitch, Kick, YouTube y TikTok"
          >
            <defs>
              <linearGradient id="heroGrad" x1="0" y1="0" x2="460" y2="360">
                <stop stopColor="#7c5cff" />
                <stop offset="1" stopColor="#4da3ff" />
              </linearGradient>
            </defs>

            {channels.map((c) => (
              <path
                key={`line-${c.id}`}
                className={styles.line}
                d={c.d}
                style={{ "--line-delay": `${c.lineDelay}s` } as CSSProperties}
              />
            ))}
            {channels.map((c) => (
              <path
                key={`flow-${c.id}`}
                className={styles.flow}
                d={c.d}
                style={{ "--pop-delay": `${c.popDelay}s` } as CSSProperties}
              />
            ))}

            <g className={styles.source}>
              <circle cx={SOURCE.x} cy={SOURCE.y} r={20} fill="url(#heroGrad)" opacity={0.25} />
              <circle cx={SOURCE.x} cy={SOURCE.y} r={12} fill="url(#heroGrad)" />
            </g>

            {channels.map((c) => (
              <g key={`dest-${c.id}`} transform={`translate(${DEST_X} ${c.y})`}>
                <g
                  className={styles.dest}
                  style={{ "--pop-delay": `${c.popDelay}s` } as CSSProperties}
                >
                  <circle
                    r={22}
                    fill="var(--surface)"
                    stroke={c.color}
                    strokeWidth={2}
                  />
                  <g transform="translate(-14 -14)" style={{ color: c.color }}>
                    <PlatformIcon id={c.id} size={28} />
                  </g>
                </g>
              </g>
            ))}
          </svg>
        </div>
      </div>
    </header>
  );
}
