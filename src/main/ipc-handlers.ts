// libraries
import { ipcMain } from "electron";
import { eq, desc } from "drizzle-orm";
import { getDb } from "./database";
import { tasks, timeEntries } from "@shared/schema";
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
