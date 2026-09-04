/*
 * Propiedad de BlacKraken Solutions <blackraken.com>
 * Desarrollado por: NABAOL
 * Fecha de creación: 2026-08-27
 */
import { describe, it, expect } from "vitest";
import { parseAccept, preferredType, appendVaryAccept } from "./markdown-negotiation";

const PRODUCES = ["text/html", "text/markdown"];

describe("parseAccept", () => {
  it("parses a single type with default q=1", () => {
    expect(parseAccept("text/markdown")).toEqual([
      { type: "text/markdown", q: 1, specificity: 2 },
    ]);
  });

  it("parses explicit q values", () => {
    const entries = parseAccept("text/html;q=0.8, text/markdown;q=0.9");
    expect(entries).toEqual([
      { type: "text/html", q: 0.8, specificity: 2 },
      { type: "text/markdown", q: 0.9, specificity: 2 },
    ]);
  });

  it("clamps out-of-range q values", () => {
    const entries = parseAccept("text/markdown;q=5");
    expect(entries[0].q).toBe(1);
  });

  it("assigns specificity: 0 for */*, 1 for type/*, 2 for exact", () => {
    const entries = parseAccept("*/*, text/*, text/markdown");
    expect(entries.map((e) => e.specificity)).toEqual([0, 1, 2]);
  });
});

describe("preferredType", () => {
  it("defaults to the first produced type when there is no Accept header", () => {
    expect(preferredType(null, PRODUCES)).toBe("text/html");
  });

  it("defaults to the first produced type on an empty Accept header", () => {
    expect(preferredType("", PRODUCES)).toBe("text/html");
  });

  it("picks text/markdown when explicitly requested", () => {
    expect(preferredType("text/markdown", PRODUCES)).toBe("text/markdown");
  });

  it("picks the highest-q candidate across mixed types", () => {
    expect(preferredType("text/html;q=0.5, text/markdown;q=0.9", PRODUCES)).toBe(
      "text/markdown",
    );
  });

  it("breaks ties on client order — markdown listed first wins", () => {
    expect(preferredType("text/markdown, text/html, */*", PRODUCES)).toBe(
      "text/markdown",
    );
  });

  it("matches wildcards, preferring server order for equal specificity", () => {
    expect(preferredType("*/*", PRODUCES)).toBe("text/html");
  });

  // RFC 9110 §12.5.1: a more specific range overrides a less specific one
  // regardless of q — text/html;q=0 must reject html even though */* offers q=1.
  it("honors an explicit rejection over a wildcard fallback", () => {
    expect(preferredType("text/html;q=0, */*;q=1", PRODUCES)).toBe("text/markdown");
  });

  it("returns null when every producible type is explicitly rejected", () => {
    expect(preferredType("text/html;q=0, text/markdown;q=0", PRODUCES)).toBeNull();
  });

  it("returns null when the client only accepts an unsupported type", () => {
    expect(preferredType("application/json", PRODUCES)).toBeNull();
  });
});

describe("appendVaryAccept", () => {
  it("sets Vary: Accept when there is no existing Vary header", () => {
    const headers = new Headers();
    appendVaryAccept(headers);
    expect(headers.get("Vary")).toBe("Accept");
  });

  it("appends Accept to an existing Vary header", () => {
    const headers = new Headers({ Vary: "Accept-Encoding" });
    appendVaryAccept(headers);
    expect(headers.get("Vary")).toBe("Accept-Encoding, Accept");
  });

  it("does not duplicate Accept if already present (case-insensitive)", () => {
    const headers = new Headers({ Vary: "accept, Accept-Encoding" });
    appendVaryAccept(headers);
    expect(headers.get("Vary")).toBe("accept, Accept-Encoding");
  });
});
