const { contextBridge, ipcRenderer, shell } = require("electron");
// const {getSessions, clearSessions, activityDetectStart, activityDetectStop} = require("./utils/activityDetect");

console.log("Preload script loaded!");

contextBridge.exposeInMainWorld('electronAPI', {
  openExternalLink: (url) => shell.openExternal(url),

  captureScreen: () => ipcRenderer.invoke('capture-screen'),
  showScreenshotWindow: (imageData) => ipcRenderer.send('show-screenshot-window', imageData),

  sendLoginData: (data) => ipcRenderer.send('login-data', data),
  getLoginData: () => ipcRenderer.invoke('get-login-data'),
  sendSettingData: (data) => ipcRenderer.send('setting-data', data),
  sendAttendanceData: (data) => ipcRenderer.send('attendance-data', data),

  sendLogout: () => ipcRenderer.send('logout'),

  focusMainWindow: () => ipcRenderer.send('focus-main-window'),
  openOfficeUpdateWindow: (data) => ipcRenderer.send('open-office-update-window', data),

  sendCheckUpdate: () => ipcRenderer.send("check-update"),

//   activityDetectStart: () => activityDetectStart(),
//   activityDetectStop: () => activityDetectStop(),
//   getSessions: () => getSessions(),
//   clearSessions: () => clearSessions(),
});