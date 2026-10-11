import { safeStorage, app } from "electron";
import fs from "fs/promises";
import path from "path";

const SESSION_PATH = path.join(app.getPath("userData"), "session.bin");

export async function saveSessionToken(token: string) {
  if (!safeStorage.isEncryptionAvailable()) {
    throw new Error("Шифрование недоступно");
  }
  const encrypted = safeStorage.encryptString(token);
  await fs.writeFile(SESSION_PATH, encrypted, { mode: 0o600 });
}

export async function loadSessionToken(): Promise<string | null> {
  try {
    const encrypted = await fs.readFile(SESSION_PATH);
    return safeStorage.decryptString(encrypted);
  } catch {
    return null;
  }
}

export async function clearSessionToken() {
  try {
    await fs.unlink(SESSION_PATH);
  } catch {
    /* ignore */
  }
}
