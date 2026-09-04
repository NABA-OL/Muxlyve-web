"use client";

/*
 * Propiedad de BlacKraken Solutions <blackraken.com>
 * Desarrollado por: NABAOL
 * Fecha de creación: 2026-08-13
 *  * Correo: nabaol.dev@gmail.com
 * Copyright (c) 2026 BlacKraken Solutions. Todos los derechos reservados.
 */
import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { Link } from "@/i18n/navigation";
import { HELP_ARTICLES } from "@/lib/help-articles";
import { HelpSearchPalette } from "./HelpSearchPalette";
import styles from "@/app/[locale]/ayuda/ayuda.module.css";

export function AyudaSidebar() {
  const pathname = usePathname();
  const t = useTranslations("help");

  return (
    <nav className={styles.sidebar} aria-label={t("sidebarAria")}>
      <span className={styles.sidebarEyebrow}>{t("eyebrow")}</span>
      <HelpSearchPalette />
      <ul className={styles.sidebarList}>
        {HELP_ARTICLES.map((a) => {
          const href = `/ayuda/${a.slug}`;
          const active = pathname === href;
          return (
            <li key={a.slug}>
              <Link
                href={href}
                className={`${styles.sidebarLink} ${active ? styles.sidebarLinkActive : ""}`}
              >
                {t(`articles.${a.slug}.title`)}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
