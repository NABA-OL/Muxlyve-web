// Desarrollado por BlacKraken Solutions
"use server";
import { requireAdmin } from "@/lib/admin-guard";
import { Resend } from "resend";
import { redirect } from "next/navigation";
import sanitizeHtml from "sanitize-html";

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
              <a href="mailto:nabaol.dev@gmail.com" style="color: #4A3010; text-decoration: none;">nabaol.dev@gmail.com</a>
            </td>
          </tr>
          <tr>
            <td style="font-size: 12px; color: #4A3010;">
              <a href="https://wa.me/573192564264" style="color: #4A3010; text-decoration: none;">
                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBmaWxsPSIjNEEzMDEwIiBkPSJNMTYgMEM3LjE2MyAwIDAgNy4xNjMgMCAxNmMwIDIuODIuNzM1IDUuNDcgMi4wMiA3Ljc3TDAgMzJsOC40NC0yLjAxQTE1LjkgMTUuOSAwIDAgMCAxNiAzMmM4LjgzNyAwIDE2LTcuMTYzIDE2LTE2UzI0LjgzNyAwIDE2IDB6bTguOTggMjIuNmMtLjM3IDEuMDQtMi4xNiAyLTMgMi4xNC0uNzcuMTMtMS43NS4xOS0yLjgyLS4xOC0uNjUtLjIyLTEuNDktLjUxLTIuNTctLjk5LTQuNTMtMS45Ni03LjQ4LTYuNS03LjcxLTYuOC0uMjItLjMtMS44NC0yLjQ0LTEuODQtNC42NSAwLTIuMjEgMS4xNi0zLjMgMS41Ny0zLjc1LjQxLS40NS45LS41NiAxLjItLjU2LjMgMCAuNiAwIC44Ni4wMS4yOC4wMS42NS0uMTEgMS4wMi43OC4zNy45IDEuMjYgMy4xMSAxLjM3IDMuMzMuMTEuMjIuMTkuNDguMDQuNzgtLjE1LjMtLjIyLjQ4LS40NC43NC0uMjIuMjYtLjQ2LjU4LS42Ni43OC0uMjIuMjItLjQ1LjQ2LS4xOS45LjI2LjQ1IDEuMTQgMS44OCAyLjQ1IDMuMDUgMS42OCAxLjUgMy4xIDEuOTYgMy41NSAyLjE4LjQ1LjIyLjcxLjE5Ljk3LS4xMS4yNi0uMyAxLjExLTEuMjkgMS40MS0xLjc0LjMtLjQ1LjYtLjM3IDEuMDEtLjIyLjQxLjE1IDIuNjEgMS4yMyAzLjA2IDEuNDUuNDUuMjIuNzUuMzMuODYuNTIuMTEuMTkuMTEgMS4xMS0uMjYgMi4xNXoiLz48L3N2Zz4=" width="12" height="12" alt="" style="vertical-align: -2px; margin-right: 4px; border: 0;" />+57 319 256 4264
              </a>
               &nbsp;·&nbsp;
              <a href="https://nabaol.vercel.app" style="color: #DE9618; text-decoration: none;">
                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiNERTk2MTgiIHN0cm9rZS13aWR0aD0iMS42IiBkPSJNMTIgMjFhOSA5IDAgMSAwIDAtMTggOSA5IDAgMCAwIDAgMThaIi8+PHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjREU5NjE4IiBzdHJva2Utd2lkdGg9IjEuNiIgZD0iTTMuNiA5aDE2LjhNMy42IDE1aDE2LjhNMTEuNSAzYTE1IDE1IDAgMCAwIDAgMThNMTIuNSAzYTE1IDE1IDAgMCAxIDAgMTgiLz48L3N2Zz4=" width="12" height="12" alt="" style="vertical-align: -2px; margin-right: 3px; border: 0;" /><img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOSIgaGVpZ2h0PSI5IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjREU5NjE4IiBzdHJva2Utd2lkdGg9IjIuMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBkPSJNNyAxNyAxNyA3TTkgN2g4djgiLz48L3N2Zz4=" width="9" height="9" alt="" style="vertical-align: 1px; border: 0;" />
              </a>
            </td>
          </tr>
          <tr>
            <td style="font-size: 12px; color: #4A3010; padding-top: 2px;">
              <a href="https://discord.gg/kfkyqUgz" style="color: #4A3010; text-decoration: none;">
                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTMiIGhlaWdodD0iMTMiIHZpZXdCb3g9IjAgMCAyNDUgMjQwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGZpbGw9IiM0QTMwMTAiIGQ9Ik0xMDQuNCAxMDMuOWMtNS43IDAtMTAuMiA1LTEwLjIgMTEuMXM0LjYgMTEuMSAxMC4yIDExLjFjNS43IDAgMTAuMi01IDEwLjItMTEuMS4xLTYuMS00LjUtMTEuMS0xMC4yLTExLjF6bTM4LjIgMGMtNS43IDAtMTAuMiA1LTEwLjIgMTEuMXM0LjYgMTEuMSAxMC4yIDExLjFjNS43IDAgMTAuMi01IDEwLjItMTEuMXMtNC41LTExLjEtMTAuMi0xMS4xeiIvPjxwYXRoIGZpbGw9IiM0QTMwMTAiIGQ9Ik0xODkuNSAyMGgtMTM0QzQ0LjIgMjAgMzUgMjkuMiAzNSA0MC42djEzNS4yYzAgMTEuNCA5LjIgMjAuNiAyMC41IDIwLjZoMTEzLjRsLTUuMy0xOC41IDEyLjggMTEuOSAxMi4xIDExLjIgMjEuNSAxOVY0MC42YzAtMTEuNC05LjItMjAuNi0yMC41LTIwLjZ6bS0zOC42IDEzMC45cy0zLjYtNC4zLTYuNi04LjFjMTMuMS0zLjcgMTguMS0xMS45IDE4LjEtMTEuOS00LjEgMi43LTggNC42LTExLjUgNS45LTUgMi4xLTkuOCAzLjUtMTQuNSA0LjMtOS42IDEuOC0xOC40IDEuMy0yNS45LS4xLTUuNy0xLjEtMTAuNi0yLjYtMTQuNy00LjMtMi4zLS45LTQuOC0yLTcuMy0zLjQtLjMtLjItLjYtLjMtLjktLjUtLjItLjEtLjMtLjItLjQtLjMtMS44LTEtMi44LTEuNy0yLjgtMS43czQuOCA4IDE3LjUgMTEuOGMtMyAzLjgtNi43IDguMy02LjcgOC4zLTIyLjEtLjctMzAuNS0xNS4yLTMwLjUtMTUuMiAwLTMyLjIgMTQuNC01OC4zIDE0LjQtNTguMyAxNC40LTEwLjggMjguMS0xMC41IDI4LjEtMTAuNWwxIDEuMmMtMTggNS4yLTI2LjMgMTMuMS0yNi4zIDEzLjFzMi4yLTEuMiA1LjktMi45YzEwLjctNC43IDE5LjItNiAyMi43LTYuMy42LS4xIDEuMS0uMiAxLjctLjIgNi4xLS44IDEzLTEgMjAuMi0uMiA5LjUgMS4xIDE5LjcgMy45IDMwLjEgOS42IDAgMC03LjktNy41LTI0LjktMTIuN2wxLjQtMS42czEzLjctLjMgMjguMSAxMC41YzAgMCAxNC40IDI2LjEgMTQuNCA1OC4zIDAtLjEtOC40IDE0LjQtMzAuNSAxNS4xeiIvPjwvc3ZnPg==" width="13" height="13" alt="" style="vertical-align: -2px; margin-right: 4px; border: 0;" />Discord
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
`;

function buildHtml(bodyText: string): string {
  const year = new Date().getFullYear();
  const bodyHtml = sanitizeHtml(bodyText, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img", "span", "u", "font"]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      "*": ["style", "class"],
      img: ["src", "alt", "width", "height", "style"],
      a: ["href", "name", "target", "style"],
      font: ["color", "size", "face"],
    },
    allowedSchemes: ["http", "https", "mailto", "data"],
  });
  return `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#0d1117;color:#e6edf3;max-width:1200px;margin:0 auto;border-radius:14px;overflow:hidden;border:1px solid #21262d;">
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
          Transmite a Twitch, Kick, YouTube, TikTok y Starvios sin marca de agua.
        </p>
      </div>
    </div>
  `;
}

export async function sendOutreachAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const to = ((formData.get("to") as string) ?? "").trim();
  const subject = ((formData.get("subject") as string) ?? "").trim();
  const body = ((formData.get("body") as string) ?? "").trim();
  const bodyIsEmpty = body.replace(/<[^>]*>/g, "").trim().length === 0;

  if (!to || !subject || bodyIsEmpty) {
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
