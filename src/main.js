const { app, BrowserWindow, ipcMain } = require("electron");
const SerialPort = require("serialport");
const path = require("path");
let mainWindow;

try {
  require("electron-reloader")(module);
} catch (_) {}

function bufferToFloat(buffer) {
  let inputString = buffer.toString();
  inputString = inputString.split("").reverse().join("");
  const string = inputString.replace("=", "");
  return parseFloat(string);
}

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });
  // mainWindow.removeMenu()
  mainWindow.loadFile(path.join(__dirname, "../public/index.html"));
  mainWindow.on("closed", function () {
    mainWindow = null;
  });

  let peso;

  ipcMain.handle("list-ports", async (event, ...args) => {
    let ports = await SerialPort.list();
    return ports;
  });

  ipcMain.handle("init-communication", (event, portPath) => {
    console.log(portPath);
    const port = new SerialPort(portPath, (err) => {
      if (err) {
        console.log(err.message);
      }
    });
    port.on("data", function (data) {
      peso = bufferToFloat(data);
    });
    return null;
  });

  ipcMain.handle("get-weight", (event, ...args) => {
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }
    // return getRandomInt(0, 50);
    return peso;
  });
}

app.whenReady().then(createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", function () {
  app.quit();
});

// app.on('activate', function () {
//     // On OS X it's common to re-create a window in the app when the
//     // dock icon is clicked and there are no other windows open.
//     if (mainWindow === null) {
//         createWindow()
//     }
// })
