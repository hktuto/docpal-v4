import path from 'path';

export const MAIN_DIST = path.join(__dirname, '../dist-electron');
import { app, BrowserWindow, ipcMain } from 'electron';
let mainWindow: BrowserWindow;

app.whenReady().then( async() => {
    mainWindow = new BrowserWindow({
        width: 1280,
        height: 720,
        frame: false,
        webPreferences: {
            contextIsolation: false,
            preload: path.join(MAIN_DIST, 'preload.js'),
        },
    })
  if (process.env.VITE_DEV_SERVER_URL) {
    console.log("process.env.VITE_DEV_SERVER_URL", process.env.VITE_DEV_SERVER_URL)
    mainWindow.loadURL("http://localhost:3000"); // dev
    mainWindow.webContents.openDevTools()
  } else {
    mainWindow.loadFile("dist/index.html",{
        
    }); // production
  }
  
   
})

app.on('window-all-closed', function () {
    app.quit()
  })

ipcMain.on('dragTagToWindow', (event,args)=> {
    const data = JSON.parse(args)
    // get mainWindow x y
    const mainWindow = BrowserWindow.getAllWindows()[0]
    const mainWindowBounds = mainWindow.getBounds()

    let newWindow:any = new BrowserWindow({
        width: 1280,
        height: 720,
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
