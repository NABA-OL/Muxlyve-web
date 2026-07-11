// Desarrollado por BlacKraken Solutions
"use client";
import { useRef, useState } from "react";

const editorStyle = {
  background: "var(--surface)",
  border: "1px solid var(--border)",
  borderRadius: "0.4rem",
  padding: "0.8rem 1rem",
  color: "var(--fg)",
  fontSize: "0.9rem",
  lineHeight: 1.65,
  minHeight: "260px",
  maxHeight: "520px",
  overflowY: "auto" as const,
};

export function BodyEditor() {
  const editorRef = useRef<HTMLDivElement>(null);
  const [html, setHtml] = useState("");

  function sync(): void {
    setHtml(editorRef.current?.innerHTML ?? "");
  }

  return (
    <>
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={sync}
        onBlur={sync}
        style={editorStyle}
      />
      <input type="hidden" name="body" value={html} />
    </>
  );
}
