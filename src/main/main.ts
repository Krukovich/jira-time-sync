// libraries
import { app, BrowserWindow, Menu } from "electron";
import * as path from "path";
import { initDatabase } from "@main/database";
import { registerIpcHandlers } from "@main/ipc-handlers";
import installExtension, { REACT_DEVELOPER_TOOLS } from "electron-devtools-installer";

const isDev = !app.isPackaged;

const addReactDevTools = () => {
  if (process.env.NODE_ENV === "development") {
    installExtension(REACT_DEVELOPER_TOOLS)
      .then((name) => console.log(`Добавлено расширение: ${name}`))
      .catch((err) => console.log("Ошибка при установке расширения: ", err));
  }
};

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
  addReactDevTools();
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
