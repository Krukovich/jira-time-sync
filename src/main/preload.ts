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
});
