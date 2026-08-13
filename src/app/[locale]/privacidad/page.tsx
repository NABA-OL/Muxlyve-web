// Desarrollado por BlacKraken Solutions
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { buildAlternates } from "@/lib/i18n-meta";

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
  };
}

export default async function PrivacidadPage() {
  const t = await getTranslations("privacidad");
  const s1items = t.raw("s1items") as string[];
  const s2items = t.raw("s2items") as string[];

  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: "3rem 1.5rem", fontFamily: "system-ui, sans-serif", lineHeight: 1.7 }}>
      <h1>{t("title")}</h1>
      <p><strong>{t("updated")}</strong> {t("updatedDate")}</p>

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
      <p>{t("s4body")}</p>

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
    </main>
  );
}
