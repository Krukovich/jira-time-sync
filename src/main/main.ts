// libraries
import { app, BrowserWindow, Menu } from "electron";
import * as path from "path";
import { initDatabase } from "@main/database";
import { registerIpcHandlers } from "@main/ipc-handlers";

const isDev = !app.isPackaged;

const createWindow = () => {
  const preloadPath = path.join(app.getAppPath(), "dist", "preload", "preload.cjs");

  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 1200,
    minHeight: 800,
    backgroundColor: "#0D1117",
    webPreferences: {
      preload: preloadPath,
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
    },
  });

  Menu.setApplicationMenu(null);

  mainWindow.webContents.openDevTools();

  if (isDev) {
    mainWindow.loadURL("http://localhost:3000");
  } else {
    mainWindow.loadFile(path.join("dist", "renderer", "index.html"));
  }
};

app.whenReady().then(async () => {
  await initDatabase();

  registerIpcHandlers();
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
