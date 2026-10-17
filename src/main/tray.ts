// libraries
import { app, Tray, Menu, nativeImage, BrowserWindow, ipcMain } from "electron";
import * as path from "path";

let tray: Tray | null = null;

const updateTrayMenu = (mainWindow: BrowserWindow, isRunning: boolean) => {
  if (!tray) return;

  const contextMenu = Menu.buildFromTemplate([
    {
      label: isRunning ? `⏱ Таймер идёт` : "⏱ Таймер остановлен",
      enabled: false,
    },
    { type: "separator" },
    {
      label: "Показать окно",
      click: () => {
        mainWindow.show();
        mainWindow.focus();
      },
    },
    {
      label: "Скрыть окно",
      click: () => {
        mainWindow.hide();
      },
    },
    { type: "separator" },
    {
      label: "Выход",
      click: () => {
        app.quit();
      },
    },
  ]);

  tray.setContextMenu(contextMenu);
};

export const createTray = (mainWindow: BrowserWindow) => {
  const iconPath = path.join(app.getAppPath(), "assets", "clock48.png");
  const image = nativeImage.createFromPath(iconPath);

  if (image.isEmpty()) {
    console.error(`[Tray] Иконка не найдена: ${iconPath}`);
  }

  tray = new Tray(image);

  updateTrayMenu(mainWindow, false);

  ipcMain.on("timer:toggle", (_event, { isRunning }: { isRunning: boolean }) => {
    updateTrayMenu(mainWindow, isRunning);
  });

  tray.on("double-click", () => {
    if (mainWindow) {
      if (mainWindow.isVisible()) mainWindow.hide();
      else {
        mainWindow.show();
        mainWindow.focus();
      }
    }
  });
};

export const destroyTray = () => {
  if (tray) {
    tray.destroy();
    tray = null;
  }
};
