/*
 * Propiedad de BlacKraken Solutions
 * Desarrollado por: NABAOL
 * Fecha de creación: 2026-08-13
 */
"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import styles from "@/app/[locale]/ayuda/ayuda.module.css";

export function ShareButton({ title }: { title: string }) {
  const t = useTranslations("help");
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        // usuario canceló el share nativo — no hacer nada
      }
      return;
    }
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      className={styles.shareButton}
      onClick={handleShare}
      aria-label={t("shareLabel")}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <line x1="8.6" y1="10.6" x2="15.4" y2="6.4" />
        <line x1="8.6" y1="13.4" x2="15.4" y2="17.6" />
      </svg>
      {copied ? t("shareCopied") : t("shareLabel")}
    </button>
  );
}
