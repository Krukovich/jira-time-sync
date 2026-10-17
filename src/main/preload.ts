// libraries
import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("api", {
  tasks: {
    list: () => ipcRenderer.invoke("tasks:list"),
  },
  time: {
    create: (entry: {
      taskKey: string;
      durationSeconds: number;
      startedAt: string;
      comment?: string;
    }) => ipcRenderer.invoke("time:create", entry),
    listPending: () => ipcRenderer.invoke("time:listPending"),
  },
  db: {
    debugQuery: (sql: string) => ipcRenderer.invoke("db:debug-query", sql),
  },
  auth: {
    updateProfile: (data: {
      userId: string;
      displayName?: string;
      role?: string;
      avatarBase64?: string | null;
    }) => ipcRenderer.invoke("auth:updateProfile", data),
    register: (data: { email: string; password: string; displayName?: string }) =>
      ipcRenderer.invoke("auth:register", data),
    login: (data: { email: string; password: string }) => ipcRenderer.invoke("auth:login", data),
    checkSession: () => ipcRenderer.invoke("auth:checkSession"),
    logout: () => ipcRenderer.invoke("auth:logout"),
  },
  timer: {
    toggleTimer: (isRunning: boolean) => {
      ipcRenderer.send("timer:toggle", { isRunning });
    },
  },
});
