import Link from "next/link";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <strong className="gradient-text">Multi_Stream</strong>
            <p style={{ marginTop: "0.5rem", maxWidth: "32ch" }}>
              Multistreaming de escritorio sin marca de agua. Un pago único.
            </p>
          </div>
          <nav className="footer-links" aria-label="Pie de página">
            <Link href="/descargar">Descargar</Link>
            <a href="#caracteristicas">Características</a>
            <a href="#precio">Precio</a>
            <a href="mailto:soporte@multistream.app">Contacto</a>
          </nav>
        </div>
        <div className="footer-legal">
          <span>© {new Date().getFullYear()} Multi_Stream</span>
          <span>
            Usa FFmpeg (LGPL). Twitch, Kick, YouTube y TikTok son marcas de sus
            respectivos dueños.
          </span>
        </div>
      </div>
    </footer>
  );
}
