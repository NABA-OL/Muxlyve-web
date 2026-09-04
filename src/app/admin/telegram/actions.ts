/*
 * Propiedad de BlacKraken Solutions <blackraken.com>
 * Desarrollado por: NABAOL
 * Fecha de creación: 2026-08-14
 */
"use server";

import { redirect } from "next/navigation";
import { sendTelegramMessage, type TelegramTopic } from "@/lib/telegram";
import { mockPurchaseTestMessage } from "@/lib/telegram-commands";

const LABELS: Record<TelegramTopic, string> = {
  reports: "reportes de error",
  feedback: "feedback",
  purchases: "compras",
  releases: "nuevas versiones",
};

export async function testTelegramAction(formData: FormData) {
  const topic = formData.get("topic") as TelegramTopic;

  const ok =
    topic === "purchases"
      ? await sendTelegramMessage(mockPurchaseTestMessage(), topic, "HTML").catch(() => false)
      : await sendTelegramMessage(
          `🧪 Prueba — este es un mensaje de prueba del tema de ${LABELS[topic]}.`,
          topic,
        ).catch(() => false);

  redirect(`/admin/telegram?${ok ? "sent" : "failed"}=${topic}`);
}
