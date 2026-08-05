import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import styles from "./demo.module.css";

export const metadata: Metadata = {
  title: "Demo — Muxlyve",
  description:
    "Prueba el panel real de Muxlyve en el navegador, sin instalar nada. Datos de muestra, no es una transmisión real.",
};

export default function DemoPage() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <section>
          <div className="container">
            <span className="eyebrow">Demo interactiva</span>
            <h1 className="section-title" style={{ fontSize: "var(--text-h2)" }}>
              Prueba Muxlyve sin instalar nada
            </h1>
            <p className="section-lead">
              Este es el panel real, con destinos ya conectados y datos de
              muestra — no es una transmisión real ni requiere OBS ni cuenta.
            </p>

            <div className={styles.frameWrap}>
              <div className={styles.frameScroll}>
                <iframe
                  src="/Demo/dist/index.html"
                  title="Demo de Muxlyve"
                  loading="lazy"
                  className={styles.frame}
                />
              </div>
            </div>

            <div className={styles.cta}>
              <p>¿Te gustó? Descárgala y transmite de verdad.</p>
              <Link href="/descargar" className="btn btn-primary">
                Descargar gratis
              </Link>
            </div>

            <p className={styles.back}>
              <Link href="/">← Volver al inicio</Link>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
