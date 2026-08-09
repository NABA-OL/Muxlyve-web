"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { HELP_ARTICLES } from "@/lib/help-articles";
import styles from "@/app/ayuda/ayuda.module.css";

function normalize(value: string): string {
  return value
    .toLocaleLowerCase("es")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

export function HelpSearchPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMac, setIsMac] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // default (SSR y primer render) es "Ctrl K" — se corrige a "⌘K" tras montar
  // si el SO es Mac, para no depender de navigator durante el render server
  useEffect(() => {
    setIsMac(/Mac|iPod|iPhone|iPad/.test(navigator.platform));
  }, []);

  const normalizedQuery = normalize(query.trim());
  // vacío: no repetir la lista completa que ya está en el sidebar detrás
  const results = normalizedQuery
    ? HELP_ARTICLES.filter((a) =>
        normalize(`${a.title} ${a.summary}`).includes(normalizedQuery),
      )
    : [];

  function close() {
    setOpen(false);
    setQuery("");
    setActiveIndex(0);
  }

  function goTo(slug: string) {
    close();
    router.push(`/ayuda/${slug}`);
  }

  // atajo global: Cmd+K (Mac) / Ctrl+K (Windows/Linux) abre, Escape cierra
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
        return;
      }
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    inputRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  function onInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const picked = results[activeIndex];
      if (picked) goTo(picked.slug);
    }
  }

  return (
    <>
      <button
        type="button"
        className={styles.searchTrigger}
        onClick={() => setOpen(true)}
        aria-label={`Buscar en la ayuda (${isMac ? "Cmd" : "Ctrl"}+K)`}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <kbd className={styles.searchKbd} aria-hidden="true">
          {isMac ? "⌘K" : "Ctrl K"}
        </kbd>
      </button>

      {open && (
        <div
          className={styles.searchOverlay}
          role="dialog"
          aria-modal="true"
          aria-label="Buscar en la ayuda"
          onClick={close}
        >
          <div
            className={styles.searchPanel}
            onClick={(e) => e.stopPropagation()}
          >
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={onInputKeyDown}
              placeholder="Buscar en la ayuda…"
              aria-label="Buscar artículos de ayuda"
              className={styles.searchInput}
            />
            {results.length > 0 ? (
              <ul className={styles.searchResults}>
                {results.map((a, i) => (
                  <li key={a.slug}>
                    <button
                      type="button"
                      className={`${styles.searchResult} ${
                        i === activeIndex ? styles.searchResultActive : ""
                      }`}
                      onMouseEnter={() => setActiveIndex(i)}
                      onClick={() => goTo(a.slug)}
                    >
                      <span className={styles.searchResultTitle}>{a.title}</span>
                      <span className={styles.searchResultSummary}>{a.summary}</span>
                    </button>
                  </li>
                ))}
              </ul>
            ) : normalizedQuery ? (
              <p className={styles.sidebarEmpty}>
                Sin resultados para &quot;{query.trim()}&quot;.
              </p>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
}
