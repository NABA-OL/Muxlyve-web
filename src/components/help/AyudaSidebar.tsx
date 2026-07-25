"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HELP_ARTICLES } from "@/lib/help-articles";
import styles from "@/app/ayuda/ayuda.module.css";

export function AyudaSidebar() {
  const pathname = usePathname();

  return (
    <nav className={styles.sidebar} aria-label="Artículos de ayuda">
      <span className={styles.sidebarEyebrow}>Ayuda</span>
      <ul className={styles.sidebarList}>
        {HELP_ARTICLES.map((a) => {
          const href = `/ayuda/${a.slug}`;
          const active = pathname === href;
          return (
            <li key={a.slug}>
              <Link
                href={href}
                className={`${styles.sidebarLink} ${active ? styles.sidebarLinkActive : ""}`}
              >
                {a.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
