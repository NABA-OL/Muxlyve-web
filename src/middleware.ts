import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

export async function middleware(req: NextRequest) {
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

export const config = {
  matcher: ["/admin/:path*"],
};
