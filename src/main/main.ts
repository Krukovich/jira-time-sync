// libraries
import { app, BrowserWindow, Menu } from "electron";
import * as path from "path";

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join("preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  Menu.setApplicationMenu(null);

  if (app.isPackaged) {
    mainWindow.loadURL("http://localhost:3000");
  } else {
    mainWindow.loadFile(path.join("dist", "renderer", "index.html"));
  }
}

app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
