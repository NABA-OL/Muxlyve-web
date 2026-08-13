"use client";

/*
 * Propiedad de BlacKraken Solutions
 * Desarrollado por: NABAOL
 * Fecha de creación: 2026-08-13
 *  * Correo: nabaol.dev@gmail.com
 * Copyright (c) 2026 BlacKraken Solutions. Todos los derechos reservados.
 */
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const tLang = useTranslations("languages");
  const tFooter = useTranslations("footer");

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    router.replace(pathname, { locale: e.target.value });
  }

  return (
    <label className="footer-lang">
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="M11 3a13 13 0 0 1 0 16M11 3a13 13 0 0 0 0 16M3.5 8h15M3.5 14h15" />
      </svg>
      <span className="visually-hidden">{tFooter("languageLabel")}</span>
      <select
        value={locale}
        onChange={handleChange}
        aria-label={tFooter("languageLabel")}
        className="footer-lang-select"
      >
        {routing.locales.map((l) => (
          <option key={l} value={l}>
            {tLang(l)}
          </option>
        ))}
      </select>
    </label>
  );
}
