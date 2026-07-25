import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { RevealObserver } from "@/components/RevealObserver";
import { PlatformIcon } from "@/components/PlatformIcon";
import { StreamDeckIcon } from "@/components/StreamDeckIcon";
import { PLATFORMS } from "@/lib/platforms";
import { ensureSchema } from "@/lib/db";
import { getSetting } from "@/lib/settings";
import styles from "./page.module.css";

export const revalidate = 60;

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://muxlyve.com";

// TODO: reemplazar con la URL real cuando el plugin de Stream Deck esté publicado.
const STREAM_DECK_PLUGIN_URL = "https://marketplace.elgato.com/product/muxlyve-3bb96a31-6c46-4a52-be62-9868e624b117";

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
    "Compatible con tu app de streaming favorita",
    "Chat unificado de Twitch y Kick",
    "Overlay de chat para OBS",
    "Grabador de clips en buffer y grabación completa",
    "Programar inicio de transmisión",
    "Resumen automático del stream",
    "Acceso remoto por LAN",
    "Bilingüe español / inglés",
    "Perfiles de destinos guardados",
    "Comando !clip en el chat",
    "Avisos automáticos a Discord y Telegram",
    "Compatible con Elgato Stream Deck",
    "Reconexión automática",
    "Preview en vivo por destino",
    "Twitch, Kick, YouTube, TikTok",
  ],
};

interface Feature {
  icon: string;
  title: string;
  body: string;
  link?: string;
  linkLabel?: string;
}

interface FeatureGroup {
  title: string;
  features: Feature[];
}

const STEPS = [
  {
    title: "Conectá tu software",
    body: "Apuntá OBS, Streamlabs, XSplit, vMix, N.Air o cualquier encoder RTMP a Muxlyve como servidor de salida.",
  },
  {
    title: "Conectá tus plataformas",
    body: "Vinculá Twitch, Kick y YouTube con un clic (OAuth), o pegá tu clave de TikTok.",
  },
  {
    title: "Transmití a las 4 a la vez",
    body: "Una sola señal, sin recodificar, sin marca de agua y sin depender de un servidor ajeno.",
  },
];

const FEATURE_GROUPS: FeatureGroup[] = [
  {
    title: "Streaming",
    features: [
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
        title: "Compatible con tu app favorita",
        body: "Conéctalo como destino desde OBS, Streamlabs, XSplit, vMix, N.Air o cualquier encoder que hable RTMP. No cambias tu flujo de trabajo, solo lo multiplicas.",
      },
      {
        icon: "⏰",
        title: "Programar inicio",
        body: "Elegí destinos y hora, y Muxlyve arranca solo. No hace falta estar pendiente en el momento exacto.",
      },
      {
        icon: "📊",
        title: "Resumen del stream",
        body: "Al terminar, un resumen automático: duración, pico de espectadores por plataforma, mensajes de chat y bitrate promedio por destino.",
      },
      {
        icon: "🗂️",
        title: "Perfiles de destinos",
        body: "Guardá combinaciones de destinos prendidos (\"Solo Twitch\", \"Todo\") y aplicalas con un clic, sin tocar cada toggle a mano. Hasta 6 perfiles.",
      },
    ],
  },
  {
    title: "Chat y clips",
    features: [
      {
        icon: "💬",
        title: "Chat unificado",
        body: "Los mensajes de Twitch y Kick en un solo lugar. Respondé a ambas plataformas sin cambiar de pestaña.",
      },
      {
        icon: "🪟",
        title: "Overlay de chat para OBS",
        body: "Agregá el chat como fuente de Navegador en OBS, con fondo transparente, directo sobre tu transmisión.",
      },
      {
        icon: "🎬",
        title: "Grabador de clips y grabación completa",
        body: "Buffer circular (30s/1min/2min) para guardar lo que acaba de pasar, y grabación completa de todo el stream a un archivo — cada una con su propio switch.",
      },
      {
        icon: "✂️",
        title: "Comando !clip en el chat",
        body: "Moderadores (o vos) escriben \"!clip\" y se guarda un clip del buffer al instante, sin salir del juego.",
      },
    ],
  },
  {
    title: "Control remoto",
    features: [
      {
        icon: "🎛️",
        title: "Compatible con Stream Deck",
        body: "Prende destinos, activa el buffer y guarda clips desde botones físicos, sin tocar el teclado.",
        link: STREAM_DECK_PLUGIN_URL,
        linkLabel: "Ver plugin",
      },
      {
        icon: "📡",
        title: "Acceso remoto por LAN",
        body: "Controlá destinos, chat y Stream Deck desde otra máquina de tu red, con token de acceso seguro.",
      },
      {
        icon: "🌐",
        title: "Bilingüe español / inglés",
        body: "La interfaz detecta el idioma de tu sistema automáticamente. Se puede cambiar en cualquier momento.",
      },
      {
        icon: "🔔",
        title: "Avisos a Discord y Telegram",
        body: "Mensaje configurable que se manda solo apenas arrancás en vivo — hasta 3 webhooks de Discord y 3 bots de Telegram a la vez.",
      },
    ],
  },
];

