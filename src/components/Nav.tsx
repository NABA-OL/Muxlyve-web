"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const LINKS = [
  { href: "#que-hace", label: "Inicio" },
  { href: "#caracteristicas", label: "Características" },
  { href: "#precio", label: "Precio" },
];

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
          <Image src="/logo-muxlyve.svg" alt="Muxlyve" width={140} height={37} priority />
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
