"use client";

import { useEffect } from "react";

/* mancha de luz que sigue al cursor en cualquier .btn-primary/.btn-ghost
   del sitio — un solo listener global, sin envolver cada botón en un
   componente cliente. Mismo efecto que el botón del hero (GlassButton),
   generalizado vía CSS custom properties. */
export function GlassSpotlight() {
  useEffect(() => {
    function handlePointerMove(e: PointerEvent) {
      if (!(e.target instanceof Element)) return;
      const btn = e.target.closest<HTMLElement>(".btn-primary, .btn-ghost");
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      btn.style.setProperty("--x", `${((e.clientX - rect.left) / rect.width) * 100}%`);
      btn.style.setProperty("--y", `${((e.clientY - rect.top) / rect.height) * 100}%`);
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  return null;
}
