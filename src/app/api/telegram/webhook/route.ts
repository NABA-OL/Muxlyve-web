/*
 * Propiedad de BlacKraken Solutions
 * Desarrollado por: NABAOL
 * Fecha de creación: 2026-08-15
 */
import { NextRequest, NextResponse } from "next/server";
import { ensureSchema } from "@/lib/db";
import { sendTelegramReply } from "@/lib/telegram";
import { cmdLicencias, cmdEstado, cmdPendientes, cmdResumen } from "@/lib/telegram-commands";

interface TelegramMessage {
  message_id: number;
  message_thread_id?: number;
  chat: { id: number };
  text?: string;
}

interface TelegramUpdate {
  message?: TelegramMessage;
}

function parseCommand(text: string): { command: string; arg: string } | null {
  const match = text.trim().match(/^\/(\w+)(?:@\w+)?\s*([\s\S]*)$/);
  if (!match) return null;
  return { command: match[1].toLowerCase(), arg: match[2].trim() };
}

export async function POST(req: NextRequest) {
  const secret = process.env.TELEGRAM_WEBHOOK_SECRET;
  const allowedChatId = process.env.TELEGRAM_CHAT_ID;
  if (!secret || !allowedChatId) {
    return NextResponse.json({ error: "Not configured" }, { status: 501 });
  }

  const headerSecret = req.headers.get("x-telegram-bot-api-secret-token");
  if (headerSecret !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const update = (await req.json()) as TelegramUpdate;
  const message = update.message;
  if (!message?.text || String(message.chat.id) !== allowedChatId) {
    return NextResponse.json({ ok: true });
  }

  const parsed = parseCommand(message.text);
  if (!parsed) return NextResponse.json({ ok: true });

  await ensureSchema();

  let reply: string | null = null;
  switch (parsed.command) {
    case "licencias":
      reply = await cmdLicencias(parsed.arg);
      break;
    case "estado":
      reply = await cmdEstado();
      break;
    case "pendientes":
      reply = await cmdPendientes();
      break;
    case "resumen":
      reply = await cmdResumen();
      break;
    default:
      return NextResponse.json({ ok: true });
  }

  await sendTelegramReply(message.chat.id, reply, message.message_thread_id, "HTML").catch(() => {});

  return NextResponse.json({ ok: true });
}
