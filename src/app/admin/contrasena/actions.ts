"use server";
/*
 * Propiedad de BlacKraken Solutions
 * Desarrollado por: NABAOL
 * Fecha de creación: 2026-06-25
 * Correo: nabaol.dev@gmail.com
 * Copyright (c) 2026 BlacKraken Solutions. Todos los derechos reservados.
 */

import { requireAdmin } from "@/lib/admin-guard";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAdminPassword, setAdminPassword, createSession } from "@/lib/admin-auth";

const MIN_PASSWORD_LENGTH = 12;

export async function changePasswordAction(formData: FormData) {
  await requireAdmin();
  const current = formData.get("current") as string;
  const next = formData.get("next") as string;
  const confirm = formData.get("confirm") as string;

  if (!current || !next || next !== confirm) {
    redirect("/admin/contrasena?error=mismatch");
  }

  const valid = await verifyAdminPassword(current);
  if (!valid) redirect("/admin/contrasena?error=wrong");

  if (next.length < MIN_PASSWORD_LENGTH) redirect("/admin/contrasena?error=short");

  await setAdminPassword(next);

  // Renew session so cookie stays valid after password change
  const sessionToken = await createSession();
  const jar = await cookies();
  jar.set("admin_session", sessionToken, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 8,
    path: "/",
  });

  redirect("/admin/contrasena?ok=1");
}
