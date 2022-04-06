// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
// const os = require("os");
// //const pty = require("node-pty");
// const pty = require("node-pty-prebuilt-multiarch");

//var shell = os.platform() === "win32" ? "powershell.exe" : "zsh";//"bash";

let mainWindow;
function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    }
  })

  // and load the index.html of the app.
  //mainWindow.loadFile('index.html');
  mainWindow.loadFile('index.html');
  mainWindow.on("closed", function() {
    mainWindow = null;
  });

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  //ipcing

  // var ptyProcess = pty.spawn(shell, [], {
  //     name: "xterm-color",
  //     cols: 80,
  //     rows: 30,
  //     cwd: process.env.HOME,
  //     env: process.env
  // });

  // ptyProcess.on('data', function(data) {
  //     mainWindow.webContents.send("terminal.incomingData", data);
  //     //console.log("Data sent");
  // });
  // ipcMain.on("terminal.keystroke", (event, key) => {
  //     ptyProcess.write(key);
  // });

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.