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
        }}
      >
        <span className="gradient-text" style={{ fontWeight: 700 }}>
          Muxlyve · Admin
        </span>
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
