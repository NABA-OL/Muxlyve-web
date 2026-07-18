interface Props {
  size?: number;
  className?: string;
}

// ponytail: glifo genérico de "dispositivo con grilla de botones" — no el
// logo real de Elgato (evita uso de marca registrada sin permiso).
export function StreamDeckIcon({ size = 24, className }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <rect x="1" y="1" width="22" height="22" rx="3" stroke="currentColor" strokeWidth="1.6" />
      <rect x="4.2" y="4.2" width="4.6" height="4.6" rx="1" fill="currentColor" />
      <rect x="9.7" y="4.2" width="4.6" height="4.6" rx="1" fill="currentColor" />
      <rect x="15.2" y="4.2" width="4.6" height="4.6" rx="1" fill="currentColor" />
      <rect x="4.2" y="9.7" width="4.6" height="4.6" rx="1" fill="currentColor" />
      <rect x="9.7" y="9.7" width="4.6" height="4.6" rx="1" fill="currentColor" />
      <rect x="15.2" y="9.7" width="4.6" height="4.6" rx="1" fill="currentColor" />
    </svg>
  );
}
