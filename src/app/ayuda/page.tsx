import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { HELP_ARTICLES } from "@/lib/help-articles";
import styles from "./ayuda.module.css";

export const metadata = {
  title: "Ayuda — Muxlyve",
  description:
    "Guías paso a paso: instalación, conectar tu software de streaming, chat unificado, overlay, clips, Stream Deck y más.",
};

export default function AyudaPage() {
  return (
    <>
      <Nav />
      <main>
        <section>
          <div className="container">
            <span className="eyebrow">Ayuda</span>
            <h1 className="section-title" style={{ fontSize: "var(--text-h2)" }}>
              Cómo funciona Muxlyve
            </h1>
            <p className="section-lead">
              Guías cortas y directas, paso a paso. Sin jerga innecesaria.
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
        </section>
      </main>
      <Footer />
    </>
  );
}
