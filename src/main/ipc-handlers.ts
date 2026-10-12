// libraries
import { ipcMain } from "electron";
import { eq, desc } from "drizzle-orm";
import { getDb } from "./database";
import { tasks, timeEntries, users } from "@shared/schema";
import { loginUser, logoutUser, registerUser, validateSession } from "@main/auth-local";
import { clearSessionToken, loadSessionToken, saveSessionToken } from "@main/session-store";

export function registerIpcHandlers() {
  ipcMain.handle(
    "auth:register",
    async (_e, data: { email: string; password: string; displayName?: string; role?: string }) => {
      if (!data.email || !data.password || data.password.length < 6) {
        return { ok: false, error: "Email и пароль (минимум 6 символов) обязательны" };
      }
      return registerUser(data.email, data.password, data.displayName, data.role);
    },
  );

  ipcMain.handle(
    "auth:updateProfile",
    async (
      _e,
      data: {
        userId: string;
        displayName?: string;
        role?: string;
        avatarBase64?: string | null;
      },
    ) => {
      if (!data.userId) throw new Error("userId обязателен");

      const db = getDb();
      const updates: any = {};

      if (data.displayName !== undefined) updates.displayName = data.displayName;
      if (data.avatarBase64 !== undefined) updates.avatarBase64 = data.avatarBase64;
      if (data.role !== undefined) updates.role = data.role;

      if (Object.keys(updates).length === 0) {
        return { ok: false, error: "Нет данных для обновления" };
      }

      await db.update(users).set(updates).where(eq(users.id, data.userId));

      const [updated] = await db.select().from(users).where(eq(users.id, data.userId)).limit(1);

      return {
        ok: true,
        user: {
          id: updated.id,
          email: updated.email,
          displayName: updated.displayName,
          role: updated.role,
          avatarBase64: updated.avatarBase64,
        },
      };
    },
  );

  ipcMain.handle("auth:login", async (_e, data: { email: string; password: string }) => {
    const result = await loginUser(data.email, data.password);

    if (result.ok && result.token) {
      await saveSessionToken(result.token);
    }

    return result;
  });

  ipcMain.handle("auth:checkSession", async () => {
    const token = await loadSessionToken();

    if (!token) return { authenticated: false, reason: "no_token" };

    const session = await validateSession(token);

    if (!session) {
      await clearSessionToken();

      return { authenticated: false, reason: "expired_or_invalid" };
    }

    return {
      authenticated: true,
      user: {
        id: session.user.id,
        email: session.user.email,
        displayName: session.user.displayName,
        role: session.user.role,
        avatarBase64: session.user.avatarBase64,
      },
    };
  });

  ipcMain.handle("auth:logout", async () => {
    const token = await loadSessionToken();

    if (token) {
      await logoutUser(token);
      await clearSessionToken();
    }

    return { ok: true };
  });

  ipcMain.handle("tasks:list", async () => {
    const db = getDb();
    return db.select().from(tasks).where(eq(tasks.isActive, true)).orderBy(tasks.dueDate);
  });

  ipcMain.handle("db:debug-query", async (_e, sql: string) => {
    if (sql.length > 10_000) {
      throw new Error("Invalid SQL");
    }
    const db = getDb();
    console.log("[DB DEBUG] SQL:", sql);
    try {
      const result = await db.execute(sql);
      console.log("[DB DEBUG] Rows:", result.rows?.length ?? 0);
      return { ok: true, rows: result.rows ?? [] };
    } catch (err: any) {
      console.error("[DB DEBUG] Error:", err.message);
      return { ok: false, error: err.message };
    }
  });

  ipcMain.handle(
    "time:create",
    async (
      _e,
      entry: {
        taskKey: string;
        durationSeconds: number;
        startedAt: string;
        comment?: string;
      },
    ) => {
      if (entry.taskKey.length > 64) {
        throw new Error("Invalid taskKey");
      }
      if (entry.durationSeconds <= 0) {
        throw new Error("Invalid duration");
      }

      const db = getDb();
      return db
        .insert(timeEntries)
        .values({
          taskKey: entry.taskKey,
          durationSeconds: entry.durationSeconds,
          startedAt: new Date(entry.startedAt),
          comment: entry.comment ?? null,
          syncStatus: "pending",
        })
        .returning();
    },
  );

  ipcMain.handle("time:listPending", async () => {
    const db = getDb();
    return db
      .select()
      .from(timeEntries)
      .where(eq(timeEntries.syncStatus, "pending"))
      .orderBy(desc(timeEntries.startedAt));
  });
}
