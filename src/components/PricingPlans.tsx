/*
 * Propiedad de BlacKraken Solutions
 * Desarrollado por: NABAOL
 * Fecha de creación: 2026-09-03
 */

import { getTranslations } from "next-intl/server";
import { ensureSchema } from "@/lib/db";
import { getSetting } from "@/lib/settings";
import styles from "@/app/[locale]/page.module.css";

/**
 * Tarjetas de planes. Compartido entre la sección #precio de la home y la
 * página dedicada /precio — así el precio vive en un solo lugar.
 */
export async function PricingPlans() {
  const t = await getTranslations();

  let priceMonthly = "";
  let priceAnnual = "";
  let priceLifetime = "";
  let monthlyVisible = true;
  let annualVisible = true;
  let lifetimeVisible = true;
  try {
    await ensureSchema();
    const settings = await Promise.all([
      getSetting("price_monthly"),
      getSetting("price_annual"),
      getSetting("price_lifetime"),
      getSetting("plan_monthly_visible", "true"),
      getSetting("plan_annual_visible", "true"),
      getSetting("plan_lifetime_visible", "true"),
    ]);
    [priceMonthly, priceAnnual, priceLifetime] = settings;
    monthlyVisible = settings[3] !== "false";
    annualVisible = settings[4] !== "false";
    lifetimeVisible = settings[5] !== "false";
  } catch {
    // DB no disponible — se muestran los placeholders
  }

  function fmt(v: string) {
    return v ? `$${v}` : null;
  }

  const mensualIncludes = t.raw("landing.precio.mensual.includes") as string[];
  const anualIncludes = t.raw("landing.precio.anual.includes") as string[];
  const vitaliciaIncludes = t.raw(
    "landing.precio.vitalicia.includes",
  ) as string[];

  return (
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
  );
}
