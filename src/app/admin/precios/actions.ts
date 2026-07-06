"use server";

import { setSetting } from "@/lib/settings";
import { revalidatePath } from "next/cache";

export async function savePricesAction(formData: FormData) {
  await setSetting("price_monthly", (formData.get("price_monthly") as string) ?? "");
  await setSetting("price_annual", (formData.get("price_annual") as string) ?? "");
  await setSetting("price_lifetime", (formData.get("price_lifetime") as string) ?? "");
  await setSetting("plan_monthly_visible", formData.get("plan_monthly_visible") === "on" ? "true" : "false");
  await setSetting("plan_annual_visible", formData.get("plan_annual_visible") === "on" ? "true" : "false");
  await setSetting("plan_lifetime_visible", formData.get("plan_lifetime_visible") === "on" ? "true" : "false");
  revalidatePath("/");
}
