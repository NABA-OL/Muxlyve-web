/*
 * Propiedad de BlacKraken Solutions
 * Desarrollado por: NABAOL
 * Fecha de creación: 2026-10-09
 * Correo: nabaol.dev@gmail.com
 * Copyright (c) 2026 BlacKraken Solutions. Todos los derechos reservados.
 */

interface Props {
  size?: number;
  className?: string;
}

// PROVISIONAL: círculo cian con la inicial "S" hasta recibir el logo
// definitivo de Starvios. Al llegar, reemplazar este componente por el
// path oficial dentro de PlatformIcon y borrar este archivo.
export function StarviosPlaceholderIcon({ size = 24, className }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
    >
      <circle cx="12" cy="12" r="11" fill="#22d3ee" />
      <text
        x="12"
        y="16.5"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fontFamily="var(--font-inter), system-ui, sans-serif"
        fill="#0d1117"
      >
        S
      </text>
    </svg>
  );
}
