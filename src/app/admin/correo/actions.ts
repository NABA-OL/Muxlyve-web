// Desarrollado por BlacKraken Solutions
"use server";
import { Resend } from "resend";
import { redirect } from "next/navigation";
import { marked } from "marked";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SIGNATURE_HTML = `
  <table cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, Helvetica, sans-serif; color: #0e0a01;">
    <tr>
      <td style="padding-right: 16px; border-right: 2px solid #DE9618;" valign="middle">
        <img src="https://nabaol.vercel.app/logo-black.png" width="48" height="48" alt="NABA-OL" style="display: block;" />
      </td>
      <td style="padding-left: 16px;" valign="middle">
        <table cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="font-size: 15px; font-weight: bold; color: #0e0a01; padding-bottom: 2px;">
              NABA-OL
            </td>
          </tr>
          <tr>
            <td style="font-size: 12px; color: #DE9618; padding-bottom: 8px; font-family: 'Courier New', monospace;">
              Developer. Creator. Builder.
            </td>
          </tr>
          <tr>
            <td style="font-size: 12px; color: #4A3010; padding-bottom: 2px;">
              <a href="mailto:crysistm2@gmail.com" style="color: #4A3010; text-decoration: none;">crysistm2@gmail.com</a>
            </td>
          </tr>
          <tr>
            <td style="font-size: 12px; color: #4A3010;">
              <a href="https://wa.me/573192564264" style="color: #4A3010; text-decoration: none;">+57 319 256 4264</a>
               &nbsp;·&nbsp;
              <a href="https://nabaol.vercel.app" style="color: #DE9618; text-decoration: none;">nabaol.vercel.app</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
`;

function buildHtml(bodyText: string): string {
  const year = new Date().getFullYear();
  const bodyHtml = marked.parse(bodyText) as string;
  return `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#0d1117;color:#e6edf3;max-width:600px;margin:0 auto;border-radius:14px;overflow:hidden;border:1px solid #21262d;">
      <div style="background:linear-gradient(135deg,rgba(124,92,255,0.18) 0%,rgba(77,163,255,0.10) 100%);border-bottom:1px solid rgba(124,92,255,0.28);padding:1.8rem 2.5rem;text-align:center;">
        <span style="font-size:1.7rem;font-weight:800;color:#7c5cff;letter-spacing:-0.02em;">Muxlyve</span>
        <p style="margin:0.4rem 0 0;font-size:0.8rem;color:#8b949e;letter-spacing:0.06em;text-transform:uppercase;">Multistreaming de escritorio</p>
      </div>
      <div style="padding:2.2rem 2.5rem;line-height:1.78;font-size:0.97rem;color:#e6edf3;">
        ${bodyHtml}
        <div style="margin-top:2rem;padding:1.1rem 1.3rem;background:#f5f0e6;border-radius:10px;">
          ${SIGNATURE_HTML}
        </div>
      </div>
      <div style="border-top:1px solid #21262d;padding:1.25rem 2.5rem;text-align:center;font-size:0.78rem;color:#8b949e;">
        <p style="margin:0;">
          © ${year} Muxlyve &nbsp;&middot;&nbsp;
          <a href="https://muxlyve.com" style="color:#7c5cff;text-decoration:none;">muxlyve.com</a>
        </p>
        <p style="margin:0.35rem 0 0;opacity:0.65;">
          Transmite a Twitch, Kick, YouTube y TikTok sin marca de agua.
        </p>
      </div>
    </div>
  `;
}

export async function sendOutreachAction(formData: FormData): Promise<void> {
  const to = ((formData.get("to") as string) ?? "").trim();
  const subject = ((formData.get("subject") as string) ?? "").trim();
  const body = ((formData.get("body") as string) ?? "").trim();

  if (!to || !subject || !body) {
    redirect("/admin/correo?error=Todos+los+campos+son+requeridos");
  }
  if (!EMAIL_RE.test(to)) {
    redirect("/admin/correo?error=Correo+destinatario+inv%C3%A1lido");
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    redirect("/admin/correo?error=RESEND_API_KEY+no+configurado");
  }

  const from =
    process.env.RESEND_FROM_OUTREACH ??
    process.env.RESEND_FROM ??
    "noreply@muxlyve.app";

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({ from, to, subject, html: buildHtml(body) });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Error desconocido";
    redirect(`/admin/correo?error=${encodeURIComponent(msg)}`);
  }

  redirect("/admin/correo?sent=1");
}
