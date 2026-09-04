/*
 * Propiedad de BlacKraken Solutions <blackraken.com>
 * Desarrollado por: NABAOL
 * Fecha de creación: 2026-08-13
 *  * Correo: nabaol.dev@gmail.com
 * Copyright (c) 2026 BlacKraken Solutions. Todos los derechos reservados.
 */

import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";
import { preferredType, appendVaryAccept } from "@/lib/markdown-negotiation";
import {
  buildHomeMarkdown,
  buildAboutMarkdown,
  buildContactMarkdown,
  buildPrivacyMarkdown,
} from "@/lib/page-markdown";

const intlMiddleware = createIntlMiddleware(routing);

// Rutas raíz (sin prefijo de locale) que también se pueden servir como
// text/markdown vía negociado de Accept (acceptmarkdown.com/recipes/nextjs).
// El middleware arma y devuelve el markdown directo (sin rewrite a una route
// aparte): un NextResponse.rewrite() desde middleware hacia un Route Handler
// se resuelve 404 en Next 16 + Turbopack dev — confirmado en local, rewrite
// hacia otra page.tsx sí funciona, hacia route.ts no. Devolver la Response
// directo desde acá evita el problema por completo.
const MARKDOWN_BUILDERS: Record<string, () => string> = {
  "/": buildHomeMarkdown,
  "/about": buildAboutMarkdown,
  "/contact": buildContactMarkdown,
  "/privacy": buildPrivacyMarkdown,
};

// De estas, solo "/" vive dentro del sistema de rutas de next-intl (necesita
// su detección/redirect de locale). /about, /contact y /privacy son páginas
// raíz fijas fuera de [locale] — pasarlas por intlMiddleware las reescribiría
// a /es/about (que no existe bajo [locale]) y devolvería 404.
const ROOT_ALIAS_PATHS = new Set(["/about", "/contact", "/privacy"]);

// Rutas de imagen (convención de metadata de Next.js) que viven dentro de
// [locale] solo para heredar el segmento de la home — no deben pasar por el
// middleware de next-intl, que redirigiría /es/opengraph-image (locale por
// defecto explícito) a /opengraph-image y rompería la URL que ya quedó
// embebida en el <meta property="og:image">.
function isMetadataImageRoute(pathname: string): boolean {
  return /\/(opengraph-image|twitter-image)$/.test(pathname);
}

function markdownResponse(build: () => string): NextResponse {
  const res = new NextResponse(build(), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=86400",
    },
  });
  appendVaryAccept(res.headers);
  return res;
}

function notAcceptable(): NextResponse {
  return new NextResponse(
    "Not Acceptable\n\nAvailable: text/html, text/markdown\n",
    {
      status: 406,
      headers: { "Content-Type": "text/plain; charset=utf-8", Vary: "Accept" },
    },
  );
}

/**
 * next-intl escribe `NEXT_LOCALE` en cada respuesta. Con `Set-Cookie` presente,
 * Vercel marca la respuesta como `private, no-store`: cero caché de CDN, ~500ms
 * de TTFB y una invocación de función por visita. Con `localeDetection: false`
 * la cookie ya no decide nada (manda la URL) y el selector de idioma navega por
 * ruta, así que se puede quitar sin cambiar comportamiento.
 */
function stripLocaleCookie(res: NextResponse): NextResponse {
  res.headers.delete("set-cookie");
  return res;
}

function contentMiddleware(req: NextRequest): NextResponse {
  const { pathname } = req.nextUrl;

  if (isMetadataImageRoute(pathname)) {
    return NextResponse.next();
  }

  // URL explícita en .md (la que referenciaría un <link rel="alternate">):
  // siempre markdown, sin importar el Accept header.
  if (pathname.endsWith(".md")) {
    const bare = pathname.slice(0, -3) || "/";
    const build = MARKDOWN_BUILDERS[bare];
    if (build) return markdownResponse(build);
    return new NextResponse("Not found", { status: 404 });
  }

  const build = MARKDOWN_BUILDERS[pathname];
  if (build) {
    const accept = req.headers.get("accept");
    const chosen = preferredType(accept, ["text/html", "text/markdown"]);

    if (chosen === "text/markdown") {
      return markdownResponse(build);
    }
    if (chosen === null && accept) {
      return notAcceptable();
    }

    if (ROOT_ALIAS_PATHS.has(pathname)) {
      const res = NextResponse.next();
      appendVaryAccept(res.headers);
      return res;
    }

    const res = stripLocaleCookie(intlMiddleware(req));
    appendVaryAccept(res.headers);
    return res;
  }

  return stripLocaleCookie(intlMiddleware(req));
}

async function adminMiddleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname === "/admin/login") return NextResponse.next();

  const session = req.cookies.get("admin_session")?.value;
  if (!session) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  const dbUrl = process.env.DATABASE_URL;
  if (dbUrl) {
    try {
      const sql = neon(dbUrl);
      const rows = await sql`
        SELECT value FROM settings WHERE key = 'admin_session_token' LIMIT 1
      `;
      const valid = (rows[0] as { value: string } | undefined)?.value;
      if (valid && session === valid) return NextResponse.next();
      return NextResponse.redirect(new URL("/admin/login", req.url));
    } catch {
      // DB unavailable — fall through to env fallback
    }
  }

  // Fallback for local dev without DB
  const envToken = process.env.ADMIN_TOKEN;
  if (!envToken || session !== envToken) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }
  return NextResponse.next();
}

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/admin")) {
    return adminMiddleware(req);
  }
  return contentMiddleware(req);
}

export const config = {
  // El segundo patrón deja pasar todo excepto api/_next/_vercel y archivos
  // con extensión — salvo ".md", que sí debe llegar al middleware para el
  // negociado de markdown (ver contentMiddleware).
  matcher: [
    "/admin/:path*",
    "/((?!api|_next|_vercel|.*\\.(?!md$).*).*)",
  ],
};
