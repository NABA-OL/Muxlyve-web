import { loginAction } from "./actions";

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
          <button
            type="submit"
            className="btn btn-primary"
            style={{ justifyContent: "center" }}
          >
            Entrar
          </button>
        </form>

        {error && (
          <p
            style={{
              color: "#f85149",
              fontSize: "0.88rem",
              marginTop: "0.8rem",
            }}
          >
            Token incorrecto.
          </p>
        )}
      </div>
    </main>
  );
}
