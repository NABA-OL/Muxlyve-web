import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import styles from "./descargar.module.css";

export const metadata: Metadata = {
  title: "Descargar — Muxlyve",
  description: "Descarga Muxlyve para Windows y macOS. Requisitos e instrucciones de OBS.",
};

export const revalidate = 3600;

const REPO = process.env.GITHUB_REPO ?? "NABA-OL/Muxlyve";

function formatVersion(tag: string): string {
  const version = tag.replace(/^v/, "");
  const major = parseInt(version.split(".")[0] ?? "0", 10);
  return major < 1 ? `${version} (beta)` : version;
}

async function getLatestVersion(): Promise<string> {
  try {
    const headers: HeadersInit = {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    };
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }
    const res = await fetch(
      `https://api.github.com/repos/${REPO}/releases/latest`,
      { headers, next: { revalidate: 3600 } },
    );
    if (!res.ok) return formatVersion("0.1.5");
    const data = (await res.json()) as { tag_name: string };
    return formatVersion(data.tag_name);
  } catch {
    return formatVersion("0.1.5");
  }
}

const REQUISITOS = [
  "Windows 10 o 11 (64 bits)",
  "Conexión a internet para activar la licencia (luego transmite sin depender de ella)",
  "Subida recomendada: 6 Mbps o más para 1080p a varias plataformas",
  "OBS Studio instalado (opcional, para usarlo como fuente)",
];

const PASOS_OBS = [
  "Abre Muxlyve e inicia sesión / activa tu licencia.",
  "En cada plataforma (Twitch, Kick, YouTube, TikTok) copia tu clave de transmisión.",
  "Pégalas en Muxlyve, una por destino.",
  "En OBS, configura Muxlyve como destino de salida y pulsa «Iniciar transmisión».",
];

export default async function DescargarPage() {
  const version = await getLatestVersion();
  return (
    <>
      <Nav />
      <main id="main-content">
        <section>
          <div className="container">
            <span className="eyebrow">Descarga</span>
            <h1 className="section-title" style={{ fontSize: "var(--text-h2)" }}>
              Descarga Muxlyve
            </h1>
            <p className="section-lead">
              Versión actual: <strong style={{ color: "var(--text)" }}>{version}</strong>.
              Instálalo, activa tu licencia y transmite a las cuatro plataformas a
              la vez.
            </p>

            <div className={styles.downloadRow}>
              <a className="btn btn-primary" href="/api/download/win">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M0 0h11.4v11.4H0zm12.6 0H24v11.4H12.6zM0 12.6h11.4V24H0zm12.6 0H24V24H12.6z" />
                </svg>
                Descargar para Windows
              </a>
              <a className="btn btn-ghost" href="/api/download/mac">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M18.71 19.5c-.83 1.24-1.66 2.45-3 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.29-.02 2.51.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.48.26 3.65 1.84-.09.06-2.18 1.27-2.16 3.73.02 2.99 2.78 4.02 2.91 4.07-.03.09-.45 1.63-1.5 3.16zM12.75 5.09c.66-.8 1.1-1.92.98-3.04-1.12.04-2.48.74-3.27 1.67-.61.71-1.15 1.85-1.01 2.96 1.25.1 2.51-.59 3.3-1.59z" />
                </svg>
                Descargar para macOS
              </a>
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
