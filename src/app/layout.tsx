import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { BackgroundFX } from "@/components/BackgroundFX";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://muxlyve.com";

const claim =
  "Software de multistreaming para Windows. Transmite a Twitch, Kick, YouTube y TikTok al mismo tiempo, sin marca de agua y sin pagar mensualidad. Pago único.";

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: {
    default: "Muxlyve — Multistreaming sin marca de agua",
    template: "%s | Muxlyve",
  },
  description: claim,
  keywords: [
    "multistreaming", "multistream windows", "transmitir twitch kick youtube tiktok",
    "software multistream", "multistreaming sin marca de agua", "alternativa restream",
    "multistream pago único", "transmitir varias plataformas", "OBS multistream",
  ],
  icons: { icon: "/icon-muxlyve.svg", shortcut: "/favicon.ico" },
  alternates: { canonical: BASE },
  openGraph: {
    title: "Muxlyve — Multistreaming sin marca de agua",
    description: claim,
    url: BASE,
    siteName: "Muxlyve",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Muxlyve — Multistreaming sin marca de agua" }],
    type: "website",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muxlyve — Multistreaming sin marca de agua",
    description: "Transmite a Twitch, Kick, YouTube y TikTok a la vez. Sin marca de agua. Pago único.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={inter.variable}>
      <body>
        <BackgroundFX />
        {children}
      </body>
    </html>
  );
}
