export interface MockTask {
  id: string;
  jiraKey: string;
  summary: string;
  status: string;
  dueDate: string | null;
  trackedSeconds: number;
  estimateSeconds: number;
}

export interface MockTimeEntry {
  id: string;
  taskKey: string;
  startTime: string;
  durationSeconds: number;
  isNonDev: boolean;
  synced: boolean;
}

export const mockTasks: MockTask[] = [
  {
    id: "1",
    jiraKey: "PROJ-1234",
    summary: "Fix authentication bug",
    status: "In Progress",
    dueDate: "Сегодня",
    trackedSeconds: 12000,
    estimateSeconds: 28800,
  },
  {
    id: "2",
    jiraKey: "PROJ-1235",
    summary: "Refactor user service",
    status: "To Do",
    dueDate: "Завтра",
    trackedSeconds: 0,
    estimateSeconds: 14400,
  },
  {
    id: "3",
    jiraKey: "PROJ-1240",
    summary: "Code review PR #456",
    status: "In Review",
    dueDate: "15 окт",
    trackedSeconds: 4500,
    estimateSeconds: 7200,
  },
  {
    id: "4",
    jiraKey: "PROJ-1250",
    summary: "Update dependencies",
    status: "To Do",
    dueDate: "Просрочено",
    trackedSeconds: 0,
    estimateSeconds: 3600,
  },
];

export const mockTimeEntries: MockTimeEntry[] = [
  {
    id: "1",
    taskKey: "PROJ-1234",
    startTime: "09:00",
    durationSeconds: 5400,
    isNonDev: false,
    synced: true,
  },
  {
    id: "2",
    taskKey: "Non-dev Q4",
    startTime: "10:30",
    durationSeconds: 900,
    isNonDev: true,
    synced: true,
  },
  {
    id: "3",
    taskKey: "PROJ-1234",
    startTime: "11:00",
    durationSeconds: 5400,
    isNonDev: false,
    synced: false,
  },
  {
    id: "4",
    taskKey: "PROJ-1235",
    startTime: "14:00",
    durationSeconds: 5400,
    isNonDev: false,
    synced: false,
  },
  {
    id: "5",
    taskKey: "Non-dev Q4",
    startTime: "15:30",
    durationSeconds: 1800,
    isNonDev: true,
    synced: false,
  },
];

export const mockActiveTask = {
  jiraKey: "PROJ-1234",
  summary: "Fix authentication bug",
  elapsedSeconds: 5077, // 01:24:37
  running: true,
};

export const mockDayProgress = {
  trackedSeconds: 22320, // 6ч 12м
  goalSeconds: 28800, // 8ч
  devSeconds: 19800, // 5ч 30м
  nonDevSeconds: 2520, // 42м
};
