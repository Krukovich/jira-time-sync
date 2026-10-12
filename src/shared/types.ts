export interface Task {
  id: string;
  jiraKey: string;
  summary: string;
  status: string;
  dueDate: string | null;
  originalEstimateSeconds: number | null;
  isNonDev: boolean;
  quarter: string | null;
}

export interface TimeEntry {
  id: string;
  taskKey: string;
  durationSeconds: number;
  startedAt: string;
  comment: string | null;
  syncStatus: "pending" | "synced" | "failed";
}
