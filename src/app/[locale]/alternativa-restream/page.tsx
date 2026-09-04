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
import { buildAlternates } from "@/lib/i18n-meta";
import styles from "./comparativa.module.css";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://muxlyve.com";

interface CompareRow {
  criterio: string;
  nube: string;
  muxlyve: string;
}

interface FaqItem {
  q: string;
  a: string;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "comparativa.meta" });
  return {
    alternates: buildAlternates(locale, "/alternativa-restream"),
    title: t("title"),
    description: t("description"),
  };
}

export default async function ComparativaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("comparativa");
  const rows = t.raw("rows") as CompareRow[];
  const faq = t.raw("faq") as FaqItem[];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Nav />
      <main id="main-content">
        <section>
          <div className="container">
            <div className={styles.intro}>
              <span className="eyebrow">{t("eyebrow")}</span>
              <h1 className="section-title" style={{ marginInline: "auto" }}>
                {t("title")}
              </h1>
              <p
                className="section-lead"
                style={{ marginInline: "auto", marginTop: "1rem" }}
              >
                {t("lead")}
              </p>
              <div className={styles.actions}>
                <Link href="/descargar" className="btn btn-primary">
                  {t("ctaPrimary")}
                </Link>
                <Link href="/demo" className="btn btn-ghost">
                  {t("ctaSecondary")}
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="container">
            <h2 className="section-title">{t("tableTitle")}</h2>
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th scope="col">{t("colCriterio")}</th>
                    <th scope="col">{t("colNube")}</th>
                    <th scope="col">Muxlyve</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.criterio}>
                      <th scope="row">{r.criterio}</th>
                      <td>{r.nube}</td>
                      <td className={styles.win}>{r.muxlyve}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className={styles.fairness}>{t("fairness")}</p>
          </div>
        </section>

        <section>
          <div className="container">
            <h2 className="section-title">{t("whenTitle")}</h2>
            <div className={styles.split}>
              <div className="card">
                <h3 className={styles.cardTitle}>{t("whenCloudTitle")}</h3>
                <ul className={styles.list}>
                  {(t.raw("whenCloud") as string[]).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="card">
                <h3 className={styles.cardTitle}>{t("whenLocalTitle")}</h3>
                <ul className={styles.list}>
                  {(t.raw("whenLocal") as string[]).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="container">
            <h2 className="section-title">{t("faqTitle")}</h2>
            <div className={styles.faq}>
              {faq.map((f) => (
                <details key={f.q} className={styles.faqItem}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="container">
            <div className={styles.cta}>
              <h2 className="section-title" style={{ marginInline: "auto" }}>
                {t("closingTitle")}
              </h2>
              <p
                className="section-lead"
                style={{ marginInline: "auto", marginTop: "1rem" }}
              >
                {t("closingLead")}
              </p>
              <div className={styles.actions}>
                <Link href="/descargar" className="btn btn-primary">
                  {t("ctaPrimary")}
                </Link>
                <a href={`${BASE}/#precio`} className="btn btn-ghost">
                  {t("ctaPrice")}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
