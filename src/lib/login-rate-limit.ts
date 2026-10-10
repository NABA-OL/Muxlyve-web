/*
 * Propiedad de BlacKraken Solutions
 * Desarrollado por: NABAOL
 * Fecha de creación: 2026-10-10
 * Correo: nabaol.dev@gmail.com
 * Copyright (c) 2026 BlacKraken Solutions. Todos los derechos reservados.
 */

import { headers } from "next/headers";
import { ensureSchema, getDb } from "./db";

export const MAX_FAILED_LOGINS = 5;
const WINDOW_MINUTES = 15;
const RETENTION_DAYS = 1;

export async function getClientIp(): Promise<string> {
  const h = await headers();
  return (
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    h.get("x-real-ip") ??
    "unknown"
  );
}

// Si la BD falla no se puede contar: se deja pasar, pero se registra el error
// (no es silencioso) y la contraseña sigue siendo la barrera principal.
export async function isLoginBlocked(ip: string): Promise<boolean> {
  try {
    await ensureSchema();
    const sql = getDb();
    const [row] = await sql`
      SELECT COUNT(*)::int AS cnt FROM login_attempts
      WHERE ip = ${ip} AND created_at > now() - make_interval(mins => ${WINDOW_MINUTES})
    `;
    return (row as { cnt: number }).cnt >= MAX_FAILED_LOGINS;
  } catch (error) {
    console.error("login-rate-limit: no se pudo consultar los intentos", error);
    return false;
  }
}

export async function recordFailedLogin(ip: string): Promise<void> {
  try {
    const sql = getDb();
    await sql`INSERT INTO login_attempts (ip) VALUES (${ip})`;
    await sql`
      DELETE FROM login_attempts
      WHERE created_at < now() - make_interval(days => ${RETENTION_DAYS})
    `;
  } catch (error) {
    console.error("login-rate-limit: no se pudo registrar el intento", error);
  }
}

export async function clearFailedLogins(ip: string): Promise<void> {
  try {
    const sql = getDb();
    await sql`DELETE FROM login_attempts WHERE ip = ${ip}`;
  } catch (error) {
    console.error("login-rate-limit: no se pudo limpiar los intentos", error);
  }
}
