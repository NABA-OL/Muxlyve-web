/*
 * Propiedad de BlacKraken Solutions
 * Desarrollado por: NABAOL
 * Fecha de creación: 2026-08-27
 */
import type { Metadata } from "next";
import styles from "../[locale]/legal.module.css";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://muxlyve.com";

export const metadata: Metadata = {
  title: "Contacto — Muxlyve",
  description:
    "Cómo contactar al soporte de Muxlyve: correo, Discord, reporte de errores y gestión de licencia.",
  alternates: {
    canonical: `${BASE}/contact`,
    types: { "text/markdown": `${BASE}/contact.md` },
  },
  openGraph: {
    title: "Contacto — Muxlyve",
    url: `${BASE}/contact`,
    siteName: "Muxlyve",
    type: "website",
    locale: "es",
    images: [`${BASE}/opengraph-image`],
  },
};

const contactJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contacto — Muxlyve",
  url: `${BASE}/contact`,
  mainEntity: {
    "@type": "Organization",
    name: "BlacKraken Solutions",
    url: "https://blackraken.com",
    contactPoint: [
      {
        "@type": "ContactPoint",
        email: "soporte@muxlyve.com",
        contactType: "customer support",
        availableLanguage: ["Spanish", "English", "Portuguese", "French"],
      },
    ],
  },
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
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
        <h1>Contacto</h1>

        <h2>Soporte técnico</h2>
        <p>
          Para dudas de uso, activación de licencia o problemas técnicos,
          escribe a <a href="mailto:soporte@muxlyve.com">soporte@muxlyve.com</a>
          . También puedes revisar el <a href="/ayuda">centro de ayuda</a> antes
          de escribir, la mayoría de dudas frecuentes ya están documentadas ahí.
        </p>

        <h2>Reportar un error</h2>
        <p>
          Desde la propia aplicación, el botón &quot;Reportar un problema&quot;
          adjunta automáticamente los logs relevantes. Si prefieres no usar ese
          flujo, escribe directo a{" "}
          <a href="mailto:soporte@muxlyve.com">soporte@muxlyve.com</a>{" "}
          describiendo qué pasó.
        </p>

        <h2>Comunidad</h2>
        <p>
          Únete al{" "}
          <a
            href="https://discord.gg/ttRqRkAG"
            target="_blank"
            rel="noopener noreferrer"
          >
            Discord de Muxlyve
          </a>{" "}
          para hablar con otros streamers que usan la app y con el equipo de
          desarrollo.
        </p>

        <h2>Gestión de licencia</h2>
        <p>
          Para activar, transferir o revisar el estado de tu licencia, usa{" "}
          <a href="/gestionar-licencia">gestionar licencia</a>.
        </p>

        <h2>Prensa y alianzas</h2>
        <p>
          Para consultas comerciales o de prensa, usa el mismo correo:{" "}
          <a href="mailto:soporte@muxlyve.com">soporte@muxlyve.com</a>.
        </p>

        <a href="/" className={styles.back}>
          ← Volver al inicio
        </a>
      </main>
    </>
  );
}
