"use server";

import { setSetting } from "@/lib/settings";
import { revalidatePath } from "next/cache";

export async function savePricesAction(formData: FormData) {
  await setSetting("price_monthly", (formData.get("price_monthly") as string) ?? "");
  await setSetting("price_annual", (formData.get("price_annual") as string) ?? "");
  await setSetting("price_lifetime", (formData.get("price_lifetime") as string) ?? "");
  revalidatePath("/");
}
