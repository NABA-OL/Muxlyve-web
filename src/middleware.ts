/*
 * Propiedad de BlacKraken Solutions
 * Desarrollado por: NABAOL
 * Fecha de creación: 2026-08-13
 *  * Correo: nabaol.dev@gmail.com
 * Copyright (c) 2026 BlacKraken Solutions. Todos los derechos reservados.
 */

import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

const intlMiddleware = createIntlMiddleware(routing);

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
  return intlMiddleware(req);
}

export const config = {
  matcher: ["/admin/:path*", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
