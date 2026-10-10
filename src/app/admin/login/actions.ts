"use server";
/*
 * Propiedad de BlacKraken Solutions
 * Desarrollado por: NABAOL
 * Fecha de creación: 2026-06-25
 * Correo: nabaol.dev@gmail.com
 * Copyright (c) 2026 BlacKraken Solutions. Todos los derechos reservados.
 */

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAdminPassword, createSession } from "@/lib/admin-auth";
import {
  clearFailedLogins,
  getClientIp,
  isLoginBlocked,
  recordFailedLogin,
} from "@/lib/login-rate-limit";

const MAX_PASSWORD_LENGTH = 256;

export async function loginAction(formData: FormData) {
  const password = formData.get("token");
  const ip = await getClientIp();

  if (await isLoginBlocked(ip)) redirect("/admin/login?error=locked");

  const isValidInput =
    typeof password === "string" && password.length > 0 && password.length <= MAX_PASSWORD_LENGTH;
  const valid = isValidInput && (await verifyAdminPassword(password));
  if (!valid) {
    await recordFailedLogin(ip);
    redirect("/admin/login?error=1");
  }

  await clearFailedLogins(ip);
  const sessionToken = await createSession();
  const jar = await cookies();
  jar.set("admin_session", sessionToken, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 8,
    path: "/",
  });
  redirect("/admin");
}

export async function logoutAction() {
  const jar = await cookies();
  jar.delete("admin_session");
  redirect("/admin/login");
}
