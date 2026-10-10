/*
 * Propiedad de BlacKraken Solutions <blackraken.com>
 * Desarrollado por: NABAOL
 * Fecha de creación: 2026-08-13
 *  * Correo: nabaol.dev@gmail.com
 * Copyright (c) 2026 BlacKraken Solutions. Todos los derechos reservados.
 */

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { BackgroundFX } from "@/components/BackgroundFX";
import { GlassSpotlight } from "@/components/GlassSpotlight";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://muxlyve.com";

const claim =
  "Software de multistreaming para Windows. Transmite a Twitch, Kick, YouTube, TikTok y Starvios al mismo tiempo, sin marca de agua.";

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  // Sin `template` a propósito: el layout de [locale] define el suyo. Si el raíz
  // también lo trae, el `default` del hijo lo hereda y sale "Muxlyve … | Muxlyve".
  title: "Muxlyve — Multistreaming a Twitch, Kick, YouTube, TikTok y Starvios",
  description: claim,
  keywords: [
    "multistreaming",
    "multistream windows",
    "transmitir twitch kick youtube tiktok starvios",
    "software multistream",
    "multistreaming sin marca de agua",
    "alternativa restream",
    "multistream",
    "transmitir varias plataformas",
    "OBS multistream",
    "OBS",
    "Twitch",
    "Kick",
    "YouTube",
    "TikTok",
    "Starvios",
    "Streaming",
    "Live",
    "En vivo",
  ],
  icons: { icon: "/icon-muxlyve.svg", shortcut: "/favicon.ico" },
  alternates: { canonical: BASE },
  openGraph: {
    title: "Muxlyve — Multistreaming",
    description: claim,
    url: BASE,
    siteName: "Muxlyve",
    type: "website",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muxlyve — Multistreaming",
    description:
      "Transmite a Twitch, Kick, YouTube, TikTok y Starvios a la vez. Sin marca de agua.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={inter.variable}>
      <body>
        <a href="#main-content" className="skip-link">
          Saltar al contenido
        </a>
        <BackgroundFX />
        <GlassSpotlight />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