const COMPARE = [
  { kind: "bad" as const, text: "Servicios como Restream cobran mensualidad." },
  { kind: "bad" as const, text: "Ponen su marca de agua sobre tu video en el plan gratis." },
  { kind: "bad" as const, text: "Tu transmisión depende de los servidores de un tercero." },
  { kind: "good" as const, text: "Muxlyve: Precio accesible, sin marca de agua, desde tu propio PC." },
];

export default async function Home() {
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

        {/* Cómo funciona */}
        <section id="como-funciona">
          <div className="container">
            <div className="reveal">
              <span className="eyebrow">Cómo funciona</span>
              <h2 className="section-title">
                Tres pasos, sin complicarte.
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
                <span className="eyebrow">El problema</span>
                <h2 className="section-title">
                  Multistreaming.
                </h2>
                <p className="section-lead">
                  Llegar a Twitch, Kick, YouTube y TikTok a la vez normalmente
                  significa pagar un servicio que pone su logo sobre tu video.
                  Muxlyve lo hace desde tu equipo, limpio y seguro.
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
            {FEATURE_GROUPS.map((group) => (
              <div key={group.title} className={styles.featureGroup}>
                <span className={`${styles.featureGroupTitle} reveal`}>
                  {group.title}
                </span>
                <div className={styles.features}>
                  {group.features.map((f) => (
                    <article key={f.title} className="card reveal">
                      <div className={styles.featureIcon} aria-hidden="true">
                        {f.icon}
                      </div>
                      <h3 className={styles.featureTitle}>{f.title}</h3>
                      <p className={styles.featureBody}>{f.body}</p>
                      {f.link && (
                        <a
                          href={f.link}
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
              style={{ textAlign: "center", maxWidth: "640px", margin: "0 auto" }}
            >
              <span className="eyebrow">No estás atado a OBS</span>
              <h2 className="section-title" style={{ marginInline: "auto" }}>
                Tu propia estación de restreaming, no un plugin.
              </h2>
              <p
                className="section-lead"
                style={{ marginInline: "auto", marginTop: "1rem" }}
              >
                Los plugins dentro de OBS dependen de que OBS esté corriendo y
                de lo que OBS permita. Muxlyve es una app aparte: recibe
                cualquier señal RTMP — de OBS, Streamlabs, XSplit, vMix, N.Air
                o un encoder de hardware — y la reenvía sin recodificar.
                Controlá todo, incluso desde otra máquina de tu red.
              </p>
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

        {/* Integraciones */}
        <section id="integraciones">
          <div className="container">
            <div className={`${styles.integrationCard} reveal`}>
              <div className={styles.integrationBadge}>
                <StreamDeckIcon size={16} />
                Funciona con Stream Deck
              </div>
              <h2 className={styles.integrationTitle}>
                Muxlyve <span className={styles.integrationX}>×</span> Stream
                Deck
              </h2>
              <p className="section-lead" style={{ marginInline: "auto" }}>
                Controlá tus destinos en vivo, activá el buffer y guardá
                clips desde botones físicos, sin tocar el teclado.
              </p>
              {streamDeckMockupExists && (
                <div className={styles.integrationMockup}>
                  {/* eslint-disable-next-line @next/next/no-img-element -- mockup con transparencia provisto por el usuario, dimensiones reales desconocidas */}
                  <img
                    src="/streamdeck-mockup.png"
                    alt="Stream Deck con los accesos directos de Muxlyve"
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
                Ver plugin
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
