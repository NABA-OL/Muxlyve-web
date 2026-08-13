/*
 * Propiedad de BlacKraken Solutions
 * Desarrollado por: NABAOL
 * Fecha de creación: 2026-08-13
 */

import type { Metadata } from "next";
import { Inter } from "next/font/google";
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
  "Software de multistreaming para Windows. Transmite a Twitch, Kick, YouTube y TikTok al mismo tiempo, sin marca de agua.";

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: {
    default: "Muxlyve — Multistreaming",
    template: "%s | Muxlyve",
  },
  description: claim,
  keywords: [
    "multistreaming", "multistream windows", "transmitir twitch kick youtube tiktok",
    "software multistream", "multistreaming sin marca de agua", "alternativa restream",
    "multistream", "transmitir varias plataformas", "OBS multistream", "OBS",
    "Twitch", "Kick", "YouTube", "TikTok", "Streaming", "Live", "En vivo"
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
    description: "Transmite a Twitch, Kick, YouTube y TikTok a la vez. Sin marca de agua.",
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
      </body>
    </html>
  );
}
