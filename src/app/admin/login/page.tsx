/*
 * Propiedad de BlacKraken Solutions
 * Desarrollado por: NABAOL
 * Fecha de creación: 2026-06-25
 * Correo: nabaol.dev@gmail.com
 * Copyright (c) 2026 BlacKraken Solutions. Todos los derechos reservados.
 */

import { loginAction } from "./actions";
import { LoginSubmitButton } from "./LoginSubmitButton";

export const metadata = { title: "Admin — Muxlyve", robots: "noindex" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <main
      style={{
        minHeight: "100dvh",
        display: "grid",
        placeItems: "center",
        background: "var(--bg)",
        padding: "1.5rem",
      }}
    >
      <div
        className="card"
        style={{ width: "min(380px, 100%)", textAlign: "center" }}
      >
        <h1
          className="gradient-text"
          style={{ fontSize: "1.4rem", marginBottom: "0.4rem" }}
        >
          Muxlyve
        </h1>
        <p
          style={{
            color: "var(--muted)",
            fontSize: "0.9rem",
            marginBottom: "1.8rem",
          }}
        >
          Panel de administrador
        </p>

        <form action={loginAction} style={{ display: "grid", gap: "1rem" }}>
          <input
            type="password"
            name="token"
            placeholder="Token de acceso"
            aria-label="Token de acceso"
            required
            autoFocus
            style={{
              background: "var(--surface-2)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              color: "var(--text)",
              fontSize: "1rem",
              padding: "0.7rem 1rem",
              outline: "none",
              width: "100%",
              boxSizing: "border-box",
            }}
          />
          <LoginSubmitButton />
        </form>

        {error && (
          <p
            style={{
              color: "#f85149",
              fontSize: "0.88rem",
              marginTop: "0.8rem",
            }}
          >
            {error === "locked"
              ? "Demasiados intentos fallidos. Intenta de nuevo en 15 minutos."
              : "Token incorrecto."}
          </p>
        )}
      </div>
    </main>
  );
}
