"use client";

import { useFormStatus } from "react-dom";

export function LoginSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="btn btn-primary"
      disabled={pending}
      style={{ justifyContent: "center" }}
    >
      {pending ? "Entrando…" : "Entrar"}
    </button>
  );
}
