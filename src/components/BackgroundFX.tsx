import type { CSSProperties } from "react";
import styles from "./BackgroundFX.module.css";

// ponytail: red estática hardcodeada. Si pesa en equipos lentos, bajar nº de
// edges o el opacity del contenedor.
const NODES: ReadonlyArray<[number, number]> = [
  [120, 160],
  [360, 90],
  [300, 360],
  [80, 520],
  [560, 300],
  [720, 140],
  [880, 420],
  [1080, 220],
  [1240, 420],
  [1180, 680],
  [760, 640],
  [420, 720],
  [980, 760],
  [1330, 130],
];

const EDGES: ReadonlyArray<[number, number]> = [
  [0, 1],
  [0, 2],
  [2, 3],
  [2, 4],
  [1, 5],
  [4, 5],
  [4, 6],
  [5, 7],
  [6, 8],
  [7, 8],
  [7, 13],
  [6, 10],
  [10, 11],
  [3, 11],
  [8, 9],
  [9, 12],
  [10, 12],
  [6, 9],
  [4, 10],
];

export function BackgroundFX() {
  return (
    <svg
      className={styles.fx}
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="fxPulse" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#7c5cff" />
          <stop offset="1" stopColor="#4da3ff" />
        </linearGradient>
      </defs>

      <g className={styles.drift}>
        {EDGES.map(([a, b], i) => {
          const d = `M${NODES[a][0]} ${NODES[a][1]} L${NODES[b][0]} ${NODES[b][1]}`;
          const style = {
            "--d": `${(i % 7) * 0.9}s`,
            "--dur": `${5 + (i % 4)}s`,
          } as CSSProperties;
          return (
            <g key={i}>
              <path className={styles.edge} d={d} />
              <path className={styles.pulse} d={d} style={style} />
            </g>
          );
        })}

        {NODES.map(([x, y], i) => (
          <circle
            key={i}
            className={styles.node}
            cx={x}
            cy={y}
            r={3.5}
            style={{ "--d": `${(i % 5) * 0.7}s` } as CSSProperties}
          />
        ))}
      </g>
    </svg>
  );
}
