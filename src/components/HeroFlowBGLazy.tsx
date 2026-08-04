"use client";

import dynamic from "next/dynamic";

const HeroFlowBG = dynamic(
  () => import("./HeroFlowBG").then((m) => m.HeroFlowBG),
  { ssr: false },
);

export function HeroFlowBGLazy() {
  return <HeroFlowBG />;
}
