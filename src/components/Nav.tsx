"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

function WordmarkLogo() {
  return (
    <span className="nav-wordmark" style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem" }}>
      <Image src="/icon-muxlyve.svg" alt="" width={28} height={28} priority />
      Muxlyve
    </span>
  );
}

export function Nav() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const homePrefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  const LINKS = [
    { href: `${homePrefix}/#que-hace`, label: t("inicio") },
    { href: `${homePrefix}/#caracteristicas`, label: t("caracteristicas") },
    { href: `${homePrefix}/demo`, label: t("demo") },
    { href: `${homePrefix}/#precio`, label: t("precio") },
    { href: `${homePrefix}/ayuda`, label: t("ayuda") },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;

    function closeOnEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileOpen(false);
    }
    function closeOnResize() {
      if (window.innerWidth > 680) setMobileOpen(false);
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    window.addEventListener("resize", closeOnResize);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("resize", closeOnResize);
    };
  }, [mobileOpen]);

  return (
    <nav className="nav" data-scrolled={scrolled}>
      <div className="container nav-inner">
        <Link href="/" className="nav-logo" aria-label={t("home")}>
          <WordmarkLogo />
        </Link>
        <div className="nav-links">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
          <Link href="/descargar" className="btn btn-primary">
            {t("descargar")}
          </Link>
        </div>
        <button
          type="button"
          className="nav-toggle"
          aria-label={mobileOpen ? t("closeMenu") : t("openMenu")}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            {mobileOpen ? (
              <>
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      <div
        className="nav-mobile-backdrop"
        data-open={mobileOpen}
        aria-hidden="true"
        onClick={() => setMobileOpen(false)}
      />

      <div className="nav-mobile-menu" data-open={mobileOpen} inert={!mobileOpen}>
        <div className="nav-mobile-menu-inner">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)}>
              {l.label}
            </a>
          ))}
          <Link
            href="/descargar"
            className="btn btn-primary"
            onClick={() => setMobileOpen(false)}
          >
            {t("descargar")}
          </Link>
        </div>
      </div>
    </nav>
  );
}
