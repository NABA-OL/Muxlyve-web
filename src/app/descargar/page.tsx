import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import styles from "./descargar.module.css";

export const metadata: Metadata = {
  title: "Descargar — Muxlyve",
  description: "Descarga Muxlyve para Windows. Requisitos e instrucciones de OBS.",
};

export const revalidate = 3600;

const REPO = process.env.GITHUB_REPO ?? "NABA-OL/Muxlyve";

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
    if (!res.ok) return "0.1.5 (beta)";
    const data = (await res.json()) as { tag_name: string };
    return `${data.tag_name.replace(/^v/, "")} (beta)`;
  } catch {
    return "0.1.5 (beta)";
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
      <main>
        <section>
          <div className="container">
            <span className="eyebrow">Descarga</span>
            <h1 className="section-title" style={{ fontSize: "var(--text-h2)" }}>
              Muxlyve para Windows
            </h1>
            <p className="section-lead">
              Versión actual: <strong style={{ color: "var(--text)" }}>{version}</strong>.
              Instálalo, activa tu licencia y transmite a las cuatro plataformas a
              la vez.
            </p>

            <div className={styles.downloadRow}>
              <a className="btn btn-primary" href="/api/download/win">
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
