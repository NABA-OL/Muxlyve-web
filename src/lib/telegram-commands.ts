/*
 * Propiedad de BlacKraken Solutions
 * Desarrollado por: NABAOL
 * Fecha de creación: 2026-08-15
 */
import { getDb } from "./db";
import { findLicensesByEmail } from "./licenses";
import { escapeTelegramHtml, telegramSpoiler } from "./telegram";

const PLAN_LABEL: Record<string, string> = {
  monthly: "Mensual",
  annual: "Anual",
  lifetime: "De por vida",
};

const STATUS_LABEL: Record<string, string> = {
  active: "Activa",
  cancelled: "Cancelada",
  refunded: "Reembolsada",
  disabled: "Deshabilitada",
};

export async function cmdLicencias(emailArg: string): Promise<string> {
  const email = emailArg.trim();
  if (!email) return "Uso: <code>/licencias correo@ejemplo.com</code>";

  const licenses = await findLicensesByEmail(email);
  if (licenses.length === 0) {
    return `Sin licencias para <b>${escapeTelegramHtml(email)}</b>.`;
  }

  const lines = licenses.map((l) => {
    const plan = l.plan ? PLAN_LABEL[l.plan] ?? l.plan : "—";
    const status = STATUS_LABEL[l.status] ?? l.status;
    const devices = `${l.devices.length}/${l.max_devices} dispositivos`;
    return [
      `<b>${status}</b> · ${plan} · ${devices}`,
      `Creada: ${new Date(l.created_at).toLocaleDateString("es-CO")}`,
      l.renews_at ? `Renueva: ${new Date(l.renews_at).toLocaleDateString("es-CO")}` : null,
      l.expires_at ? `Expira: ${new Date(l.expires_at).toLocaleDateString("es-CO")}` : null,
    ]
      .filter(Boolean)
      .join("\n");
  });

  return `🔑 Licencias de <b>${escapeTelegramHtml(email)}</b>\n\n${lines.join("\n\n")}`;
}

export async function cmdEstado(): Promise<string> {
  const sql = getDb();
  const [licenseCounts, reportsToday, feedbackNew] = await Promise.all([
    sql`SELECT status, count(*)::int AS n FROM licenses GROUP BY status`,
    sql`SELECT count(*)::int AS n FROM error_reports WHERE created_at > now() - interval '24 hours'`,
    sql`SELECT count(*)::int AS n FROM feedback WHERE status = 'new'`,
  ]);

  const active = (licenseCounts.find((r) => r.status === "active")?.n as number) ?? 0;
  const total = licenseCounts.reduce((sum, r) => sum + (r.n as number), 0);

  return [
    "📊 Estado del sistema",
    "",
    `Licencias activas: ${active} (${total} en total)`,
    `Reportes últimas 24h: ${reportsToday[0].n}`,
    `Feedback sin leer: ${feedbackNew[0].n}`,
  ].join("\n");
}

export async function cmdPendientes(): Promise<string> {
  const sql = getDb();
  const [feedbackRows, reportRows] = await Promise.all([
    sql`SELECT id, email, description FROM feedback WHERE status = 'new' ORDER BY created_at DESC LIMIT 5`,
    sql`SELECT id, email, description FROM error_reports WHERE created_at > now() - interval '24 hours' ORDER BY created_at DESC LIMIT 5`,
  ]);

  const feedbackLines = feedbackRows.length
    ? feedbackRows
        .map((f) => `#${f.id} ${f.email ? escapeTelegramHtml(String(f.email)) : "anónimo"} — ${escapeTelegramHtml(String(f.description)).slice(0, 80)}`)
        .join("\n")
    : "Ninguno.";

  const reportLines = reportRows.length
    ? reportRows
        .map((r) => `#${r.id} ${r.email ? escapeTelegramHtml(String(r.email)) : "anónimo"} — ${escapeTelegramHtml(String(r.description)).slice(0, 80)}`)
        .join("\n")
    : "Ninguno.";

  return [
    "🗂 Pendientes",
    "",
    `💡 Feedback sin leer (${feedbackRows.length}):`,
    feedbackLines,
    "",
    `🐛 Reportes últimas 24h (${reportRows.length}):`,
    reportLines,
  ].join("\n");
}

export async function cmdResumen(): Promise<string> {
  const sql = getDb();
  const [newLicenses, newReports, newFeedback] = await Promise.all([
    sql`SELECT plan, count(*)::int AS n FROM licenses WHERE created_at::date = current_date GROUP BY plan`,
    sql`SELECT count(*)::int AS n FROM error_reports WHERE created_at::date = current_date`,
    sql`SELECT count(*)::int AS n FROM feedback WHERE created_at::date = current_date`,
  ]);

  const planLines = newLicenses.length
    ? newLicenses.map((r) => `  ${PLAN_LABEL[r.plan as string] ?? r.plan ?? "—"}: ${r.n}`).join("\n")
    : "  Ninguna.";
  const totalLicenses = newLicenses.reduce((sum, r) => sum + (r.n as number), 0);

  return [
    "📅 Resumen de hoy",
    "",
    `Compras nuevas: ${totalLicenses}`,
    planLines,
    "",
    `Reportes: ${newReports[0].n}`,
    `Feedback: ${newFeedback[0].n}`,
  ].join("\n");
}

export function mockPurchaseTestMessage(): string {
  return [
    "💰 Nueva compra",
    `Email: ${escapeTelegramHtml("prueba@muxlyve.com")}`,
    "Plan: Mensual",
    `Licencia: ${telegramSpoiler("MUXL-TEST-0000-0000")}`,
  ].join("\n");
}
