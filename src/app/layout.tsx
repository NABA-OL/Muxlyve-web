import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { BackgroundFX } from "@/components/BackgroundFX";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const claim =
  "Transmite a Twitch, Kick, YouTube y TikTok a la vez. Sin marca de agua. Desde tu PC.";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: "Muxlyve — Multistreaming sin marca de agua",
  description: claim,
  icons: { icon: "/icon-muxlyve.svg", shortcut: "/favicon-muxlyve.ico" },
  openGraph: {
    title: "Muxlyve",
    description: claim,
    images: ["/icon-muxlyve.svg"],
    type: "website",
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
