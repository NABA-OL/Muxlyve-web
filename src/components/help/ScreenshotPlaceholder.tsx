import fs from "node:fs";
import path from "node:path";

interface Props {
  /** Ruta pública, ej. "/help/stream-deck.png". Poné el archivo en public/help/ con ese nombre exacto. */
  src: string;
  label: string;
}

export function ScreenshotPlaceholder({ src, label }: Props) {
  const exists = fs.existsSync(path.join(process.cwd(), "public", src));

  if (exists) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- dimensiones reales desconocidas hasta que el usuario sube la captura
      <img
        src={src}
        alt={label}
        style={{
          width: "100%",
          height: "auto",
          display: "block",
          borderRadius: "var(--radius)",
          border: "1px solid var(--border)",
          margin: "1.5rem 0",
        }}
      />
    );
  }

  return (
    <div
      style={{
        border: "1px dashed var(--border)",
        borderRadius: "var(--radius)",
        padding: "2rem 1.5rem",
        textAlign: "center",
        color: "var(--muted)",
        fontSize: "0.9rem",
        background: "var(--surface)",
        margin: "1.5rem 0",
      }}
    >
      [SCREENSHOT: {label}]
      <br />
      <code style={{ fontSize: "0.78rem", opacity: 0.75 }}>
        Poné el archivo en public{src}
      </code>
    </div>
  );
}
