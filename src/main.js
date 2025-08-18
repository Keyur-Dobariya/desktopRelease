const { app, BrowserWindow, ipcMain, shell, Menu } = require('electron');
const path = require('node:path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 370,
    height: 510,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  // Menu.setApplicationMenu(null)

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // IPC handlers
  ipcMain.on('attendance-data', (_event, data) => {
    console.log('attendance-data', data);
  });
  ipcMain.handle('open-external-link', async (_event, url) => {
    await shell.openExternal(url);
    return true;
  });
  ipcMain.handle('check-update', async () => {
    console.log('check-update requested');
    return true;
  });
  ipcMain.handle('logout', async () => {
    console.log('logout requested');
    return true;
  });
  ipcMain.on('show-screenshot', (_event, imageUrl) => {
    console.log('show-screenshot', imageUrl?.slice?.(0, 50));
  });
  ipcMain.handle('focus-main-window', async () => {
    if (!mainWindow.isDestroyed()) {
      mainWindow.show();
      mainWindow.focus();
    }
    return true;
  });
  ipcMain.handle('open-office-update-window', async (_event, item) => {
    console.log('open-office-update-window', item?.title);
    return true;
  });
  ipcMain.handle('get-login-data', async () => {
    return { data: null };
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
