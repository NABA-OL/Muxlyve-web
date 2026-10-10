/*
 * Propiedad de BlacKraken Solutions
 * Desarrollado por: NABAOL
 * Fecha de creación: 2026-10-10
 * Correo: nabaol.dev@gmail.com
 * Copyright (c) 2026 BlacKraken Solutions. Todos los derechos reservados.
 */

import { timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getSessionToken } from "./admin-auth";

export const ADMIN_SESSION_COOKIE = "admin_session";
export const ADMIN_LOGIN_PATH = "/admin/login";

function safeEqual(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

async function hasValidAdminSession(): Promise<boolean> {
  const jar = await cookies();
  const session = jar.get(ADMIN_SESSION_COOKIE)?.value;
  if (!session) return false;

  const storedToken = await getSessionToken();
  if (storedToken) return safeEqual(session, storedToken);

  // Misma regla que el middleware: sin token en BD (o BD caída) se acepta ADMIN_TOKEN.
  const envToken = process.env.ADMIN_TOKEN;
  return Boolean(envToken) && safeEqual(session, envToken as string);
}

/**
 * Segunda barrera de /admin, independiente del middleware: cada página y
 * server action la llama primero, así un fallo del middleware no abre el panel.
 */
export async function requireAdmin(): Promise<void> {
  if (!(await hasValidAdminSession())) redirect(ADMIN_LOGIN_PATH);
}
