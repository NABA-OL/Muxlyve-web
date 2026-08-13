/*
 * Propiedad de BlacKraken Solutions
 * Desarrollado por: NABAOL
 * Fecha de creación: 2026-08-13
 */

import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { findLicense } from "@/lib/licenses";
import { ensureSchema } from "@/lib/db";
import type { License } from "@/lib/licenses";
import { buildAlternates } from "@/lib/i18n-meta";
import { releaseDeviceAction, resendEmailAction } from "./actions";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "gestionarLicencia.meta" });
  return {
    alternates: buildAlternates(locale, "/gestionar-licencia"),
    title: t("title"),
  };
}

export const dynamic = "force-dynamic";

function maskEmail(email: string): string {
  const [local, domain] = email.split("@");
  return `${local[0]}***@${domain}`;
}

function maskDevice(id: string): string {
  return id.length > 8 ? `${id.slice(0, 8)}…` : id;
}

// ── Search form (no key yet) ──────────────────────────────────────────────────

async function SearchForm({ error }: { error?: boolean }) {
  const t = await getTranslations("gestionarLicencia.search");
  return (
    <main
      style={{
        minHeight: "80dvh",
        display: "grid",
        placeItems: "center",
        padding: "2rem 1.5rem",
      }}
    >
      <div
        className="card"
        style={{ width: "min(460px, 100%)", textAlign: "center" }}
      >
        <h1
          className="gradient-text"
          style={{ fontSize: "1.5rem", marginBottom: "0.4rem" }}
        >
          {t("title")}
        </h1>
        <p
          style={{
            color: "var(--muted)",
            fontSize: "0.9rem",
            marginBottom: "1.8rem",
          }}
        >
          {t("lead")}
        </p>

        <form method="GET" style={{ display: "grid", gap: "1rem" }}>
          <input
            type="text"
            name="key"
            placeholder={t("placeholder")}
            required
            autoFocus
            style={{
              background: "var(--surface-2)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              color: "var(--text)",
              fontFamily: "monospace",
              fontSize: "1rem",
              letterSpacing: "0.06em",
              padding: "0.7rem 1rem",
              outline: "none",
              width: "100%",
              boxSizing: "border-box",
            }}
          />
          <button
            type="submit"
            className="btn btn-primary"
            style={{ justifyContent: "center" }}
          >
            {t("submit")}
          </button>
        </form>

        {error && (
          <p style={{ color: "#f85149", fontSize: "0.88rem", marginTop: "0.8rem" }}>
            {t("error")}
          </p>
        )}
      </div>
    </main>
  );
}

// ── License dashboard ─────────────────────────────────────────────────────────

