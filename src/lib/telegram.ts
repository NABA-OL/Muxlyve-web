/*
 * Propiedad de BlacKraken Solutions
 * Desarrollado por: NABAOL
 * Fecha de creación: 2026-08-14
 */

export type TelegramTopic = "reports" | "feedback" | "purchases" | "releases";

function apiUrl(method: string): string | null {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) return null;
  return `https://api.telegram.org/bot${token}/${method}`;
}

function threadIdFor(topic?: TelegramTopic): string | undefined {
  if (!topic) return undefined;
  const envKey =
    topic === "reports"
      ? "TELEGRAM_TOPIC_REPORTS"
      : topic === "feedback"
        ? "TELEGRAM_TOPIC_FEEDBACK"
        : topic === "purchases"
          ? "TELEGRAM_TOPIC_PURCHASES"
          : "TELEGRAM_TOPIC_RELEASES";
  return process.env[envKey] || undefined;
}

export async function sendTelegramMessage(
  text: string,
  topic?: TelegramTopic,
): Promise<boolean> {
  const url = apiUrl("sendMessage");
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!url || !chatId) return false;

  const messageThreadId = threadIdFor(topic);

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      ...(messageThreadId ? { message_thread_id: messageThreadId } : {}),
    }),
  });
  return res.ok;
}

export async function sendTelegramDocument(
  content: string,
  filename: string,
  caption: string,
  topic?: TelegramTopic,
): Promise<void> {
  const url = apiUrl("sendDocument");
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!url || !chatId) return;

  const messageThreadId = threadIdFor(topic);

  const form = new FormData();
  form.append("chat_id", chatId);
  form.append("caption", caption);
  if (messageThreadId) form.append("message_thread_id", messageThreadId);
  form.append("document", new Blob([content], { type: "text/plain" }), filename);

  await fetch(url, { method: "POST", body: form });
}
