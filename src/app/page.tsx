import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { RevealObserver } from "@/components/RevealObserver";
import { PlatformIcon } from "@/components/PlatformIcon";
import { PLATFORMS } from "@/lib/platforms";
import { ensureSchema } from "@/lib/db";
import { getSetting } from "@/lib/settings";
import styles from "./page.module.css";

export const revalidate = 60;

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://muxlyve.com";

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
    { "@type": "Offer", name: "Mensual", priceCurrency: "USD", priceSpecification: { "@type": "UnitPriceSpecification", priceType: "https://schema.org/RecurringCharge", billingIncrement: 1 } },
    { "@type": "Offer", name: "Anual", priceCurrency: "USD", priceSpecification: { "@type": "UnitPriceSpecification", priceType: "https://schema.org/RecurringCharge", billingIncrement: 12 } },
    { "@type": "Offer", name: "Vitalicia", priceCurrency: "USD", priceSpecification: { "@type": "UnitPriceSpecification", priceType: "https://schema.org/OneTimePurchase" } },
  ],
  featureList: [
    "Multistreaming sin marca de agua",
    "Compatible con OBS",
    "Reconexión automática",
    "Preview en vivo por destino",
    "Twitch, Kick, YouTube, TikTok",
  ],
};

const FEATURES = [
  {
    icon: "🚫",
    title: "Sin marca de agua",
    body: "Tu transmisión sale limpia a cada plataforma. Nada de logos de terceros encima de tu contenido.",
  },
  {
    icon: "🖥️",
    title: "Corre en tu máquina",
    body: "El video se reparte desde tu PC, no por un servidor intermediario. Más privacidad y cero mensualidad por ancho de banda.",
  },
  {
    icon: "🔁",
    title: "Reconexión automática",
    body: "Si una plataforma se cae, Muxlyve la reconecta sola sin cortar el resto de tus destinos.",
  },
  {
    icon: "👁️",
    title: "Preview en vivo",
    body: "Mira exactamente lo que está saliendo a cada destino antes y durante la transmisión.",
  },
  {
    icon: "💸",
    title: "Pagos accequibles",
    body: "Pagos accequibles, sin cobros por horas transmitidas.",
  },
  {
    icon: "⚙️",
    title: "Compatible con OBS",
    body: "Conéctalo como destino de tu OBS habitual. No cambias tu flujo de trabajo, solo lo multiplicas.",
  },
];

const COMPARE = [
  { kind: "bad" as const, text: "Servicios como Restream cobran mensualidad." },
  { kind: "bad" as const, text: "Ponen su marca de agua sobre tu video en el plan gratis." },
  { kind: "bad" as const, text: "Tu transmisión depende de los servidores de un tercero." },
  { kind: "good" as const, text: "Muxlyve: un pago, sin marca de agua, desde tu propio PC." },
];

