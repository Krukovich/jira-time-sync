import { randomBytes, scryptSync, timingSafeEqual, randomUUID } from "node:crypto";
import { getDb } from "./database";
import { eq, and, gt } from "drizzle-orm";
import { sessions, users } from "@shared/schema";

const SESSION_TTL_HOURS = 24;

export const hashPassword = (password: string, salt?: string) => {
  const useSalt = salt ?? randomBytes(16).toString("hex");
  const hash = scryptSync(password, useSalt, 64).toString("hex");

  return { hash, salt: useSalt };
};

export const verifyPassword = (password: string, salt: string, expectedHash: string) => {
  const { hash } = hashPassword(password, salt);
  const a = Buffer.from(hash, "hex");
  const b = Buffer.from(expectedHash, "hex");

  if (a.length !== b.length) return false;

  return timingSafeEqual(a, b);
};

export const registerUser = async (
  email: string,
  password: string,
  displayName?: string,
  role?: string,
) => {
  const db = getDb();
  const existing = await db.select().from(users).where(eq(users.email, email)).limit(1);

  if (existing.length) {
    return { ok: false, error: "Пользователь с таким email уже существует" };
  }

  const { hash, salt } = hashPassword(password);
  const [user] = await db
    .insert(users)
    .values({
      email,
      passwordHash: hash,
      salt,
      displayName: displayName ?? email.split("@")[0],
      role: role ?? "",
    })
    .returning();

  return {
    ok: true,
    user: { id: user.id, email: user.email, displayName: user.displayName, role: user.role },
  };
};

export async function loginUser(email: string, password: string) {
  const db = getDb();
  const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);

  if (!user) {
    return { ok: false, error: "Неверный email или пароль" };
  }
  if (!verifyPassword(password, user.salt, user.passwordHash)) {
    return { ok: false, error: "Неверный email или пароль" };
  }

  const token = randomUUID();
  const expiresAt = new Date(Date.now() + SESSION_TTL_HOURS * 3600 * 1000);

  await db.insert(sessions).values({
    userId: user.id,
    token,
    expiresAt,
  });

  await db.update(users).set({ lastLoginAt: new Date() }).where(eq(users.id, user.id));

  return {
    ok: true,
    token,
    expiresAt: expiresAt.toISOString(),
    user: { id: user.id, email: user.email, displayName: user.displayName, role: user.role },
  };
}

export const validateSession = async (token: string) => {
  const db = getDb();
  const [session] = await db
    .select()
    .from(sessions)
    .where(and(eq(sessions.token, token), gt(sessions.expiresAt, new Date())))
    .limit(1);

  if (!session) return null;

  const [user] = await db.select().from(users).where(eq(users.id, session.userId)).limit(1);

  if (!user) return null;

  return {
    user: {
      id: user.id,
      email: user.email,
      displayName: user.displayName,
      role: user.role,
      avatarBase64: user.avatarBase64,
    },
    session,
  };
};

export const logoutUser = async (token: string) => {
  const db = getDb();

  await db.delete(sessions).where(eq(sessions.token, token));
};
