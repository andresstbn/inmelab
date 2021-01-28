const { app, BrowserWindow, ipcMain } = require('electron')
const SerialPort = require('serialport')
const path = require('path')
let mainWindow

const bufferToFloat = (buffer) => {
    let inputString = buffer.toString()
    inputString = inputString.split("").reverse().join("")
    const string = inputString.replace('=', '')
    return parseFloat(string)
}

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            // nodeIntegration: true,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        }
    })
    // mainWindow.removeMenu()
    mainWindow.loadFile('./index.html')
    mainWindow.on('closed', function () {
        mainWindow = null
    })
    
    let peso

    ipcMain.handle('init-communication', (event, ...args) => {
        const port = new SerialPort('COM10', err => {
            if(err){
                console.log(err.message)
            }
        })
        port.on('data', function (data) {
            peso = bufferToFloat(data);
        })
        return null;
    })

    ipcMain.handle('get-weight', (event, ...args) => {
        return peso;
    })

}

app.whenReady().then(createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    app.quit()
})

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
})