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
    dueDate: "today",
    trackedSeconds: 12000,
    estimateSeconds: 28800,
  },
  {
    id: "2",
    jiraKey: "PROJ-1235",
    summary: "Refactor user service",
    status: "To Do",
    dueDate: "tomorrow",
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
    dueDate: "overdue",
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

export const mockWeeklyStats = [
  { day: "monday", dev: 21600, nonDev: 3600, total: 25200 },
  { day: "tuesday", dev: 25200, nonDev: 1800, total: 27000 },
  { day: "wednesday", dev: 19800, nonDev: 5400, total: 25200 },
  { day: "thursday", dev: 23400, nonDev: 3600, total: 27000 },
  { day: "friday", dev: 19800, nonDev: 2520, total: 22320 },
];

export const mockMonthlyStats = {
  totalTracked: 432000, // 120ч
  avgPerDay: 27000, // 7.5ч
  devPercent: 82,
  nonDevPercent: 18,
  submittedWorklogs: 47,
  pendingWorklogs: 3,
};

export const mockProfile = {
  name: "Krukovich Alexey",
  email: "alex@example.com",
  avatar: "", // пусто — покажем инициалы
  jiraUrl: "https://your-domain.atlassian.net",
  role: "Senior Frontend Engineer",
  joinedAt: "2024-03-15",
  stats: {
    totalHours: 1247,
    tasksClosed: 89,
    avgPerDay: 7.6,
  },
};

export const mockSettings = {
  jiraUrl: "https://your-domain.atlassian.net",
  email: "alex@example.com",
  hasToken: true,
  dailyGoalHours: 8,
  workingDays: [true, true, true, true, true, false, false],
  notifications: {
    lowHours: true,
    unsentWorklog: true,
    overdueTasks: false,
  },
  nonDevQuarter: "Q4 2026",
  nonDevTaskKey: "PROJ-900",
};
