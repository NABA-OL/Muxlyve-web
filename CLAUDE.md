# Muxlyve — Web

Landing, centro de ayuda, licencias y panel admin de Muxlyve (app de escritorio de multistreaming). Next.js App Router + Neon Postgres, deploy en Vercel.

## Stack

- **Framework:** Next.js 16.2.9 (App Router, Turbopack) + React 19.2.4
- **Lenguaje:** TypeScript 5, `strict: true`, alias `@/*` → `src/*`
- **Base de datos:** Neon Postgres serverless (`@neondatabase/serverless`), schema con migraciones `IF NOT EXISTS` en `src/lib/db.ts` (sin ORM)
- **Correo:** Resend (`src/lib/email.ts`)
- **Pagos/licencias:** Freemius (webhook en `src/app/api/webhook/pago`)
- **Sanitización HTML:** `sanitize-html`
- **Lint:** ESLint 9 (`eslint-config-next`)
- **Sin librería de CSS:** CSS Modules + `globals.css`, tokens en variables CSS (paleta oscura, acento `#7c5cff`)

## Commands

```bash
npm run dev     # Next dev server (Turbopack), puerto 3000
npm run build   # build de producción
npm run start   # sirve el build de producción
npm run lint    # eslint
```

No hay test runner configurado todavía.

## Estructura

```
src/app/
  page.tsx              # landing
  ayuda/                # centro de ayuda (sidebar + artículos, layout.tsx compartido)
  descargar/             # página de descarga (lee última release de GitHub)
  gestionar-licencia/    # autogestión de licencia del usuario
  privacidad/ terminos/  # legales
  admin/                 # panel admin protegido (login, precios, banner, correo, reportes, feedback, contraseña)
  api/
    licenses/            # activate/validate/status/release
    support/             # report (bugs) y feedback (ideas), mismo patrón, tablas separadas
    webhook/pago/         # webhook de Freemius
    download/[platform]/  # descarga de instaladores
src/lib/                 # db.ts (schema+queries), admin-auth.ts, email.ts, licenses.ts, settings.ts, help-articles.ts (registro de artículos de ayuda)
src/components/          # Nav, Footer, Hero, iconos; components/help/ para el centro de ayuda
src/middleware.ts        # protege /admin/* por cookie de sesión
```

## Convenciones del proyecto

- Todo texto de cara al proyecto (UI, docs, contenido) en **español neutro/colombiano, nunca voseo**.
- Header de archivo `// Desarrollado por BlacKraken Solutions` en archivos que ya lo traen — mantener el patrón al tocarlos.
- Patrón admin: cada sección nueva de contenido moderable (reportes, feedback) sigue el mismo esquema — tabla propia en Neon con `status`, endpoint público de submit con rate-limit por IP + límite de tamaño, página admin con server actions para cambiar estado, protegida automáticamente por el middleware (`/admin/:path*`).
- Artículos de ayuda: un `page.tsx` por artículo bajo `src/app/ayuda/<slug>/`, registrados en `src/lib/help-articles.ts` (fuente de verdad para sidebar, orden, y pager Anterior/Siguiente). Capturas vía `ScreenshotPlaceholder` (chequea `fs.existsSync` en build — si no existe el archivo en `public/help/`, muestra placeholder con la ruta esperada).

## Variables de entorno (`.env.local`)

Ver `.env.local.example` para la lista completa: `NEXT_PUBLIC_SITE_URL`, `GITHUB_REPO`/`GITHUB_TOKEN`, `FREEMIUS_SECRET_KEY`, `DATABASE_URL`, `RESEND_API_KEY`/`RESEND_FROM`/`RESEND_FROM_OUTREACH`, `ADMIN_TOKEN`.
