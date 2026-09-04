"use client";

/*
 * Propiedad de BlacKraken Solutions
 * Desarrollado por: NABAOL
 * Fecha de creación: 2026-09-03
 */
import { useRef, useState } from "react";
import { savePostAction } from "./actions";

const LOCALES = [
  { value: "es", label: "Español" },
  { value: "en", label: "English" },
  { value: "pt", label: "Português" },
  { value: "fr", label: "Français" },
];

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "var(--surface)",
  border: "1px solid var(--border)",
  borderRadius: "0.4rem",
  padding: "0.6rem 0.8rem",
  color: "var(--text)",
  fontSize: "0.9rem",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.82rem",
  color: "var(--muted)",
  marginBottom: "0.35rem",
};

interface Props {
  initial?: {
    slug: string;
    locale: string;
    title: string;
    excerpt: string;
    body: string;
    status: string;
  };
}

export function PostForm({ initial }: Props) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [body, setBody] = useState(initial?.body ?? "");

  function syncBody(): void {
    setBody(editorRef.current?.innerHTML ?? "");
  }

  /** Aplica formato al bloque seleccionado del editor. */
  function format(command: string, value?: string): void {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    syncBody();
  }

  return (
    <form
      action={savePostAction}
      style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}
    >
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 260px" }}>
          <label style={labelStyle} htmlFor="title">
            Título
          </label>
          <input
            id="title"
            name="title"
            required
            maxLength={200}
            defaultValue={initial?.title}
            style={inputStyle}
          />
        </div>
        <div style={{ flex: "0 0 160px" }}>
          <label style={labelStyle} htmlFor="locale">
            Idioma
          </label>
          <select
            id="locale"
            name="locale"
            defaultValue={initial?.locale ?? "es"}
            style={inputStyle}
          >
            {LOCALES.map((l) => (
              <option key={l.value} value={l.value}>
                {l.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label style={labelStyle} htmlFor="slug">
          Slug (vacío = se genera del título)
        </label>
        <input
          id="slug"
          name="slug"
          defaultValue={initial?.slug}
          placeholder="cuanta-subida-necesito-para-multistream"
          style={inputStyle}
        />
      </div>

      <div>
        <label style={labelStyle} htmlFor="excerpt">
          Resumen (se usa en el listado y en la meta description)
        </label>
        <textarea
          id="excerpt"
          name="excerpt"
          rows={2}
          maxLength={400}
          defaultValue={initial?.excerpt}
          style={{ ...inputStyle, resize: "vertical" }}
        />
      </div>

      <div>
        <label style={labelStyle}>Cuerpo</label>
        <div
          style={{
            display: "flex",
            gap: "0.4rem",
            flexWrap: "wrap",
            marginBottom: "0.5rem",
          }}
        >
          {[
            { label: "H2", cmd: "formatBlock", val: "h2" },
            { label: "H3", cmd: "formatBlock", val: "h3" },
            { label: "Párrafo", cmd: "formatBlock", val: "p" },
            { label: "Negrita", cmd: "bold" },
            { label: "Itálica", cmd: "italic" },
            { label: "Lista", cmd: "insertUnorderedList" },
            { label: "Numerada", cmd: "insertOrderedList" },
            { label: "Cita", cmd: "formatBlock", val: "blockquote" },
          ].map((b) => (
            <button
              key={b.label}
              type="button"
              onClick={() => format(b.cmd, b.val)}
              className="btn btn-ghost"
              style={{ fontSize: "0.78rem", padding: "0.3rem 0.6rem" }}
            >
              {b.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => {
              const url = window.prompt("URL del enlace:");
              if (url) format("createLink", url);
            }}
            className="btn btn-ghost"
            style={{ fontSize: "0.78rem", padding: "0.3rem 0.6rem" }}
          >
            Enlace
          </button>
        </div>
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          onInput={syncBody}
          onBlur={syncBody}
          dangerouslySetInnerHTML={{ __html: initial?.body ?? "" }}
          style={{
            ...inputStyle,
            minHeight: "340px",
            maxHeight: "60vh",
            overflowY: "auto",
            lineHeight: 1.7,
          }}
        />
        <input type="hidden" name="body" value={body} />
        <p
          style={{
            color: "var(--muted)",
            fontSize: "0.78rem",
            marginTop: "0.4rem",
          }}
        >
          El HTML se sanitiza al guardar: solo pasan etiquetas de texto, listas,
          enlaces, imágenes y tablas.
        </p>
      </div>

      <div
        style={{
          display: "flex",
          gap: "0.8rem",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <label style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
          <input
            type="checkbox"
            name="status"
            value="published"
            defaultChecked={initial?.status === "published"}
          />
          <span style={{ fontSize: "0.9rem" }}>Publicar</span>
        </label>
        <button type="submit" className="btn btn-primary">
          Guardar
        </button>
      </div>
    </form>
  );
}
