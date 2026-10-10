/*
 * Propiedad de BlacKraken Solutions
 * Desarrollado por: NABAOL
 * Fecha de creación: 2026-07-05
 * Correo: nabaol.dev@gmail.com
 * Copyright (c) 2026 BlacKraken Solutions. Todos los derechos reservados.
 */

import { requireAdmin } from "@/lib/admin-guard";
import { ensureSchema } from "@/lib/db";
import { getSetting } from "@/lib/settings";
import { saveBannerAction } from "./actions";

export const metadata = { title: "Banner — Admin Muxlyve", robots: "noindex" };
export const dynamic = "force-dynamic";

export default async function BannerPage() {
  await requireAdmin();
  await ensureSchema();
  const [active, text, coupon] = await Promise.all([
    getSetting("promo_active", "false"),
    getSetting("promo_text"),
    getSetting("promo_coupon"),
  ]);

  return (
    <main style={{ padding: "2rem 1.5rem", maxWidth: "600px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "1.6rem", marginBottom: "0.4rem" }}>Banner promocional</h1>
      <p style={{ color: "var(--muted)", fontSize: "0.9rem", marginBottom: "2rem" }}>
        Aparece en la parte superior de la página de inicio cuando está activo.
      </p>

      {active === "true" && (
        <div
          style={{
            background: "linear-gradient(90deg, rgba(124,92,255,0.15), rgba(77,163,255,0.15))",
            border: "1px solid rgba(124,92,255,0.4)",
            borderRadius: "8px",
            padding: "0.8rem 1.2rem",
            marginBottom: "2rem",
            fontSize: "0.9rem",
          }}
        >
          <strong>Vista previa:</strong>{" "}
          {text || "—"}{coupon ? ` · Código: ${coupon}` : ""}
        </div>
      )}

      <form
        action={saveBannerAction}
        style={{ display: "flex", flexDirection: "column", gap: "1.4rem" }}
      >
        <label style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.95rem", cursor: "pointer" }}>
          <input
            type="checkbox"
            name="promo_active"
            defaultChecked={active === "true"}
            style={{ width: "18px", height: "18px", cursor: "pointer" }}
          />
          Banner activo (visible en la página)
        </label>

        <label style={{ display: "flex", flexDirection: "column", gap: "0.4rem", fontSize: "0.88rem", color: "var(--muted)" }}>
          Texto del banner
          <input
            type="text"
            name="promo_text"
            defaultValue={text}
            placeholder="🎉 Solo por hoy: 25% de descuento en todos los planes"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "6px",
              padding: "0.65rem 0.9rem",
              color: "var(--text)",
              fontSize: "0.95rem",
              width: "100%",
            }}
          />
        </label>

        <label style={{ display: "flex", flexDirection: "column", gap: "0.4rem", fontSize: "0.88rem", color: "var(--muted)" }}>
          Código de cupón (opcional)
          <input
            type="text"
            name="promo_coupon"
            defaultValue={coupon}
            placeholder="STREAM25"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "6px",
              padding: "0.65rem 0.9rem",
              color: "var(--text)",
              fontSize: "0.95rem",
              width: "200px",
              fontFamily: "monospace",
            }}
          />
          <span style={{ fontSize: "0.8rem" }}>Si lo pones, aparece junto al texto como "· Código: STREAM25"</span>
        </label>

        <button
          type="submit"
          className="btn btn-primary"
          style={{ alignSelf: "flex-start" }}
        >
          Guardar banner
        </button>
      </form>
    </main>
  );
}