export default async function Home() {
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
    return v ? `$${v}` : "$—";
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <RevealObserver />
      <Nav />
      {promoActive && promoText && (
        <div style={{
          background: "linear-gradient(90deg, rgba(124,92,255,0.18), rgba(77,163,255,0.18))",
          borderBottom: "1px solid rgba(124,92,255,0.3)",
          padding: "0.6rem 1.5rem",
          textAlign: "center",
          fontSize: "0.9rem",
          color: "var(--text)",
        }}>
          {promoText}
          {promoCoupon && (
            <> · Código: <code style={{ background: "rgba(124,92,255,0.2)", padding: "0.1rem 0.5rem", borderRadius: "4px", fontWeight: 700 }}>{promoCoupon}</code></>
          )}
        </div>
      )}
      <main>
        <Hero />

        {/* Qué hace / problema */}
        <section id="que-hace">
          <div className="container">
            <div className={`${styles.split} reveal`}>
              <div>
                <span className="eyebrow">El problema</span>
                <h2 className="section-title">
                  Multistreaming sin pagar una mensualidad ni regalar tu marca.
                </h2>
                <p className="section-lead">
                  Llegar a Twitch, Kick, YouTube y TikTok a la vez normalmente
                  significa pagar un servicio que pone su logo sobre tu video.
                  Muxlyve lo hace desde tu equipo, limpio y de una sola
                  compra.
                </p>
              </div>
              <div className={styles.compare}>
                {COMPARE.map((row, i) => (
                  <div
                    key={i}
                    className={`${styles.compareRow} ${styles[row.kind]}`}
                  >
                    <span className={styles.mark}>
                      {row.kind === "bad" ? "✕" : "✓"}
                    </span>
                    <span>{row.text}</span>
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
              <span className="eyebrow">Características</span>
              <h2 className="section-title">
                Todo lo necesario para transmitir en serio.
              </h2>
            </div>
            <div className={styles.features}>
              {FEATURES.map((f) => (
                <article key={f.title} className="card reveal">
                  <div className={styles.featureIcon} aria-hidden="true">
                    {f.icon}
                  </div>
                  <h3 className={styles.featureTitle}>{f.title}</h3>
                  <p className={styles.featureBody}>{f.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Plataformas */}
        <section id="plataformas">
          <div className="container">
            <div className="reveal">
              <span className="eyebrow">Plataformas</span>
              <h2 className="section-title">
                Cuatro destinos, una sola transmisión.
              </h2>
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

        {/* Precio */}
        <section id="precio">
          <div className="container">
            <div
              className="reveal"
              style={{ textAlign: "center", marginBottom: "2.5rem" }}
            >
              <span className="eyebrow">Precio</span>
              <h2 className="section-title" style={{ marginInline: "auto" }}>
                Elige tu plan. Mensual, anual o de por vida.
              </h2>
              <p
                className="section-lead"
                style={{ marginInline: "auto", marginTop: "1rem" }}
              >
                Todos los planes incluyen transmisión sin marca de agua a las 4
                plataformas.
              </p>
            </div>
            <div className={`${styles.pricingGrid} reveal`}>
              {/* Mensual */}
              {monthlyVisible && <div className={styles.planCard}>
                <span className="eyebrow">Mensual</span>
                <div className={styles.amount}>
                  {fmt(priceMonthly)}<small>/mes</small>
                </div>
                <ul className={styles.includes}>
                  <li>Transmisión a 2 plataformas</li>
                  <li>Sin marca de agua</li>
                  <li>1 equipo activo</li>
                  <li>Soporte por correo</li>
                </ul>
                <a
                  className="btn btn-ghost"
                  href="https://checkout.freemius.com/mode/page/plugin/32832/plan/53907/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  Suscribirse mensual
                </a>
              </div>}

              {/* Anual */}
              {annualVisible && <div className={styles.planCard}>
                <div className={styles.planBadge}>2 meses gratis</div>
                <span className="eyebrow">Anual</span>
                <div className={styles.amount}>
                  {fmt(priceAnnual)}<small>/año</small>
                </div>
                <ul className={styles.includes}>
                  <li>Transmisión a 3 plataformas</li>
                  <li>Sin marca de agua</li>
                  <li>1 equipo activo</li>
                  <li>Soporte por correo</li>
                </ul>
                <a
                  className="btn btn-ghost"
                  href="https://checkout.freemius.com/mode/page/plugin/32832/plan/53907/?billing_cycle=annual"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  Suscribirse anual
                </a>
              </div>}

              {/* Vitalicia — destacada */}
              {lifetimeVisible && <div className={`${styles.planCard} ${styles.planFeatured}`}>
                <div className={`${styles.planBadge} ${styles.planBadgeFeatured}`}>
                  Mejor valor
                </div>
                <span className="eyebrow">Vitalicia</span>
                <div className={styles.amount}>
                  {fmt(priceLifetime)}<small> / pago único</small>
                </div>
                <p className={styles.planTagline}>
                  Deja de pagar mensualidades para siempre.
                </p>
                <ul className={styles.includes}>
                  <li>Transmisión a todas las plataformas</li>
                  <li>Sin marca de agua</li>
                  <li>Hasta 2 equipos activos</li>
                  <li>Soporte prioritario</li>
                </ul>
                <a
                  className="btn btn-primary"
                  href="https://checkout.freemius.com/mode/page/plugin/32832/plan/53899/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  Comprar licencia vitalicia
                </a>
              </div>}
            </div>
          </div>
        </section>

        {/* Descarga */}
        <section id="descarga">
          <div className="container">
            <div className={`${styles.cta} reveal`}>
              <h2 className="section-title" style={{ marginInline: "auto" }}>
                Descárgalo y empieza a transmitir hoy.
              </h2>
              <p className="section-lead" style={{ marginInline: "auto" }}>
                Disponible para Windows. Mac próximamente.
              </p>
              <div style={{ marginTop: "2rem" }}>
                <Link href="/descargar" className="btn btn-primary">
                  Ir a la descarga
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
