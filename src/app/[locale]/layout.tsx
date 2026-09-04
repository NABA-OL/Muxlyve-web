/*
 * Propiedad de BlacKraken Solutions <blackraken.com>
 * Desarrollado por: NABAOL
 * Fecha de creación: 2026-08-13
 *  * Correo: nabaol.dev@gmail.com
 * Copyright (c) 2026 BlacKraken Solutions. Todos los derechos reservados.
 */

import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { LocaleHtmlSync } from "@/components/LocaleHtmlSync";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://muxlyve.com";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

function localePath(locale: Locale, path: string) {
  return locale === routing.defaultLocale ? path : `/${locale}${path}`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  const languages: Record<string, string> = {};
  for (const l of routing.locales) {
    languages[l] = `${BASE}${localePath(l, "/")}`;
  }
  languages["x-default"] = `${BASE}/`;

  return {
    title: { default: t("title"), template: "%s | Muxlyve" },
    description: t("description"),
    alternates: {
      canonical: localePath(locale as Locale, "/"),
      languages,
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: localePath(locale as Locale, "/"),
      siteName: "Muxlyve",
      type: "website",
      locale,
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("twitterDescription"),
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <NextIntlClientProvider>
      <LocaleHtmlSync locale={locale} />
      {children}
    </NextIntlClientProvider>
  );
}
