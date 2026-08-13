/*
 * Propiedad de BlacKraken Solutions
 * Desarrollado por: NABAOL
 * Fecha de creación: 2026-08-13
 *  * Correo: nabaol.dev@gmail.com
 * Copyright (c) 2026 BlacKraken Solutions. Todos los derechos reservados.
 */

import { ImageResponse } from "next/og";

export const ogImageSize = { width: 1200, height: 630 };
export const ogImageContentType = "image/png";
export const ogImageAlt = "Muxlyve — Multistreaming";

export function renderOgImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        background: "#0d1117",
        backgroundImage:
          "radial-gradient(circle at 15% 15%, rgba(124,92,255,0.35), transparent 45%), radial-gradient(circle at 85% 85%, rgba(77,163,255,0.3), transparent 45%)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 18,
          fontSize: 42,
          fontWeight: 700,
          color: "#e6edf3",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 54,
            height: 54,
            borderRadius: 14,
            background: "linear-gradient(120deg, #7c5cff, #4da3ff)",
          }}
        />
        Muxlyve
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 40,
          fontSize: 64,
          fontWeight: 700,
          lineHeight: 1.15,
          color: "#e6edf3",
          maxWidth: 980,
        }}
      >
        Multistreaming sin marca de agua
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 28,
          fontSize: 30,
          color: "#8b949e",
          maxWidth: 880,
        }}
      >
        Transmite a Twitch, Kick, YouTube y TikTok al mismo tiempo
      </div>
    </div>,
    { ...ogImageSize },
  );
}
