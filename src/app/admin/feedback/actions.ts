"use server";
/*
 * Propiedad de BlacKraken Solutions
 * Desarrollado por: NABAOL
 * Fecha de creación: 2026-07-25
 * Correo: nabaol.dev@gmail.com
 * Copyright (c) 2026 BlacKraken Solutions. Todos los derechos reservados.
 */
import { requireAdmin } from "@/lib/admin-guard";
import { revalidatePath } from "next/cache";
import { getDb } from "@/lib/db";

const VALID_STATUSES = ["new", "read", "archived"];

export async function updateFeedbackStatusAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = Number(formData.get("id"));
  const status = String(formData.get("status") ?? "");
  if (!id || !VALID_STATUSES.includes(status)) return;

  const sql = getDb();
  await sql`UPDATE feedback SET status = ${status} WHERE id = ${id}`;
  revalidatePath("/admin/feedback");
}
