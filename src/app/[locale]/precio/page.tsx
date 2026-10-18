/*
 * Propiedad de BlacKraken Solutions <blackraken.com>
 * Desarrollado por: NABAOL
 * Fecha de creación: 2026-09-03
 */

import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PricingPlans } from "@/components/PricingPlans";
import { buildAlternates } from "@/lib/i18n-meta";

export const revalidate = 86400;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "precio.meta" });
  return {
    alternates: buildAlternates(locale, "/precio"),
    title: t("title"),
    description: t("description"),
  };
}

export default async function PrecioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations();

  return (
    <>
      <Nav />
      <main id="main-content">
        <section>
          <div className="container">
            <div
              style={{ textAlign: "center", maxWidth: 680, margin: "0 auto" }}
            >
              <span className="eyebrow">{t("landing.precio.eyebrow")}</span>
              <h1 className="section-title" style={{ marginInline: "auto" }}>
                {t("precio.title")}
              </h1>
              <p
                className="section-lead"
                style={{ marginInline: "auto", marginTop: "1rem" }}
              >
                {t("precio.lead")}
              </p>
            </div>
            <div style={{ marginTop: "3rem" }}>
              <PricingPlans />
            </div>
            <p
              style={{
                marginTop: "2rem",
                textAlign: "center",
                color: "var(--muted)",
                fontSize: "0.9rem",
              }}
            >
              {t("precio.note")}{" "}
              <Link href="/alternativa-restream">
                {t("precio.compareLink")}
              </Link>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
