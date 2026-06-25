export type PlatformId = "twitch" | "kick" | "youtube" | "tiktok";

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
];
