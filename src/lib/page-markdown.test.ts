/*
 * Propiedad de BlacKraken Solutions
 * Desarrollado por: NABAOL
 * Fecha de creación: 2026-08-27
 */
import { describe, it, expect } from "vitest";
import {
  buildHomeMarkdown,
  buildAboutMarkdown,
  buildContactMarkdown,
  buildPrivacyMarkdown,
} from "./page-markdown";

const BUILDERS = {
  home: buildHomeMarkdown,
  about: buildAboutMarkdown,
  contact: buildContactMarkdown,
  privacy: buildPrivacyMarkdown,
};

describe.each(Object.entries(BUILDERS))("build%sMarkdown", (name, build) => {
  const md = build();

  it(`${name}: starts with a single H1`, () => {
    expect(md.trim().startsWith("# ")).toBe(true);
    expect(md.match(/^# /gm)?.length).toBe(1);
  });

  it(`${name}: has at least 500 characters`, () => {
    expect(md.length).toBeGreaterThanOrEqual(500);
  });

  it(`${name}: is pure/deterministic (no request context needed)`, () => {
    expect(build()).toBe(md);
  });
});

describe("buildAboutMarkdown", () => {
  it("mentions the developer and a contact method", () => {
    const md = buildAboutMarkdown();
    expect(md).toContain("BlacKraken Solutions");
    expect(md).toContain("soporte@muxlyve.com");
  });
});

describe("buildContactMarkdown", () => {
  it("includes the support email and the Discord invite", () => {
    const md = buildContactMarkdown();
    expect(md).toContain("soporte@muxlyve.com");
    expect(md).toContain("discord.gg");
  });
});

describe("buildPrivacyMarkdown", () => {
  it("discloses the Google/YouTube OAuth scope", () => {
    const md = buildPrivacyMarkdown();
    expect(md).toContain("youtube.readonly");
    expect(md).toContain("solo lectura");
  });
});

describe("buildHomeMarkdown", () => {
  it("links to the trust anchor pages", () => {
    const md = buildHomeMarkdown();
    expect(md).toContain("/about");
    expect(md).toContain("/contact");
    expect(md).toContain("/privacy");
  });
});
