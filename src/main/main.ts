// libraries
import { app, BrowserWindow, Menu, screen, nativeImage } from "electron";
import * as path from "path";
import installExtension, { REACT_DEVELOPER_TOOLS } from "electron-devtools-installer";
import { createTray } from "@main/tray";
import { initDatabase } from "@main/database";
import { registerIpcHandlers } from "@main/ipc-handlers";

const isDev = process.env.NODE_ENV === "development";
let mainWindow: BrowserWindow;

const addReactDevTools = () => {
  if (isDev) {
    installExtension(REACT_DEVELOPER_TOOLS)
      .then((name) => console.log(`Добавлено расширение: ${name}`))
      .catch((err) => console.log("Ошибка при установке расширения: ", err));
  }
};

const createWindow = () => {
  const iconPath = path.join(app.getAppPath(), "assets", "clock96.png");
  const appIcon = nativeImage.createFromPath(iconPath);
  const preloadPath = path.join(app.getAppPath(), "dist", "preload", "preload.cjs");
  const { width: screenWidth } = screen.getPrimaryDisplay().workAreaSize;
  const windowWidth = 1200;
  const windowHeight = 800;

  mainWindow = new BrowserWindow({
    icon: appIcon,
    width: windowWidth,
    height: windowHeight,
    minWidth: windowWidth,
    minHeight: windowHeight,
    maxWidth: windowWidth,
    maxHeight: windowHeight,
    frame: true,
    resizable: false,
    alwaysOnTop: false,
    skipTaskbar: false,
    x: Math.floor((screenWidth - windowWidth) / 2),
    y: 0,
    backgroundColor: "#0D1117",
    webPreferences: {
      preload: preloadPath,
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
    },
  });

  Menu.setApplicationMenu(null);

  if (isDev) {
    mainWindow.loadURL("http://localhost:3000");
  } else {
    mainWindow.loadFile(path.join("dist", "renderer", "index.html"));
  }

  mainWindow.once("ready-to-show", () => {
    if (mainWindow) mainWindow.show();
  });
};

app.whenReady().then(async () => {
  await initDatabase();

  registerIpcHandlers();
  addReactDevTools();
  createWindow();
  createTray(mainWindow);

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
