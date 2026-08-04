import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Página no encontrada — Muxlyve",
};

export default function NotFound() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <section>
          <div
            className="container"
            style={{ textAlign: "center", maxWidth: "560px" }}
          >
            <span className="eyebrow">Error 404</span>
            <h1 className="section-title" style={{ marginInline: "auto" }}>
              Esta página no existe.
            </h1>
            <p
              className="section-lead"
              style={{ marginInline: "auto", marginTop: "1rem" }}
            >
              El enlace puede estar roto o la página se movió. Vuelve al
              inicio o revisa el centro de ayuda.
            </p>
            <div
              style={{
                marginTop: "2rem",
                display: "flex",
                gap: "0.9rem",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Link href="/" className="btn btn-primary">
                Ir al inicio
              </Link>
              <Link href="/ayuda" className="btn btn-ghost">
                Centro de ayuda
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
