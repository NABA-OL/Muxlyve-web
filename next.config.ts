/*
 * Propiedad de BlacKraken Solutions <blackraken.com>
 * Desarrollado por: NABAOL
 * Fecha de creación: 2026-08-13
 *  * Correo: nabaol.dev@gmail.com
 * Copyright (c) 2026 BlacKraken Solutions. Todos los derechos reservados.
 */

import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const RENAMED_ARTICLE_SLUGS: Array<[string, string]> = [
  ["grabador-de-clips", "grabador-clips"],
  ["perfiles-de-destinos", "perfiles-destinos"],
  ["resumen-del-stream", "resumen-stream"],
  ["bandeja-del-sistema", "bandeja-sistema"],
  ["acerca-de-muxlyve", "acerca-muxlyve"],
];

const LOCALE_PREFIXES = ["", "/en", "/pt", "/fr"];

const nextConfig: NextConfig = {
  redirects: async () =>
    RENAMED_ARTICLE_SLUGS.flatMap(([from, to]) =>
      LOCALE_PREFIXES.map((prefix) => ({
        source: `${prefix}/ayuda/${from}`,
        destination: `${prefix}/ayuda/${to}`,
        permanent: true,
      })),
    ),
  headers: async () => [
    { source: "/(.*)", headers: securityHeaders },
    // el panel de la demo va embebido en <iframe> dentro de /demo (mismo
    // origen) — DENY global lo bloquearía por completo
    {
      source: "/demo/:path*",
      headers: [{ key: "X-Frame-Options", value: "SAMEORIGIN" }],
    },
  ],
};

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

export default withNextIntl(nextConfig);
