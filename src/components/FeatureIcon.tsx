import type { ReactNode } from "react";

export type FeatureIconId =
  | "no-watermark"
  | "monitor"
  | "reconnect"
  | "eye"
  | "price-tag"
  | "compatible"
  | "clock"
  | "bar-chart"
  | "layers"
  | "history"
  | "chat"
  | "browser"
  | "record"
  | "scissors"
  | "wifi"
  | "globe"
  | "bell"
  | "mic-off"
  | "export-import";

// ponytail: glifos lineales propios (mismo peso que StreamDeckIcon,
// strokeWidth 1.6), no librería externa — reemplaza los emojis de features.
const ICONS: Record<FeatureIconId, ReactNode> = {
  "no-watermark": (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <circle cx="17.5" cy="7.5" r="2.5" />
      <line x1="15.9" y1="5.9" x2="19.1" y2="9.1" />
    </>
  ),
  monitor: (
    <>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <line x1="8" y1="20" x2="16" y2="20" />
      <line x1="12" y1="16" x2="12" y2="20" />
    </>
  ),
  reconnect: (
    <>
      <path d="M4 12a8 8 0 0 1 13.66-5.66L20 8" />
      <path d="M20 4v4h-4" />
      <path d="M20 12a8 8 0 0 1-13.66 5.66L4 16" />
      <path d="M4 20v-4h4" />
    </>
  ),
  eye: (
    <>
      <path d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12z" />
      <circle cx="12" cy="12" r="2.6" />
    </>
  ),
  "price-tag": (
    <>
      <path d="M12.6 3H5a2 2 0 0 0-2 2v7.6a2 2 0 0 0 .59 1.41l8.4 8.4a2 2 0 0 0 2.82 0l6.6-6.6a2 2 0 0 0 0-2.82l-8.4-8.4A2 2 0 0 0 12.6 3z" />
      <circle cx="8.3" cy="8.3" r="1.3" fill="currentColor" stroke="none" />
    </>
  ),
  compatible: (
    <>
      <path d="M9 15l6-6" />
      <path d="M10.5 5.5l1-1a3.5 3.5 0 0 1 5 5l-1 1" />
      <path d="M13.5 18.5l-1 1a3.5 3.5 0 0 1-5-5l1-1" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </>
  ),
  "bar-chart": (
    <>
      <line x1="5" y1="20" x2="5" y2="12" />
      <line x1="12" y1="20" x2="12" y2="7" />
      <line x1="19" y1="20" x2="19" y2="15" />
    </>
  ),
  layers: (
    <>
      <path d="M12 3l9 5-9 5-9-5 9-5z" />
      <path d="M3 13l9 5 9-5" />
    </>
  ),
  history: (
    <>
      <path d="M3 12a9 9 0 1 0 3-6.7" />
      <path d="M3 4v5h5" />
      <path d="M12 8v4l3 2" />
    </>
  ),
  chat: (
    <path d="M4 5h16a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H9l-5 4v-4H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z" />
  ),
  browser: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <circle cx="6.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
      <circle cx="9" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
    </>
  ),
  record: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <circle cx="12" cy="12" r="4" fill="currentColor" stroke="none" />
    </>
  ),
  scissors: (
    <>
      <circle cx="6" cy="6" r="2.4" />
      <circle cx="6" cy="18" r="2.4" />
      <line x1="8" y1="7.5" x2="20" y2="18" />
      <line x1="8" y1="16.5" x2="20" y2="6" />
    </>
  ),
  wifi: (
    <>
      <path d="M2 8.5a15 15 0 0 1 20 0" />
      <path d="M5.5 12a10 10 0 0 1 13 0" />
      <path d="M9 15.5a5 5 0 0 1 6 0" />
      <circle cx="12" cy="19" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <path d="M12 3a13 13 0 0 1 0 18" />
      <path d="M12 3a13 13 0 0 0 0 18" />
    </>
  ),
  bell: (
    <>
      <path d="M6 10a6 6 0 0 1 12 0v4l1.5 3h-15L6 14v-4z" />
      <path d="M10 20a2 2 0 0 0 4 0" />
    </>
  ),
  "mic-off": (
    <>
      <path d="M12 15a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v1" />
      <path d="M19 11a7 7 0 0 1-7 7 7 7 0 0 1-7-7" />
      <line x1="12" y1="18" x2="12" y2="22" />
      <line x1="3" y1="3" x2="21" y2="21" />
    </>
  ),
  "export-import": (
    <>
      <path d="M12 3v10" />
      <path d="M8 9l4 4 4-4" />
      <path d="M4 17v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3" />
    </>
  ),
};

interface Props {
  id: FeatureIconId;
  size?: number;
  className?: string;
}

export function FeatureIcon({ id, size = 24, className }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {ICONS[id]}
    </svg>
  );
}
