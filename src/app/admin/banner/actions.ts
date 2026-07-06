"use server";

import { setSetting } from "@/lib/settings";
import { revalidatePath } from "next/cache";

export async function saveBannerAction(formData: FormData) {
  await setSetting("promo_active", formData.get("promo_active") === "on" ? "true" : "false");
  await setSetting("promo_text", (formData.get("promo_text") as string) ?? "");
  await setSetting("promo_coupon", (formData.get("promo_coupon") as string) ?? "");
  revalidatePath("/");
}
