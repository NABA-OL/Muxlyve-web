import type { ReactNode } from "react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { AyudaSidebar } from "@/components/help/AyudaSidebar";
import styles from "./ayuda.module.css";

export default function AyudaLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Nav />
      <main>
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
