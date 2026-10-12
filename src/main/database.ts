// libraries
import { PGlite } from "@electric-sql/pglite";
import { drizzle } from "drizzle-orm/pglite";
import { migrate } from "drizzle-orm/pglite/migrator";
import { app } from "electron";
import * as path from "path";
import * as schema from "../shared/schema";

let db: ReturnType<typeof drizzle<typeof schema>> | null = null;

export const initDatabase = async () => {
  if (db) return db;

  const dataDir = path.join(app.getPath("userData"), "pgdata");
  console.log("[DB] Инициализация PGlite в:", dataDir);

  const client = new PGlite(dataDir);
  await client.waitReady;

  db = drizzle({ client, schema, casing: "snake_case" });

  const migrationsPath = app.isPackaged
    ? path.join(process.resourcesPath, "migrations")
    : path.join(app.getAppPath(), "drizzle");

  console.log("[DB] Применение миграций из:", migrationsPath);
  await migrate(db, { migrationsFolder: migrationsPath });

  console.log("[DB] База готова");
  return db;
};

export function getDb() {
  if (!db) throw new Error("База данных не инициализирована");
  return db;
}
