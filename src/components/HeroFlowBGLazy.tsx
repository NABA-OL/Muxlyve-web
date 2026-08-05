"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const HeroFlowBG = dynamic(
  () => import("./HeroFlowBG").then((m) => m.HeroFlowBG),
  { ssr: false },
);

export function HeroFlowBGLazy() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // decorativo: se difiere a un momento idle para no competir por el
    // hilo principal con la hidratación inicial (TBT en móvil)
    const ric = window.requestIdleCallback;
    if (!ric) {
      const id = window.setTimeout(() => setReady(true), 200);
      return () => window.clearTimeout(id);
    }
    const id = ric(() => setReady(true), { timeout: 2000 });
    return () => window.cancelIdleCallback(id);
  }, []);

  if (!ready) return null;
  return <HeroFlowBG />;
}
