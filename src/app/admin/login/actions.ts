"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAdminPassword, createSession } from "@/lib/admin-auth";

export async function loginAction(formData: FormData) {
  const password = formData.get("token") as string;

  const valid = await verifyAdminPassword(password);
  if (!valid) redirect("/admin/login?error=1");

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
