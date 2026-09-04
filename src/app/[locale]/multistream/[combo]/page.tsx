/*
 * Propiedad de BlacKraken Solutions
 * Desarrollado por: NABAOL
 * Fecha de creación: 2026-09-03
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PlatformIcon } from "@/components/PlatformIcon";
import { PLATFORMS, type PlatformId } from "@/lib/platforms";
import { routing } from "@/i18n/routing";
import { buildAlternates } from "@/lib/i18n-meta";
import styles from "./combo.module.css";

/** Combinaciones con landing propia. El orden define el de los iconos. */
export const COMBOS: Record<string, PlatformId[]> = {
  "twitch-kick": ["twitch", "kick"],
  "twitch-tiktok": ["twitch", "tiktok"],
  "youtube-tiktok": ["youtube", "tiktok"],
};

interface Step {
  title: string;
  body: string;
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    Object.keys(COMBOS).map((combo) => ({ locale, combo })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; combo: string }>;
}): Promise<Metadata> {
  const { locale, combo } = await params;
  if (!COMBOS[combo]) return {};
  const t = await getTranslations({
    locale,
    namespace: `combos.${combo}.meta`,
  });
  return {
    alternates: buildAlternates(locale, `/multistream/${combo}`),
    title: t("title"),
    description: t("description"),
  };
}

export default async function ComboPage({
  params,
}: {
  params: Promise<{ locale: string; combo: string }>;
}) {
  const { locale, combo } = await params;
  const platforms = COMBOS[combo];
  if (!platforms) notFound();
  setRequestLocale(locale);

  const t = await getTranslations(`combos.${combo}`);
  const tShared = await getTranslations("combos.shared");
  const steps = t.raw("steps") as Step[];
  const notes = t.raw("notes") as string[];

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: t("title"),
    description: t("lead"),
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.title,
      text: s.body,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />
      <Nav />
      <main id="main-content">
        <section>
          <div className="container">
            <div className={styles.intro}>
              <div className={styles.icons} aria-hidden="true">
                {platforms.map((id) => {
                  const p = PLATFORMS.find((x) => x.id === id);
                  return (
                    <span
                      key={id}
                      className={styles.icon}
                      style={{ color: p?.color, borderColor: p?.color }}
                    >
                      <PlatformIcon id={id} size={26} />
                    </span>
                  );
                })}
              </div>
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
                  {tShared("ctaDownload")}
                </Link>
                <Link href="/demo" className="btn btn-ghost">
                  {tShared("ctaDemo")}
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="container">
            <h2 className="section-title">{tShared("stepsTitle")}</h2>
            <ol className={styles.steps}>
              {steps.map((s, i) => (
                <li key={s.title}>
                  <span className={styles.stepNum} aria-hidden="true">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className={styles.stepTitle}>{s.title}</h3>
                    <p className={styles.stepBody}>{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section>
          <div className="container">
            <div className="card">
              <h2 className={styles.notesTitle}>{tShared("notesTitle")}</h2>
              <ul className={styles.notes}>
                {notes.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section>
          <div className="container">
            <p className={styles.related}>
              {tShared("relatedPrefix")}{" "}
              <Link href="/alternativa-restream">
                {tShared("relatedCompare")}
              </Link>{" "}
              ·{" "}
              <Link href="/ayuda/conectar-plataformas">
                {tShared("relatedHelp")}
              </Link>{" "}
              · <Link href="/precio">{tShared("relatedPricing")}</Link>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
