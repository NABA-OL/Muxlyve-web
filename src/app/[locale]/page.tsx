/*
 * Propiedad de BlacKraken Solutions
 * Desarrollado por: NABAOL
 * Fecha de creación: 2026-08-13
 *  * Correo: nabaol.dev@gmail.com
 * Copyright (c) 2026 BlacKraken Solutions. Todos los derechos reservados.
 */

import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { VideoShowcase } from "@/components/VideoShowcase";
import { Footer } from "@/components/Footer";
import { RevealObserver } from "@/components/RevealObserver";
import { PlatformIcon } from "@/components/PlatformIcon";
import { StreamDeckIcon } from "@/components/StreamDeckIcon";
import { FeatureIcon, type FeatureIconId } from "@/components/FeatureIcon";
import { PLATFORMS } from "@/lib/platforms";
import { ensureSchema } from "@/lib/db";
import { getSetting } from "@/lib/settings";
import styles from "./page.module.css";

export const revalidate = 60;

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://muxlyve.com";

// TODO: reemplazar con la URL real cuando el plugin de Stream Deck esté publicado.
const STREAM_DECK_PLUGIN_URL =
  "https://marketplace.elgato.com/product/muxlyve-3bb96a31-6c46-4a52-be62-9868e624b117";

// TODO: pegar el ID del video de YouTube (unlisted) una vez subido — ej. de
// https://youtu.be/XXXXXXXXXXX el ID es "XXXXXXXXXXX". Vacío = sección oculta.
const YOUTUBE_VIDEO_ID = "fGgns5yzfcU";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Muxlyve",
  operatingSystem: "Windows",
  applicationCategory: "MultimediaApplication",
  description:
    "Software de multistreaming para Windows. Transmite a Twitch, Kick, YouTube y TikTok al mismo tiempo sin marca de agua.",
  url: BASE,
  offers: [
    {
      "@type": "Offer",
      name: "Mensual",
      priceCurrency: "USD",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        priceType: "https://schema.org/RecurringCharge",
        billingIncrement: 1,
      },
    },
    {
      "@type": "Offer",
      name: "Anual",
      priceCurrency: "USD",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        priceType: "https://schema.org/RecurringCharge",
        billingIncrement: 12,
      },
    },
    {
      "@type": "Offer",
      name: "Vitalicia",
      priceCurrency: "USD",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        priceType: "https://schema.org/OneTimePurchase",
      },
    },
  ],
  publisher: {
    "@type": "Organization",
    name: "BlacKraken Solutions",
    url: "https://blackraken.vercel.app",
  },
  featureList: [
    "Multistreaming sin marca de agua",
    "Compatible con tu app de streaming favorita",
    "Chat unificado de Twitch y Kick",
    "Overlay de chat para OBS",
    "Grabador de clips en buffer y grabación completa",
    "Programar inicio de transmisión",
    "Resumen automático del stream",
    "Acceso remoto por LAN",
    "Multi Idiomas",
    "Perfiles de destinos guardados",
    "Comando !clip en el chat",
    "Avisos automáticos a Discord y Telegram",
    "Compatible con Elgato Stream Deck",
    "StramDeck",
    "Reconexión automática",
    "Preview en vivo por destino",
    "Twitch, Kick, YouTube, TikTok",
    "Destinos personalizados por RTMP, RTMPS o SRT",
    "Moderación de chat (timeout/ban)",
    "Historial de sesiones",
    "Exportar/importar configuración",
    "Aviso de audio cortado",
    "Twitch",
    "Kick",
    "YouTube",
    "TikTok",
  ],
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "BlacKraken Solutions",
  url: "https://blackraken.vercel.app",
  logo: `${BASE}/icon-muxlyve.svg`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bogotá",
    addressRegion: "Bogotá D.C.",
    postalCode: "110851",
    addressCountry: "CO",
  },
  sameAs: [
    "https://blackraken.vercel.app",
    "https://github.com/nabaol",
    "https://discord.gg/ttRqRkAG",
    "https://marketplace.elgato.com/@blackraken",
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      email: "soporte@muxlyve.com",
      contactType: "customer support",
      availableLanguage: ["Spanish", "English", "Portuguese", "French"],
    },
  ],
};

interface Step {
  title: string;
  body: string;
}

interface Feature {
  icon: FeatureIconId | "streamdeck";
  title: string;
  body: string;
  link?: boolean;
  linkLabel?: string;
  wide?: boolean;
}

interface FeatureGroup {
  title: string;
  features: Feature[];
}

