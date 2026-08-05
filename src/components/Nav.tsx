"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const LINKS = [
  { href: "/#que-hace", label: "Inicio" },
  { href: "/#caracteristicas", label: "Características" },
  { href: "/#precio", label: "Precio" },
  { href: "/ayuda", label: "Ayuda" },
];

function WordmarkLogo() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let t: ReturnType<typeof setTimeout>;

    function cycle() {
      // wait 1.5-4s, then expand
      t = setTimeout(() => {
        setOpen(true);
        // hold 2.8s, then collapse and reschedule
        t = setTimeout(() => {
          setOpen(false);
          cycle();
        }, 2800);
      }, 1500 + Math.random() * 2500);
    }

    cycle();
    return () => clearTimeout(t);
  }, []);

  return (
    <span className="nav-wordmark" aria-label="Muxlyve" style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem" }}>
      <Image src="/icon-muxlyve.svg" alt="" width={28} height={28} priority />
      <span aria-hidden="true" style={{ display: "inline-flex", alignItems: "center" }}>
        Muxly
        <span className={`nav-li${open ? " nav-li--open" : ""}`}>
          <span>&nbsp;Li</span>
        </span>
        ve
      </span>
    </span>
  );
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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
        <Link href="/" className="nav-logo" aria-label="Muxlyve inicio">
          <WordmarkLogo />
        </Link>
        <div className="nav-links">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
          <Link href="/descargar" className="btn btn-primary">
            Descargar
          </Link>
        </div>
        <button
          type="button"
          className="nav-toggle"
          aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
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
            Descargar
          </Link>
        </div>
      </div>
    </nav>
  );
}
