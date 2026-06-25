import { Resend } from "resend";

export async function sendLicenseEmail(
  to: string,
  licenseKey: string,
): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY not configured");

  const from = process.env.RESEND_FROM ?? "noreply@multistream.app";
  const resend = new Resend(apiKey);

  await resend.emails.send({
    from,
    to,
    subject: "Tu licencia de Muxlyve",
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#e6edf3;background:#0d1117;padding:2rem;border-radius:12px">
        <h1 style="color:#7c5cff;margin:0 0 1rem">Muxlyve</h1>
        <p>¡Gracias por tu compra! Esta es tu llave de licencia:</p>
        <div style="background:#161b22;border:1px solid #2a3140;border-radius:8px;padding:1rem;margin:1.5rem 0;text-align:center">
          <code style="font-size:1.2rem;letter-spacing:0.08em;color:#4da3ff">${licenseKey}</code>
        </div>
        <p style="color:#8b949e;font-size:0.9rem">
          Abre Muxlyve → Activar licencia → pega esta llave.<br/>
          Puedes activarla en hasta 2 equipos.
        </p>
        <p style="color:#8b949e;font-size:0.85rem;margin-top:2rem">
          Desarrollado por NABA-OL · Muxlyve
        </p>
      </div>
    `,
  });
}
