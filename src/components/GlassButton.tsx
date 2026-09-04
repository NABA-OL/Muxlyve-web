"use client";

/*
 * Propiedad de BlacKraken Solutions <blackraken.com>
 * Desarrollado por: NABAOL
 * Fecha de creación: 2026-08-13
 *  * Correo: nabaol.dev@gmail.com
 * Copyright (c) 2026 BlacKraken Solutions. Todos los derechos reservados.
 */
import { useRef, type PointerEvent, type ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import styles from "./GlassButton.module.css";

interface Props {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
}

export function GlassButton({ href, children, variant = "primary" }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);

  function handlePointerMove(e: PointerEvent<HTMLAnchorElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty(
      "--x",
      `${((e.clientX - rect.left) / rect.width) * 100}%`,
    );
    el.style.setProperty(
      "--y",
      `${((e.clientY - rect.top) / rect.height) * 100}%`,
    );
  }

  return (
    <Link
      ref={ref}
      href={href}
      className={`${styles.glass} ${variant === "ghost" ? styles.glassGhost : ""}`}
      onPointerMove={handlePointerMove}
    >
      {children}
    </Link>
  );
}
