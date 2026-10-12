// libraries
import { pgTable, text, timestamp, integer, boolean, uuid, pgEnum } from "drizzle-orm/pg-core";

export const syncStatusEnum = pgEnum("sync_status", ["pending", "synced", "failed"]);

export const tasks = pgTable("tasks", {
  id: uuid("id").primaryKey().defaultRandom(),
  jiraKey: text("jira_key").notNull().unique(),
  summary: text("summary").notNull(),
  status: text("status").notNull(),
  dueDate: timestamp("due_date"),
  originalEstimateSeconds: integer("original_estimate_seconds"),
  isNonDev: boolean("is_non_dev").default(false).notNull(),
  quarter: text("quarter"),
  isActive: boolean("is_active").default(true).notNull(),
  lastFetchedAt: timestamp("last_fetched_at").defaultNow().notNull(),
});

export const timeEntries = pgTable("time_entries", {
  id: uuid("id").primaryKey().defaultRandom(),
  taskKey: text("task_key").notNull(), // ссылка на jiraKey задачи
  durationSeconds: integer("duration_seconds").notNull(),
  startedAt: timestamp("started_at").notNull(),
  comment: text("comment"),
  syncStatus: syncStatusEnum("sync_status").default("pending").notNull(),
  jiraWorklogId: text("jira_worklog_id"),
  syncedAt: timestamp("synced_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  salt: text("salt").notNull(),
  displayName: text("display_name"),
  role: text("role"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  lastLoginAt: timestamp("last_login_at"),
  avatarBase64: text("avatar_base64"),
});

export const sessions = pgTable("sessions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  token: text("token").notNull().unique(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
