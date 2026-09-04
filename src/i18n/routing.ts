/*
 * Propiedad de BlacKraken Solutions <blackraken.com>
 * Desarrollado por: NABAOL
 * Fecha de creación: 2026-08-13
 *  * Correo: nabaol.dev@gmail.com
 * Copyright (c) 2026 BlacKraken Solutions. Todos los derechos reservados.
 */

import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["es", "en", "pt", "fr"],
  defaultLocale: "es",
  localePrefix: "as-needed",
  // Sin detección automática por Accept-Language: con ella, el middleware escribe
  // la cookie NEXT_LOCALE en cada request y Vercel marca la respuesta como
  // `private, no-store` — cero caché de CDN, ~500ms de TTFB y una invocación de
  // función por visita. El idioma se elige con el selector del footer.
  // Google además desaconseja redirigir por Accept-Language (bloquea el rastreo
  // de las demás versiones de idioma).
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
