"use client";
import { useEffect, useState } from "react";

interface Props {
  src: string;
  alt: string;
}

export function ZoomableImage({ src, alt }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent): void {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Ampliar captura: ${alt}`}
        style={{
          display: "block",
          width: "100%",
          padding: 0,
          border: "1px solid var(--border)",
          borderRadius: "var(--radius)",
          overflow: "hidden",
          margin: "1.5rem 0",
          background: "none",
          cursor: "zoom-in",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- dimensiones reales desconocidas hasta que el usuario sube la captura */}
        <img
          src={src}
          alt={alt}
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(13,17,23,0.92)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
            zIndex: 100,
            cursor: "zoom-out",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              borderRadius: "var(--radius)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
            }}
          />
        </div>
      )}
    </>
  );
}