export default async function Home() {
  const t = await getTranslations();

  const streamDeckMockupExists = fs.existsSync(
    path.join(process.cwd(), "public", "streamdeck-mockup.png"),
  );
  let priceMonthly = "";
  let priceAnnual = "";
  let priceLifetime = "";
  let monthlyVisible = true;
  let annualVisible = true;
  let lifetimeVisible = true;
  let promoActive = false;
  let promoText = "";
  let promoCoupon = "";
  try {
    await ensureSchema();
    const settings = await Promise.all([
      getSetting("price_monthly"),
      getSetting("price_annual"),
      getSetting("price_lifetime"),
      getSetting("plan_monthly_visible", "true"),
      getSetting("plan_annual_visible", "true"),
      getSetting("plan_lifetime_visible", "true"),
      getSetting("promo_active", "false"),
      getSetting("promo_text"),
      getSetting("promo_coupon"),
    ]);
    [priceMonthly, priceAnnual, priceLifetime] = settings;
    monthlyVisible = settings[3] !== "false";
    annualVisible = settings[4] !== "false";
    lifetimeVisible = settings[5] !== "false";
    promoActive = settings[6] === "true";
    promoText = settings[7];
    promoCoupon = settings[8];
  } catch {
    // DB unavailable — show placeholders
  }

  function fmt(v: string) {
    return v ? `$${v}` : null;
  }

  const STEPS = t.raw("landing.comoFunciona.steps") as Step[];
  const FEATURE_GROUPS = t.raw(
    "landing.caracteristicas.groups",
  ) as FeatureGroup[];
  const COMPARE = t.raw("landing.queHace.compare") as string[];
  const mensualIncludes = t.raw("landing.precio.mensual.includes") as string[];
  const anualIncludes = t.raw("landing.precio.anual.includes") as string[];
  const vitaliciaIncludes = t.raw(
    "landing.precio.vitalicia.includes",
  ) as string[];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <RevealObserver />
      <Nav />
      {promoActive && promoText && (
        <div
          style={{
            background:
              "linear-gradient(90deg, rgba(124,92,255,0.18), rgba(77,163,255,0.18))",
            borderBottom: "1px solid rgba(124,92,255,0.3)",
            padding: "0.6rem 1.5rem",
            textAlign: "center",
            fontSize: "0.9rem",
            color: "var(--text)",
          }}
        >
          {promoText}
          {promoCoupon && (
            <>
              {" "}
              · Código:{" "}
              <code
                style={{
                  background: "rgba(124,92,255,0.2)",
                  padding: "0.1rem 0.5rem",
                  borderRadius: "4px",
                  fontWeight: 700,
                }}
              >
                {promoCoupon}
              </code>
            </>
          )}
        </div>
      )}
      <main id="main-content">
        <Hero />

        {/* Video demo */}
        {YOUTUBE_VIDEO_ID && (
          <section id="video">
            <div className="container">
              <div className="reveal" style={{ textAlign: "center", maxWidth: "640px", margin: "0 auto 2.5rem" }}>
                <span className="eyebrow">{t("landing.video.eyebrow")}</span>
                <h2 className="section-title" style={{ marginInline: "auto" }}>
                  {t("landing.video.title")}
                </h2>
                <p className="section-lead" style={{ marginInline: "auto", marginTop: "1rem" }}>
                  {t("landing.video.lead")}
                </p>
              </div>
              <div className="reveal">
                <VideoShowcase youtubeId={YOUTUBE_VIDEO_ID} />
              </div>
            </div>
          </section>
        )}

        {/* Cómo funciona */}
        <section id="como-funciona">
          <div className="container">
            <div className="reveal">
              <span className="eyebrow">
                {t("landing.comoFunciona.eyebrow")}
              </span>
              <h2 className="section-title">
                {t("landing.comoFunciona.title")}
              </h2>
            </div>
            <div className={styles.steps}>
              {STEPS.map((s, i) => (
                <div key={s.title} className="reveal">
                  <div className={styles.stepNumber} aria-hidden="true">
                    {i + 1}
                  </div>
                  <h3 className={styles.stepTitle}>{s.title}</h3>
                  <p className={styles.stepBody}>{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Qué hace / problema */}
        <section id="que-hace">
          <div className="container">
            <div className={`${styles.split} reveal`}>
              <div>
                <span className="eyebrow">{t("landing.queHace.eyebrow")}</span>
                <h2 className="section-title">{t("landing.queHace.title")}</h2>
                <p className="section-lead">{t("landing.queHace.lead")}</p>
              </div>
              <div className={styles.compare}>
                {COMPARE.map((text, i) => (
                  <div
                    key={i}
                    className={`${styles.compareRow} ${styles[i === COMPARE.length - 1 ? "good" : "bad"]}`}
                  >
                    <span className={styles.mark}>
                      {i === COMPARE.length - 1 ? "✓" : "✕"}
                    </span>
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Características */}
        <section id="caracteristicas">
          <div className="container">
            <div className="reveal">
              <span className="eyebrow">
                {t("landing.caracteristicas.eyebrow")}
              </span>
              <h2 className="section-title">
                {t("landing.caracteristicas.title")}
              </h2>
            </div>
            {FEATURE_GROUPS.map((group) => (
              <div key={group.title} className={styles.featureGroup}>
                <span className={`${styles.featureGroupTitle} reveal`}>
                  {group.title}
                </span>
                <div className={styles.features}>
                  {group.features.map((f) => (
                    <article
                      key={f.title}
                      className={`card reveal ${f.wide ? styles.featureWide : ""}`}
                    >
                      <div className={styles.featureIcon}>
                        {f.icon === "streamdeck" ? (
                          <StreamDeckIcon size={22} />
                        ) : (
                          <FeatureIcon id={f.icon} size={22} />
                        )}
                      </div>
                      <h3 className={styles.featureTitle}>{f.title}</h3>
                      <p className={styles.featureBody}>{f.body}</p>
                      {f.link && (
                        <a
                          href={STREAM_DECK_PLUGIN_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.featureLink}
                        >
                          {f.linkLabel} →
                        </a>
                      )}
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* No estás atado a OBS */}
        <section id="independiente">
          <div className="container">
            <div
              className="reveal"
              style={{
                textAlign: "center",
                maxWidth: "640px",
                margin: "0 auto",
              }}
            >
              <span className="eyebrow">
                {t("landing.independiente.eyebrow")}
              </span>
              <h2 className="section-title" style={{ marginInline: "auto" }}>
                {t("landing.independiente.title")}
              </h2>
              <p
                className="section-lead"
                style={{ marginInline: "auto", marginTop: "1rem" }}
              >
                {t("landing.independiente.lead")}
              </p>
            </div>
          </div>
        </section>

        {/* Plataformas */}
        <section id="plataformas">
          <div className="container">
            <div className="reveal">
              <span className="eyebrow">
                {t("landing.plataformas.eyebrow")}
              </span>
              <h2 className="section-title">
                {t("landing.plataformas.title")}
              </h2>
              <p className="section-lead">
                {t.rich("landing.plataformas.lead", {
                  rtmp: (chunks) => <code>{chunks}</code>,
                  rtmps: (chunks) => <code>{chunks}</code>,
                  srt: (chunks) => <code>{chunks}</code>,
                })}
              </p>
            </div>
            <div className={styles.platforms}>
              {PLATFORMS.map((p) => (
                <div
                  key={p.id}
                  className={`${styles.platform} reveal`}
                  style={{ color: p.color }}
                >
                  <span className={styles.platformGlyph}>
                    <PlatformIcon id={p.id} size={28} />
                  </span>
                  <span
                    className={styles.platformName}
                    style={{ color: "var(--text)" }}
                  >
                    {p.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Integraciones */}
        <section id="integraciones">
          <div className="container">
            <div className={`${styles.integrationCard} reveal`}>
              <div className={styles.integrationBadge}>
                <StreamDeckIcon size={16} />
                {t("landing.integraciones.badge")}
              </div>
              <h2 className={styles.integrationTitle}>
                Muxlyve{" "}
                <span className={styles.integrationX}>
                  {t("landing.integraciones.titleX")}
                </span>{" "}
                Stream Deck
              </h2>
              <p className="section-lead" style={{ marginInline: "auto" }}>
                {t("landing.integraciones.lead")}
              </p>
              {streamDeckMockupExists && (
                <div className={styles.integrationMockup}>
                  <Image
                    src="/streamdeck-mockup.png"
                    alt={t("landing.integraciones.mockupAlt")}
                    width={1920}
                    height={960}
                  />
                </div>
              )}
              <a
                href={STREAM_DECK_PLUGIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ marginTop: "1.5rem" }}
              >
                {t("landing.integraciones.cta")}
              </a>
            </div>
          </div>
        </section>

        {/* Precio */}
        <section id="precio">
          <div className="container">
            <div
              className="reveal"
              style={{ textAlign: "center", marginBottom: "2.5rem" }}
            >
              <span className="eyebrow">{t("landing.precio.eyebrow")}</span>
              <h2 className="section-title" style={{ marginInline: "auto" }}>
                {t("landing.precio.title")}
              </h2>
              <p
                className="section-lead"
                style={{ marginInline: "auto", marginTop: "1rem" }}
              >
                {t("landing.precio.lead")}
              </p>
            </div>
            <div className={`${styles.pricingGrid} reveal`}>
              {/* Mensual */}
              {monthlyVisible && (
                <div className={styles.planCard}>
                  <span className="eyebrow">
                    {t("landing.precio.mensual.label")}
                  </span>
                  <div className={styles.amount}>
                    {fmt(priceMonthly) ? (
                      <>
                        {fmt(priceMonthly)}
                        <small>{t("landing.precio.mensual.suffix")}</small>
                      </>
                    ) : (
                      <span className={styles.amountPending}>
                        {t("landing.precio.pricePending")}
                      </span>
                    )}
                  </div>
                  <ul className={styles.includes}>
                    {mensualIncludes.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <a
                    className="btn btn-ghost"
                    href="https://checkout.freemius.com/mode/page/plugin/32832/plan/53907/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ width: "100%", justifyContent: "center" }}
                  >
                    {t("landing.precio.mensual.cta")}
                  </a>
                </div>
              )}

              {/* Anual */}
              {annualVisible && (
                <div className={styles.planCard}>
                  <div className={styles.planBadge}>
                    {t("landing.precio.anual.badge")}
                  </div>
                  <span className="eyebrow">
                    {t("landing.precio.anual.label")}
                  </span>
                  <div className={styles.amount}>
                    {fmt(priceAnnual) ? (
                      <>
                        {fmt(priceAnnual)}
                        <small>{t("landing.precio.anual.suffix")}</small>
                      </>
                    ) : (
                      <span className={styles.amountPending}>
                        {t("landing.precio.pricePending")}
                      </span>
                    )}
                  </div>
                  <ul className={styles.includes}>
                    {anualIncludes.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <a
                    className="btn btn-ghost"
                    href="https://checkout.freemius.com/mode/page/plugin/32832/plan/53907/?billing_cycle=annual"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ width: "100%", justifyContent: "center" }}
                  >
                    {t("landing.precio.anual.cta")}
                  </a>
                </div>
              )}

              {/* Vitalicia — destacada */}
              {lifetimeVisible && (
                <div className={`${styles.planCard} ${styles.planFeatured}`}>
                  <div
                    className={`${styles.planBadge} ${styles.planBadgeFeatured}`}
                  >
                    {t("landing.precio.vitalicia.badge")}
                  </div>
                  <span className="eyebrow">
                    {t("landing.precio.vitalicia.label")}
                  </span>
                  <div className={styles.amount}>
                    {fmt(priceLifetime) ? (
                      <>
                        {fmt(priceLifetime)}
                        <small> {t("landing.precio.vitalicia.suffix")}</small>
                      </>
                    ) : (
                      <span className={styles.amountPending}>
                        {t("landing.precio.pricePending")}
                      </span>
                    )}
                  </div>
                  <p className={styles.planTagline}>
                    {t("landing.precio.vitalicia.tagline")}
                  </p>
                  <ul className={styles.includes}>
                    {vitaliciaIncludes.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <a
                    className="btn btn-primary"
                    href="https://checkout.freemius.com/mode/page/plugin/32832/plan/53899/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ width: "100%", justifyContent: "center" }}
                  >
                    {t("landing.precio.vitalicia.cta")}
                  </a>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Descarga */}
        <section id="descarga">
          <div className="container">
            <div className={`${styles.cta} reveal`}>
              <h2 className="section-title" style={{ marginInline: "auto" }}>
                {t("landing.descarga.title")}
              </h2>
              <p
                className="section-lead"
                style={{
                  marginInline: "auto",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  flexWrap: "wrap",
                }}
              >
                <span>{t("landing.descarga.availableFor")}</span>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.35rem",
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M0 0h11.4v11.4H0zm12.6 0H24v11.4H12.6zM0 12.6h11.4V24H0zm12.6 0H24V24H12.6z" />
                  </svg>
                  {t("landing.descarga.windows")}
                </span>
                <span>{t("landing.descarga.and")}</span>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.35rem",
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M18.71 19.5c-.83 1.24-1.66 2.45-3 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.29-.02 2.51.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.48.26 3.65 1.84-.09.06-2.18 1.27-2.16 3.73.02 2.99 2.78 4.02 2.91 4.07-.03.09-.45 1.63-1.5 3.16zM12.75 5.09c.66-.8 1.1-1.92.98-3.04-1.12.04-2.48.74-3.27 1.67-.61.71-1.15 1.85-1.01 2.96 1.25.1 2.51-.59 3.3-1.59z" />
                  </svg>
                  {t("landing.descarga.mac")}
                </span>
              </p>
              <div style={{ marginTop: "2rem" }}>
                <Link href="/descargar" className="btn btn-primary">
                  {t("landing.descarga.cta")}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
