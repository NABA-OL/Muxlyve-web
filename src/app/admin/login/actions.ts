"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
  const token = formData.get("token") as string;
  const adminToken = process.env.ADMIN_TOKEN;

  if (!adminToken || token !== adminToken) {
    redirect("/admin/login?error=1");
  }

  const jar = await cookies();
  jar.set("admin_session", token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 8, // 8 horas
    path: "/",
  });

  redirect("/admin");
}

export async function logoutAction() {
  const jar = await cookies();
  jar.delete("admin_session");
  redirect("/admin/login");
}
