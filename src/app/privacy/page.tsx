/*
 * Propiedad de BlacKraken Solutions
 * Desarrollado por: NABAOL
 * Fecha de creación: 2026-08-27
 */
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import styles from "../[locale]/legal.module.css";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://muxlyve.com";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({ locale: "es", namespace: "privacidad.meta" });
  return {
    title: t("title"),
    // /privacy es un alias en ruta fija (sin prefijo de locale) del mismo
    // contenido que /privacidad — el canonical apunta a la versión "real"
    // dentro del sistema de i18n para no competir por indexación.
    alternates: {
      canonical: `${BASE}/privacidad`,
      types: { "text/markdown": `${BASE}/privacy.md` },
    },
    openGraph: {
      title: t("title"),
      url: `${BASE}/privacy`,
      siteName: "Muxlyve",
      type: "website",
      locale: "es",
      images: [`${BASE}/opengraph-image`],
    },
  };
}

export default async function PrivacyAliasPage() {
  const t = await getTranslations({ locale: "es", namespace: "privacidad" });
  const s1items = t.raw("s1items") as string[];
  const s2items = t.raw("s2items") as string[];
  const s4items = t.raw("s4items") as string[];

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
      <h1>{t("title")}</h1>
      <p>
        <strong>{t("updated")}</strong> {t("updatedDate")}
      </p>

      <h2>{t("s1title")}</h2>
      <p>{t("s1lead")}</p>
      <ul>
        {s1items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <h2>{t("s2title")}</h2>
      <p>{t("s2lead")}</p>
      <ul>
        {s2items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <h2>{t("s3title")}</h2>
      <p>{t("s3body")}</p>

      <h2>{t("s4title")}</h2>
      <p>{t("s4lead")}</p>
      <ul>
        {s4items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <p>{t("s4note")}</p>

      <h2>{t("s5title")}</h2>
      <p>
        {t("s5bodyPrefix")}
        <a href="mailto:soporte@muxlyve.com">soporte@muxlyve.com</a>
        {t("s5bodySuffix")}
      </p>

      <h2>{t("s6title")}</h2>
      <p>{t("s6body")}</p>

      <h2>{t("s7title")}</h2>
      <p>
        {t("s7bodyPrefix")}
        <a href="mailto:soporte@muxlyve.com">soporte@muxlyve.com</a>
        {t("s7bodySuffix")}
      </p>

      <a href="/" className={styles.back}>
        {t("back")}
      </a>
    </main>
  );
}
