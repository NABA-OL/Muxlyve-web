/*
 * Propiedad de BlacKraken Solutions
 * Desarrollado por: NABAOL
 * Fecha de creación: 2026-10-10
 * Correo: nabaol.dev@gmail.com
 * Copyright (c) 2026 BlacKraken Solutions. Todos los derechos reservados.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const cookieValue = vi.hoisted(() => ({ current: undefined as string | undefined }));
const storedToken = vi.hoisted(() => ({ current: null as string | null }));

vi.mock("next/headers", () => ({
  cookies: async () => ({
    get: (name: string) =>
      name === "admin_session" && cookieValue.current !== undefined
        ? { value: cookieValue.current }
        : undefined,
  }),
}));

vi.mock("next/navigation", () => ({
  redirect: (path: string) => {
    throw new Error(`REDIRECT:${path}`);
  },
}));

vi.mock("./admin-auth", () => ({
  getSessionToken: async () => storedToken.current,
}));

import { requireAdmin } from "./admin-guard";

describe("requireAdmin", () => {
  beforeEach(() => {
    cookieValue.current = undefined;
    storedToken.current = null;
    vi.stubEnv("ADMIN_TOKEN", "");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("redirects to login when there is no session cookie", async () => {
    storedToken.current = "abc";
    await expect(requireAdmin()).rejects.toThrow("REDIRECT:/admin/login");
  });

  it("accepts a cookie that matches the stored session token", async () => {
    cookieValue.current = "abc";
    storedToken.current = "abc";
    await expect(requireAdmin()).resolves.toBeUndefined();
  });

  it("rejects a cookie that differs from the stored session token", async () => {
    cookieValue.current = "abd";
    storedToken.current = "abc";
    await expect(requireAdmin()).rejects.toThrow("REDIRECT:/admin/login");
  });

  it("does not fall back to ADMIN_TOKEN when a stored token exists", async () => {
    vi.stubEnv("ADMIN_TOKEN", "env-secret");
    cookieValue.current = "env-secret";
    storedToken.current = "abc";
    await expect(requireAdmin()).rejects.toThrow("REDIRECT:/admin/login");
  });

  it("falls back to ADMIN_TOKEN only when no stored token exists", async () => {
    vi.stubEnv("ADMIN_TOKEN", "env-secret");
    cookieValue.current = "env-secret";
    await expect(requireAdmin()).resolves.toBeUndefined();
  });

  it("rejects when there is neither a stored token nor ADMIN_TOKEN", async () => {
    cookieValue.current = "anything";
    await expect(requireAdmin()).rejects.toThrow("REDIRECT:/admin/login");
  });
});
