/*
 * Propiedad de BlacKraken Solutions
 * Desarrollado por: NABAOL
 * Fecha de creación: 2026-06-25
 * Correo: nabaol.dev@gmail.com
 * Copyright (c) 2026 BlacKraken Solutions. Todos los derechos reservados.
 */

import { requireAdmin } from "@/lib/admin-guard";
import { ensureSchema } from "@/lib/db";
import { getSetting } from "@/lib/settings";
import { savePricesAction } from "./actions";

export const metadata = { title: "Precios — Admin Muxlyve", robots: "noindex" };
export const dynamic = "force-dynamic";

export default async function PreciosPage() {
  await requireAdmin();
  await ensureSchema();
  const [monthly, annual, lifetime, mVis, aVis, lVis] = await Promise.all([
    getSetting("price_monthly"),
    getSetting("price_annual"),
    getSetting("price_lifetime"),
    getSetting("plan_monthly_visible", "true"),
    getSetting("plan_annual_visible", "true"),
    getSetting("plan_lifetime_visible", "true"),
  ]);

  return (
    <main style={{ padding: "2rem 1.5rem", maxWidth: "600px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "1.6rem", marginBottom: "0.4rem" }}>Precios y planes</h1>
      <p style={{ color: "var(--muted)", fontSize: "0.9rem", marginBottom: "2rem" }}>
        Los cambios se reflejan en la página de inicio al guardar.
      </p>
      <form
        action={savePricesAction}
        style={{ display: "flex", flexDirection: "column", gap: "1.6rem" }}
      >
        <PlanField
          label="Mensual"
          name="monthly"
          value={monthly}
          placeholder="9.99"
          suffix="/mes"
          visible={mVis !== "false"}
        />
        <PlanField
          label="Anual"
          name="annual"
          value={annual}
          placeholder="79.99"
          suffix="/año"
          visible={aVis !== "false"}
        />
        <PlanField
          label="Vitalicia"
          name="lifetime"
          value={lifetime}
          placeholder="149.99"
          suffix="pago único"
          visible={lVis !== "false"}
        />
        <button
          type="submit"
          className="btn btn-primary"
          style={{ alignSelf: "flex-start" }}
        >
          Guardar
        </button>
      </form>
    </main>
  );
}

function PlanField({
  label,
  name,
  value,
  placeholder,
  suffix,
  visible,
}: {
  label: string;
  name: string;
  value: string;
  placeholder: string;
  suffix: string;
  visible: boolean;
}) {
  return (
    <div
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "10px",
        padding: "1.2rem 1.4rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.8rem",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontWeight: 600, fontSize: "0.95rem" }}>{label}</span>
        <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", color: "var(--muted)", cursor: "pointer" }}>
          <input
            type="checkbox"
            name={`plan_${name}_visible`}
            defaultChecked={visible}
            style={{ width: "16px", height: "16px", cursor: "pointer" }}
          />
          Visible en la página
        </label>
      </div>
      <label style={{ display: "flex", flexDirection: "column", gap: "0.3rem", fontSize: "0.85rem", color: "var(--muted)" }}>
        Precio ({suffix})
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ color: "var(--text)", fontSize: "1.1rem" }}>$</span>
          <input
            type="text"
            name={`price_${name}`}
            defaultValue={value}
            placeholder={placeholder}
            style={{
              background: "var(--surface-2)",
              border: "1px solid var(--border)",
              borderRadius: "6px",
              padding: "0.6rem 0.8rem",
              color: "var(--text)",
              fontSize: "1rem",
              width: "160px",
            }}
          />
        </div>
      </label>
    </div>
  );
}
