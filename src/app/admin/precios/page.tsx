import { ensureSchema } from "@/lib/db";
import { getSetting } from "@/lib/settings";
import { savePricesAction } from "./actions";

export const metadata = { title: "Precios — Admin Muxlyve", robots: "noindex" };
export const dynamic = "force-dynamic";

export default async function PreciosPage() {
  await ensureSchema();
  const [monthly, annual, lifetime] = await Promise.all([
    getSetting("price_monthly"),
    getSetting("price_annual"),
    getSetting("price_lifetime"),
  ]);

  return (
    <main style={{ padding: "2rem 1.5rem", maxWidth: "600px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "1.6rem", marginBottom: "0.4rem" }}>Precios</h1>
      <p style={{ color: "var(--muted)", fontSize: "0.9rem", marginBottom: "2rem" }}>
        Los cambios se reflejan en la página de inicio al guardar.
      </p>
      <form
        action={savePricesAction}
        style={{ display: "flex", flexDirection: "column", gap: "1.4rem" }}
      >
        <PriceField label="Mensual (por mes)" name="price_monthly" value={monthly} placeholder="9.99" />
        <PriceField label="Anual (por año)" name="price_annual" value={annual} placeholder="79.99" />
        <PriceField label="Vitalicia (pago único)" name="price_lifetime" value={lifetime} placeholder="149.99" />
        <button
          type="submit"
          className="btn btn-primary"
          style={{ alignSelf: "flex-start" }}
        >
          Guardar precios
        </button>
      </form>
    </main>
  );
}

function PriceField({
  label,
  name,
  value,
  placeholder,
}: {
  label: string;
  name: string;
  value: string;
  placeholder: string;
}) {
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
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <span style={{ color: "var(--text)", fontSize: "1.1rem" }}>$</span>
        <input
          type="text"
          name={name}
          defaultValue={value}
          placeholder={placeholder}
          style={{
            background: "var(--surface)",
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
  );
}
