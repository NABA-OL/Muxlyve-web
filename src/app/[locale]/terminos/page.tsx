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
  const t = await getTranslations({ locale, namespace: "terminos.meta" });
  return {
    alternates: buildAlternates(locale, "/terminos"),
    title: t("title"),
  };
}

export default async function TerminosPage() {
  const t = await getTranslations("terminos");

  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: "3rem 1.5rem", fontFamily: "system-ui, sans-serif", lineHeight: 1.7 }}>
      <h1>{t("title")}</h1>
      <p><strong>{t("updated")}</strong> {t("updatedDate")}</p>

      <h2>{t("s1title")}</h2>
      <p>{t("s1body")}</p>

      <h2>{t("s2title")}</h2>
      <p>{t("s2body")}</p>

      <h2>{t("s3title")}</h2>
      <p>{t("s3body")}</p>

      <h2>{t("s4title")}</h2>
      <p>
        {t("s4bodyPrefix")}{" "}
        <a href="https://users.freemius.com" target="_blank" rel="noopener noreferrer">
          users.freemius.com
        </a>
        {t("s4bodySuffix")}
      </p>

      <h2>{t("s5title")}</h2>
      <p>{t("s5body")}</p>

      <h2>{t("s6title")}</h2>
      <p>{t("s6body")}</p>

      <h2>{t("s7title")}</h2>
      <p>{t("s7body")}</p>

      <h2>{t("s8title")}</h2>
      <p>{t("s8body")}</p>
    </main>
  );
}
