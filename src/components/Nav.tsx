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
        <span className={`nav-li${open ? " nav-li--open" : ""}`}>&nbsp;Li</span>
        ve
      </span>
    </span>
  );
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
      </div>
    </nav>
  );
}
