import { ensureSchema } from "./db";
import { getSetting, setSetting } from "./settings";

async function hashPassword(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt, iterations: 200_000, hash: "SHA-256" },
    key,
    256,
  );
  return `${Buffer.from(salt).toString("hex")}:${Buffer.from(bits).toString("hex")}`;
}

async function verifyHash(password: string, stored: string): Promise<boolean> {
  const [saltHex, hashHex] = stored.split(":");
  if (!saltHex || !hashHex) return false;
  const salt = Buffer.from(saltHex, "hex");
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt, iterations: 200_000, hash: "SHA-256" },
    key,
    256,
  );
  return Buffer.from(bits).toString("hex") === hashHex;
}

export async function verifyAdminPassword(password: string): Promise<boolean> {
  try {
    await ensureSchema();
    const hash = await getSetting("admin_password_hash");
    if (hash) {
      return verifyHash(password, hash);
    }
    // Bootstrap: env var → auto-migrate to DB hash
    const envToken = process.env.ADMIN_TOKEN;
    if (envToken && password === envToken) {
      await setSetting("admin_password_hash", await hashPassword(password));
      return true;
    }
    return false;
  } catch {
    // DB unavailable — plain env fallback
    return password === process.env.ADMIN_TOKEN;
  }
}

export async function setAdminPassword(newPassword: string): Promise<void> {
  await ensureSchema();
  await setSetting("admin_password_hash", await hashPassword(newPassword));
}

export async function createSession(): Promise<string> {
  const token = Buffer.from(crypto.getRandomValues(new Uint8Array(32))).toString("hex");
  await setSetting("admin_session_token", token);
  return token;
}

export async function getSessionToken(): Promise<string | null> {
  try {
    await ensureSchema();
    const val = await getSetting("admin_session_token");
    return val || null;
  } catch {
    return null;
  }
}