async function LicenseDashboard({
  license,
  sent,
  released,
}: {
  license: License;
  sent: boolean;
  released: boolean;
}) {
  const t = await getTranslations("gestionarLicencia.dashboard");

  const statusLabel =
    license.status === "active"
      ? t("statusActive")
      : license.status === "refunded"
        ? t("statusRefunded")
        : t("statusDisabled");

  const statusColor =
    license.status === "active"
      ? "var(--success)"
      : "#f85149";

  return (
    <main
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "3rem 1.5rem",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: "2rem" }}>
        <Link
          href="/gestionar-licencia"
          style={{
            color: "var(--muted)",
            fontSize: "0.85rem",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.3rem",
            marginBottom: "1.2rem",
          }}
        >
          {t("back")}
        </Link>
        <h1 style={{ fontSize: "1.5rem", marginBottom: "0.2rem" }}>
          {t("title")}
        </h1>
        <code
          style={{
            color: "var(--accent-2)",
            fontSize: "0.9rem",
            letterSpacing: "0.06em",
          }}
        >
          {license.key}
        </code>
      </div>

      {/* Info card */}
      <div className="card" style={{ marginBottom: "1.2rem" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1.2rem",
          }}
        >
          <div>
            <div
              style={{
                color: "var(--muted)",
                fontSize: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                marginBottom: "0.3rem",
              }}
            >
              {t("email")}
            </div>
            <div style={{ fontSize: "0.95rem" }}>{maskEmail(license.email)}</div>
          </div>
          <div>
            <div
              style={{
                color: "var(--muted)",
                fontSize: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                marginBottom: "0.3rem",
              }}
            >
              {t("estado")}
            </div>
            <div style={{ color: statusColor, fontWeight: 600 }}>{statusLabel}</div>
          </div>
          <div>
            <div
              style={{
                color: "var(--muted)",
                fontSize: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                marginBottom: "0.3rem",
              }}
            >
              {t("equipos")}
            </div>
            <div>
              {license.devices.length} / {license.max_devices}
            </div>
          </div>
          <div>
            <div
              style={{
                color: "var(--muted)",
                fontSize: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                marginBottom: "0.3rem",
              }}
            >
              {t("desde")}
            </div>
            <div>
              {new Date(license.created_at).toLocaleDateString("es-CO", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Devices */}
      <div className="card" style={{ marginBottom: "1.2rem" }}>
        <h2 style={{ fontSize: "1rem", marginBottom: "1rem" }}>
          {t("dispositivosTitle")}
        </h2>

        {license.devices.length === 0 ? (
          <p style={{ color: "var(--muted)", fontSize: "0.9rem" }}>
            {t("sinDispositivos")}
          </p>
        ) : (
          <div style={{ display: "grid", gap: "0.8rem" }}>
            {license.devices.map((machineId) => (
              <div
                key={machineId}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "1rem",
                  padding: "0.6rem 0",
                  borderBottom: "1px solid var(--border)",
                }}
              >
                <span
                  style={{
                    fontFamily: "monospace",
                    fontSize: "0.85rem",
                    color: "var(--muted)",
                    wordBreak: "break-all",
                  }}
                >
                  {maskDevice(machineId)}
                </span>
                <form action={releaseDeviceAction} style={{ flexShrink: 0 }}>
                  <input type="hidden" name="key" value={license.key} />
                  <input type="hidden" name="machineId" value={machineId} />
                  <button
                    type="submit"
                    style={{
                      background: "none",
                      border: "1px solid var(--border)",
                      borderRadius: "6px",
                      color: "#f85149",
                      cursor: "pointer",
                      fontSize: "0.8rem",
                      padding: "0.3rem 0.7rem",
                    }}
                  >
                    {t("liberar")}
                  </button>
                </form>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Resend */}
      <div className="card">
        <h2 style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>
          {t("reenviarTitle")}
        </h2>
        <p style={{ color: "var(--muted)", fontSize: "0.88rem", marginBottom: "1rem" }}>
          {t("reenviarLead", { email: maskEmail(license.email) })}
        </p>

        {sent && (
          <p
            style={{
              color: "var(--success)",
              fontSize: "0.88rem",
              marginBottom: "0.8rem",
            }}
          >
            {t("emailEnviado")}
          </p>
        )}
        {released && (
          <p
            style={{
              color: "var(--success)",
              fontSize: "0.88rem",
              marginBottom: "0.8rem",
            }}
          >
            {t("dispositivoLiberado")}
          </p>
        )}

        <form action={resendEmailAction}>
          <input type="hidden" name="key" value={license.key} />
          <button
            type="submit"
            className="btn btn-ghost"
            style={{ fontSize: "0.9rem" }}
          >
            {t("reenviarBoton")}
          </button>
        </form>
      </div>
    </main>
  );
}

// ── Page entry point ──────────────────────────────────────────────────────────

export default async function GestionarLicenciaPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string; sent?: string; released?: string }>;
}) {
  const { key, sent, released } = await searchParams;

  if (!key) return <SearchForm />;

  let license: License | null = null;
  try {
    await ensureSchema();
    license = await findLicense(key);
  } catch {
    // DB not available — treat as not found
  }

  if (!license) return <SearchForm error />;

  return (
    <LicenseDashboard
      license={license}
      sent={sent === "1"}
      released={released === "1"}
    />
  );
}
