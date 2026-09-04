/*
 * Propiedad de BlacKraken Solutions <blackraken.com>
 * Desarrollado por: NABAOL
 * Fecha de creación: 2026-08-13
 *  * Correo: nabaol.dev@gmail.com
 * Copyright (c) 2026 BlacKraken Solutions. Todos los derechos reservados.
 */

import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { buildAlternates } from "@/lib/i18n-meta";
import styles from "../legal.module.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacidad.meta" });
  return {
    alternates: buildAlternates(locale, "/privacidad"),
    title: t("title"),
    description: t("description"),
  };
}

export default async function PrivacidadPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("privacidad");
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

      <Link href="/" className={styles.back}>
        {t("back")}
      </Link>
    </main>
  );
}
