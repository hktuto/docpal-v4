import path from 'path'

import { app, BrowserWindow, ipcMain } from 'electron'
export const MAIN_DIST = path.join(__dirname, '../dist-electron')
let mainWindow: BrowserWindow;
app.whenReady().then( async() => {
    mainWindow = new BrowserWindow({
        width: 1280,
        height: 720,
        webPreferences: {
            contextIsolation: false,
            preload: path.join(MAIN_DIST, 'preload.js'),
        },
    })
  if (process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL("http://localhost:3000"); // dev
  } else {
    mainWindow.loadFile("dist/index.html",{
        
    }); // production
  }
   
})

app.on('window-all-closed', function () {
    app.quit()
  })

ipcMain.on('dragTagToWindow', (event,args)=> {
    console.log('ipcMain', args)
    const data = JSON.parse(args)
    // get mainWindow x y
    const mainWindow = BrowserWindow.getAllWindows()[0]
    const mainWindowBounds = mainWindow.getBounds()
    const x = mainWindowBounds.x
    const y = mainWindowBounds.y
    const newX = x + data.clientX
    const newY = y + data.clientY
    console.log(newX, newY)
    let newWindow = new BrowserWindow({
        width: 1280,
        height: 720,
        x: newX,
        y: newY,
        webPreferences: {
          contextIsolation: false,
          preload: path.join(MAIN_DIST, 'preload.js'),
      },
    })
    
    newWindow.loadURL(
        'http://localhost:3000/tab?arg=' + btoa(encodeURIComponent(args))
    )

    newWindow.webContents.openDevTools()
    newWindow.on('closed', () => {
        newWindow = null
    })
})
