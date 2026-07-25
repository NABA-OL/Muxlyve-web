import Link from "next/link";
import { HELP_ARTICLES } from "@/lib/help-articles";
import styles from "./ayuda.module.css";

export const metadata = {
  title: "Ayuda — Muxlyve",
  description:
    "Guías paso a paso: instalación, conectar tu software de streaming, chat unificado, overlay, clips, Stream Deck y más.",
};

export default function AyudaPage() {
  return (
    <div>
      <h1 className={styles.articleTitle}>Cómo funciona Muxlyve</h1>
      <p className={styles.intro}>
        Guías cortas y directas, paso a paso. Sin jerga innecesaria. Elegí un
        artículo de la lista.
      </p>
      <div className={styles.grid}>
        {HELP_ARTICLES.map((a) => (
          <Link
            key={a.slug}
            href={`/ayuda/${a.slug}`}
            className="card"
            style={{ display: "block" }}
          >
            <h2 className={styles.cardTitle}>{a.title}</h2>
            <p className={styles.cardSummary}>{a.summary}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
