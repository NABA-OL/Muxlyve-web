/*
 * Propiedad de BlacKraken Solutions
 * Desarrollado por: NABAOL
 * Fecha de creación: 2026-06-25
 * Correo: nabaol.dev@gmail.com
 * Copyright (c) 2026 BlacKraken Solutions. Todos los derechos reservados.
 */

import { requireAdmin } from "@/lib/admin-guard";
import { changePasswordAction } from "./actions";

export const metadata = { title: "Contraseña — Admin Muxlyve", robots: "noindex" };

const ERRORS: Record<string, string> = {
  wrong: "Contraseña actual incorrecta.",
  mismatch: "Las contraseñas nuevas no coinciden.",
  short: "La contraseña nueva debe tener al menos 12 caracteres.",
};

export default async function ContrasenaPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; ok?: string }>;
}) {
  await requireAdmin();
  return (
    <ContrasenaContent searchParams={searchParams} />
  );
}

async function ContrasenaContent({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; ok?: string }>;
}) {
  const { error, ok } = await searchParams;

  return (
    <main style={{ padding: "2rem 1.5rem", maxWidth: "480px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "1.6rem", marginBottom: "0.4rem" }}>Cambiar contraseña</h1>
      <p style={{ color: "var(--muted)", fontSize: "0.9rem", marginBottom: "2rem" }}>
        La primera vez acepta el <code>ADMIN_TOKEN</code> del env y lo migra a la base de datos cifrado.
      </p>

      {ok && (
        <div
          className="card"
          style={{ borderColor: "var(--success)", color: "var(--success)", marginBottom: "1.5rem" }}
        >
          Contraseña actualizada correctamente.
        </div>
      )}

      {error && (
        <div
          className="card"
          style={{ borderColor: "#f85149", color: "#f85149", marginBottom: "1.5rem" }}
        >
          {ERRORS[error] ?? "Error desconocido."}
        </div>
      )}

      <form
        action={changePasswordAction}
        style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}
      >
        <Field label="Contraseña actual" name="current" />
        <Field label="Contraseña nueva (mín. 8 caracteres)" name="next" />
        <Field label="Confirmar contraseña nueva" name="confirm" />
        <button
          type="submit"
          className="btn btn-primary"
          style={{ alignSelf: "flex-start" }}
        >
          Cambiar contraseña
        </button>
      </form>
    </main>
  );
}

function Field({ label, name }: { label: string; name: string }) {
  return (
    <label
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.4rem",
        fontSize: "0.88rem",
        color: "var(--muted)",
      }}
    >
      {label}
      <input
        type="password"
        name={name}
        required
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "6px",
          padding: "0.6rem 0.8rem",
          color: "var(--text)",
          fontSize: "1rem",
        }}
      />
    </label>
  );
}
