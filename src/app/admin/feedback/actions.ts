"use server";
import { revalidatePath } from "next/cache";
import { getDb } from "@/lib/db";

const VALID_STATUSES = ["new", "read", "archived"];

export async function updateFeedbackStatusAction(formData: FormData): Promise<void> {
  const id = Number(formData.get("id"));
  const status = String(formData.get("status") ?? "");
  if (!id || !VALID_STATUSES.includes(status)) return;

  const sql = getDb();
  await sql`UPDATE feedback SET status = ${status} WHERE id = ${id}`;
  revalidatePath("/admin/feedback");
}
