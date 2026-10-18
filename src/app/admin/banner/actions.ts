"use server";
/*
 * Propiedad de BlacKraken Solutions
 * Desarrollado por: NABAOL
 * Fecha de creación: 2026-07-05
 * Correo: nabaol.dev@gmail.com
 * Copyright (c) 2026 BlacKraken Solutions. Todos los derechos reservados.
 */

import { requireAdmin } from "@/lib/admin-guard";
import { setSetting } from "@/lib/settings";
import { revalidatePath } from "next/cache";

export async function saveBannerAction(formData: FormData) {
  await requireAdmin();
  await setSetting("promo_active", formData.get("promo_active") === "on" ? "true" : "false");
  await setSetting("promo_text", (formData.get("promo_text") as string) ?? "");
  await setSetting("promo_coupon", (formData.get("promo_coupon") as string) ?? "");
  // La home y /precio leen estos ajustes: se invalidan en todos los idiomas.
  revalidatePath("/[locale]", "page");
  revalidatePath("/[locale]/precio", "page");
}
