const path = require('path');
const { app, BrowserWindow } = require('electron');

// ==============================================

const IS_DEV = process.env.NODE_ENV !== 'production';
const IS_MAC = process.platform === 'darwin';
// const isWin = process.platform === 'win32';
// const isLinux = process.platform === 'linux';
// const isProd = !isDev;
// const isTest = process.env.NODE_ENV === 'test';
// const isDevTools = isDev || isTest;
// const isRenderer = process.type === 'renderer';
// const isMain = !isRenderer;
// const isCI = process.env.CI === true;
// const isSandbox = process.env.APP_SANDBOX_ENABLED === true;
const NUM_WINDOWS = BrowserWindow.getAllWindows().length;

// ==============================================

function createMainWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  });

  if (IS_DEV) {
    win.webContents.openDevTools();
  }

  console.log();

  win.loadFile(path.join(__dirname, 'index.html'));
}

// ==============================================

app.whenReady().then(() => {
  if (NUM_WINDOWS === 0) {
    createMainWindow();
  }
});

// ==============================================

app.on('window-all-closed', () => {
  if (!IS_MAC) {
    app.quit();
  }
});