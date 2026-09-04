/*
 * Propiedad de BlacKraken Solutions
 * Desarrollado por: NABAOL
 * Fecha de creación: 2026-08-13
 *  * Correo: nabaol.dev@gmail.com
 * Copyright (c) 2026 BlacKraken Solutions. Todos los derechos reservados.
 */

import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { buildAlternates } from "@/lib/i18n-meta";
import styles from "./demo.module.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "demo.meta" });
  return {
    alternates: buildAlternates(locale, "/demo"),
    title: t("title"),
    description: t("description"),
  };
}

export default async function DemoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("demo");
  return (
    <>
      <Nav />
      <main id="main-content">
        <section>
          <div className="container">
            <span className="eyebrow">{t("eyebrow")}</span>
            <h1
              className="section-title"
              style={{ fontSize: "var(--text-h2)" }}
            >
              {t("title")}
            </h1>
            <p className="section-lead">{t("lead")}</p>

            <div className={styles.frameWrap}>
              <div className={styles.frameScroll}>
                <iframe
                  src="/demo/dist/index.html"
                  title={t("iframeTitle")}
                  loading="lazy"
                  className={styles.frame}
                />
              </div>
            </div>

            <div className={styles.cta}>
              <p>{t("ctaText")}</p>
              <Link href="/descargar" className="btn btn-primary">
                {t("ctaButton")}
              </Link>
            </div>

            <p className={styles.back}>
              <Link href="/">{t("back")}</Link>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
