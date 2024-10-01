import { app, BrowserWindow, ipcMain } from 'electron'

let mainWindow: BrowserWindow;
app.whenReady().then( async() => {
    mainWindow = new BrowserWindow({
        width: 1280,
        height: 720,
        webPreferences: {
            contextIsolation: false,
        },
    })
  if (process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL("http://localhost:3000"); // dev
  } else {
    mainWindow.loadFile("dist/index.html"); // production
  }
  mainWindow.webContents.openDevTools() 
})

app.on('window-all-closed', function () {
    app.quit()
  })

ipcMain.handle('dragTagToWindow', (event, arg) => {
    console.log('dragTagToWindow', event, arg)
    // create a new window
    let newWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            contextIsolation: false,
        },
    })
    newWindow.loadURL(arg.url)
    newWindow.on('closed', () => {
        newWindow = null
    })
})