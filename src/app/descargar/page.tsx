import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import styles from "./descargar.module.css";

export const metadata: Metadata = {
  title: "Descargar — Multi_Stream",
  description: "Descarga Multi_Stream para Windows. Requisitos e instrucciones de OBS.",
};

// ponytail: versión y enlace fijos por ahora. Apuntar a GitHub Releases cuando
// el repo de la app publique el primer instalador (el doc lo deja como fuente única).
const VERSION = "0.1.0 (beta)";
const DOWNLOAD_URL =
  "https://github.com/tu-usuario/Multi_Stream/releases/latest";

const REQUISITOS = [
  "Windows 10 o 11 (64 bits)",
  "Conexión a internet para activar la licencia (luego transmite sin depender de ella)",
  "Subida recomendada: 6 Mbps o más para 1080p a varias plataformas",
  "OBS Studio instalado (opcional, para usarlo como fuente)",
];

const PASOS_OBS = [
  "Abre Multi_Stream e inicia sesión / activa tu licencia.",
  "En cada plataforma (Twitch, Kick, YouTube, TikTok) copia tu clave de transmisión.",
  "Pégalas en Multi_Stream, una por destino.",
  "En OBS, configura Multi_Stream como destino de salida y pulsa «Iniciar transmisión».",
];

export default function DescargarPage() {
  return (
    <>
      <Nav />
      <main>
        <section>
          <div className="container">
            <span className="eyebrow">Descarga</span>
            <h1 className="section-title" style={{ fontSize: "var(--text-h2)" }}>
              Multi_Stream para Windows
            </h1>
            <p className="section-lead">
              Versión actual: <strong style={{ color: "var(--text)" }}>{VERSION}</strong>.
              Instálalo, activa tu licencia y transmite a las cuatro plataformas a
              la vez.
            </p>

            <div className={styles.downloadRow}>
              <a className="btn btn-primary" href={DOWNLOAD_URL} rel="noopener noreferrer">
                Descargar para Windows
              </a>
              <span className={styles.macNote}>macOS — próximamente</span>
            </div>

            <div className={styles.cards}>
              <article className="card">
                <h2 className={styles.cardTitle}>Requisitos</h2>
                <ul className={styles.list}>
                  {REQUISITOS.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
              </article>

              <article className="card">
                <h2 className={styles.cardTitle}>Cómo conectarlo con OBS</h2>
                <ol className={styles.steps}>
                  {PASOS_OBS.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ol>
              </article>
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
