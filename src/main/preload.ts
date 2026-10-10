// libraries
import { contextBridge } from "electron";

// Безопасно экспортируем API в контекст React (будет доступно через window.electronAPI)
contextBridge.exposeInMainWorld("electronAPI", {
  // Функция-заглушка для проверки работоспособности моста
  ping: () => "pong",

  // Здесь в будущем вы будете описывать функции для синхронизации Jira, например:
  // sendTimeSync: (data) => ipcRenderer.invoke('sync-time', data)
});
