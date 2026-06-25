import Link from "next/link";
import { logoutAction } from "./login/actions";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header
        style={{
          background: "var(--surface)",
          borderBottom: "1px solid var(--border)",
          padding: "0.8rem 1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          zIndex: 50,
          gap: "1rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <span className="gradient-text" style={{ fontWeight: 700 }}>
            Muxlyve · Admin
          </span>
          <nav style={{ display: "flex", gap: "1rem" }}>
            <Link
              href="/admin"
              style={{ color: "var(--muted)", fontSize: "0.88rem", textDecoration: "none" }}
            >
              Licencias
            </Link>
            <Link
              href="/admin/precios"
              style={{ color: "var(--muted)", fontSize: "0.88rem", textDecoration: "none" }}
            >
              Precios
            </Link>
            <Link
              href="/admin/contrasena"
              style={{ color: "var(--muted)", fontSize: "0.88rem", textDecoration: "none" }}
            >
              Contraseña
            </Link>
          </nav>
        </div>
        <form action={logoutAction}>
          <button
            type="submit"
            style={{
              background: "none",
              border: "none",
              color: "var(--muted)",
              fontSize: "0.88rem",
              cursor: "pointer",
            }}
          >
            Cerrar sesión
          </button>
        </form>
      </header>
      {children}
    </>
  );
}
