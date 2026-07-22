import type { ReactNode } from "react";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import styles from "@/app/ayuda/ayuda.module.css";

interface Props {
  title: string;
  children: ReactNode;
}

export function ArticleLayout({ title, children }: Props) {
  return (
    <>
      <Nav />
      <main>
        <section>
          <div className="container" style={{ maxWidth: "760px" }}>
            <span className="eyebrow">Ayuda</span>
            <h1 className="section-title" style={{ fontSize: "var(--text-h2)" }}>
              {title}
            </h1>
            <div className={styles.prose}>{children}</div>
            <p className={styles.back}>
              <Link href="/ayuda">← Volver a Ayuda</Link>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
