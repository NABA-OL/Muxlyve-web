/*
 * Propiedad de BlacKraken Solutions
 * Desarrollado por: NABAOL
 * Fecha de creación: 2026-08-27
 */
import type { Metadata } from "next";
import styles from "../[locale]/legal.module.css";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://muxlyve.com";

export const metadata: Metadata = {
  title: "Acerca de — Muxlyve",
  description:
    "Muxlyve es un software de multistreaming de escritorio creado por BlacKraken Solutions. Conoce qué es, quién lo desarrolla y por qué existe.",
  alternates: {
    canonical: `${BASE}/about`,
    types: { "text/markdown": `${BASE}/about.md` },
  },
  openGraph: {
    title: "Acerca de — Muxlyve",
    url: `${BASE}/about`,
    siteName: "Muxlyve",
    type: "website",
    locale: "es",
    images: [`${BASE}/opengraph-image`],
  },
};

export default function AboutPage() {
  return (
    <main
      className={styles.legal}
      style={{
        maxWidth: 720,
        margin: "0 auto",
        padding: "3rem 1.5rem",
        fontFamily: "system-ui, sans-serif",
        lineHeight: 1.7,
      }}
    >
      <h1>Acerca de Muxlyve</h1>
      <p>
        Software de multistreaming de escritorio para Windows y macOS, creado
        por BlacKraken Solutions.
      </p>

      <h2>Qué es Muxlyve</h2>
      <p>
        Muxlyve es una aplicación de escritorio que recibe la señal de tu
        software de encoding (OBS, Streamlabs, XSplit, vMix o cualquier otro
        que hable RTMP) y la reenvía en simultáneo a Twitch, Kick, YouTube y
        TikTok, sin marca de agua y sin pasar por servidores en la nube de
        terceros. Todo el reenvío ocurre desde tu propio equipo.
      </p>

      <h2>Quién lo desarrolla</h2>
      <p>
        Muxlyve es un producto de BlacKraken Solutions, un estudio de
        desarrollo de software y automatización. BlacKraken diseñó Muxlyve
        como alternativa de escritorio a servicios de multistream basados en
        la nube (como Restream o Castr), que suelen cobrar por ancho de banda
        o limitar la calidad en sus planes gratuitos.
      </p>

      <h2>Por qué existe</h2>
      <p>
        Transmitir a varias plataformas a la vez normalmente implica depender
        de un servicio externo, pagar mensualidad por ancho de banda o
        aceptar una marca de agua sobre el video. Muxlyve resuelve esto
        reenviando la señal directo desde el computador del usuario a cada
        plataforma, sin intermediarios.
      </p>

      <h2>Contacto</h2>
      <p>
        Para soporte, prensa o alianzas, escribe a{" "}
        <a href="mailto:soporte@muxlyve.com">soporte@muxlyve.com</a> o visita
        la <a href="/contact">página de contacto</a>.
      </p>

      <a href="/" className={styles.back}>
        ← Volver al inicio
      </a>
    </main>
  );
}
