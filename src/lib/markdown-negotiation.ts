/*
 * Propiedad de BlacKraken Solutions
 * Desarrollado por: NABAOL
 * Fecha de creación: 2026-08-27
 */

// Implementa el negociado de contenido descrito en acceptmarkdown.com/recipes/nextjs
// (RFC 9110 §12.5.1): rangos específicos del Accept header ganan sobre los
// genéricos sin importar el q — "text/html;q=0, */*;q=1" debe rechazar
// text/html en vez de dejar que el wildcard lo sobreescriba.

interface AcceptEntry {
  type: string;
  q: number;
  specificity: number;
}

export function parseAccept(header: string): AcceptEntry[] {
  return header
    .split(",")
    .map((raw) => {
      const parts = raw
        .trim()
        .split(";")
        .map((s) => s.trim());
      const type = parts[0].toLowerCase();
      let q = 1;
      for (const param of parts.slice(1)) {
        const [name, value] = param.split("=").map((s) => s.trim());
        if (name === "q") {
          const parsed = Number(value);
          if (!Number.isNaN(parsed)) q = Math.max(0, Math.min(1, parsed));
        }
      }
      const specificity = type === "*/*" ? 0 : type.endsWith("/*") ? 1 : 2;
      return { type, q, specificity };
    })
    .filter((entry) => entry.type.length > 0);
}

function acceptMatches(entry: AcceptEntry, candidate: string): boolean {
  if (entry.type === "*/*") return true;
  if (entry.type.endsWith("/*")) return candidate.startsWith(entry.type.slice(0, -1));
  return entry.type === candidate;
}

// `produces` lista, en orden de preferencia del servidor, los content-types
// que la ruta actual puede servir (p.ej. ["text/html", "text/markdown"]).
export function preferredType(header: string | null, produces: string[]): string | null {
  if (produces.length === 0) return null;
  if (!header) return produces[0];

  const entries = parseAccept(header);
  if (entries.length === 0) return produces[0];

  let bestType: string | null = null;
  let bestQ = -1;
  let bestPosition = Infinity;

  for (const candidate of produces) {
    let matched: AcceptEntry | null = null;
    let matchedPosition = Infinity;
    for (let idx = 0; idx < entries.length; idx++) {
      const e = entries[idx];
      if (!acceptMatches(e, candidate)) continue;
      if (
        matched === null ||
        e.specificity > matched.specificity ||
        (e.specificity === matched.specificity && idx < matchedPosition)
      ) {
        matched = e;
        matchedPosition = idx;
      }
    }
    if (matched === null) continue;
    if (matched.q <= 0) continue; // rechazo explícito

    if (matched.q > bestQ || (matched.q === bestQ && matchedPosition < bestPosition)) {
      bestQ = matched.q;
      bestPosition = matchedPosition;
      bestType = candidate;
    }
  }

  return bestType;
}

export function appendVaryAccept(headers: Headers): void {
  const existing = headers.get("Vary");
  if (!existing) {
    headers.set("Vary", "Accept");
    return;
  }
  const tokens = existing.split(",").map((s) => s.trim().toLowerCase());
  if (!tokens.includes("accept")) {
    headers.set("Vary", `${existing}, Accept`);
  }
}
