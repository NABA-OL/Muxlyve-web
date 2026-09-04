/*
 * Propiedad de BlacKraken Solutions <blackraken.com>
 * Desarrollado por: NABAOL
 * Fecha de creación: 2026-08-13
 *  * Correo: nabaol.dev@gmail.com
 * Copyright (c) 2026 BlacKraken Solutions. Todos los derechos reservados.
 */

import type { ReactNode } from "react";
import { setRequestLocale } from "next-intl/server";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { AyudaSidebar } from "@/components/help/AyudaSidebar";
import styles from "./ayuda.module.css";

export default async function AyudaLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Nav />
      <main id="main-content">
        <section className={styles.section}>
          <div className={`container ${styles.layout}`}>
            <AyudaSidebar />
            <div className={styles.content}>{children}</div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
