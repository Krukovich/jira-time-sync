CREATE TYPE "public"."sync_status" AS ENUM('pending', 'synced', 'failed');--> statement-breakpoint
CREATE TABLE "tasks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"jira_key" text NOT NULL,
	"summary" text NOT NULL,
	"status" text NOT NULL,
	"due_date" timestamp,
	"original_estimate_seconds" integer,
	"is_non_dev" boolean DEFAULT false NOT NULL,
	"quarter" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"last_fetched_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "tasks_jira_key_unique" UNIQUE("jira_key")
);
--> statement-breakpoint
CREATE TABLE "time_entries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"task_key" text NOT NULL,
	"duration_seconds" integer NOT NULL,
	"started_at" timestamp NOT NULL,
	"comment" text,
	"sync_status" "sync_status" DEFAULT 'pending' NOT NULL,
	"jira_worklog_id" text,
	"synced_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
