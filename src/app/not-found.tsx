/*
 * Propiedad de BlacKraken Solutions
 * Desarrollado por: NABAOL
 * Fecha de creación: 2026-08-13
 *  * Correo: nabaol.dev@gmail.com
 * Copyright (c) 2026 BlacKraken Solutions. Todos los derechos reservados.
 */

import Link from "next/link";

export const metadata = {
  title: "Página no encontrada — Muxlyve",
};

export default function NotFound() {
  return (
    <main
      id="main-content"
      style={{ minHeight: "80dvh", display: "grid", placeItems: "center" }}
    >
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
            El enlace puede estar roto o la página se movió. Vuelve al inicio o
            revisa el centro de ayuda.
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
          <p
            className="section-lead"
            style={{ marginInline: "auto", marginTop: "2rem", fontSize: "0.9rem" }}
          >
            También podés revisar el{" "}
            <a href="/sitemap.xml">mapa del sitio</a> o{" "}
            <a href="/llms.txt">llms.txt</a> para ver todas las páginas
            disponibles.
          </p>
        </div>
      </section>
    </main>
  );
}
