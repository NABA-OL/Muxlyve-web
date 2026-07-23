import fs from "node:fs";
import path from "node:path";
import { ZoomableImage } from "./ZoomableImage";

interface Props {
  /** Ruta pública, ej. "/help/stream-deck.png". Poné el archivo en public/help/ con ese nombre exacto. */
  src: string;
  label: string;
}

export function ScreenshotPlaceholder({ src, label }: Props) {
  const exists = fs.existsSync(path.join(process.cwd(), "public", src));

  if (exists) {
    return <ZoomableImage src={src} alt={label} />;
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
