/*
 * Propiedad de BlacKraken Solutions
 * Desarrollado por: NABAOL
 * Fecha de creación: 2026-06-24
 * Correo: nabaol.dev@gmail.com
 * Copyright (c) 2026 BlacKraken Solutions. Todos los derechos reservados.
 */

export type PlatformId = "twitch" | "kick" | "youtube" | "tiktok" | "starvios";

export interface Platform {
  id: PlatformId;
  name: string;
  /** Color de marca (también expuesto como var CSS en globals). */
  color: string;
}

export const PLATFORMS: readonly Platform[] = [
  { id: "twitch", name: "Twitch", color: "#9146ff" },
  { id: "kick", name: "Kick", color: "#53fc18" },
  { id: "youtube", name: "YouTube", color: "#ff0000" },
  { id: "tiktok", name: "TikTok", color: "#25f4ee" },
  // PROVISIONAL: color del placeholder de Starvios hasta recibir su logo definitivo.
  { id: "starvios", name: "Starvios", color: "#22d3ee" },
];
