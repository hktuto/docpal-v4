import { app, BrowserWindow, ipcMain, shell, dialog, ipcRenderer, Menu } from 'electron';
import path from 'path';
import log from 'electron-log/main';
import { createSetPrefFrontend, havePrefs, setPrefs, removePrefs } from './pref'
import { createAppClient } from './app';

export const MAIN_DIST = path.join(__dirname, '../dist-electron');

// set up env

process.env.ROOT = path.join(__dirname, '..')
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'




let mainWindow: BrowserWindow;


app.requestSingleInstanceLock()
app.setAsDefaultProtocolClient('docpal')

app.whenReady().then( async() => {
    const alreadyHavePrefs = havePrefs()

     if(alreadyHavePrefs){
      mainWindow = createAppClient(mainWindow)

    }else{
      log.log("no pref")
      mainWindow = createSetPrefFrontend(mainWindow)

    }
})

app.on('window-all-closed', function () {
    app.quit()
  })


ipcMain.handle('setBaseUrl',(event,url) => {
  log.log('setBaseUrl',url);
  mainWindow.close()
  const setting = {
    "pdfReaderUrl": `https://${url}/resources/pdfjs/web/viewer.html`,
    "PROXY":`https://${url}/api`,
    "DASHBOARD_PROXY":`https://${url}/public-api/report/v1/api`,
    "CLIENT_PROXY": `https://${url}/api`,
    "ADMIN_PROXY": `https://admin.${url}/api`,
    "endPoint": "client",
    "DEFAULT_PATH":"/browse",
    "OFFICE_END_POINT": `office.${url}`,
    "UPLOAD_END_POINT": `upload.${url}`,
    "DOCPAL_END_POINT": `${url}`,
    "ADMIN_END_POINT": `admin.${url}`
  }
  setPrefs(setting);
  mainWindow = createAppClient(mainWindow)
})

ipcMain.handle('removeBaseUrl',() => {
  removePrefs()
  console.log('removeBaseUrl');
  mainWindow.close();
  mainWindow = createSetPrefFrontend(mainWindow)
})

// ipcMain.on('dragTagToWindow', (event,args)=> {
//     const data = JSON.parse(args)
//     // get mainWindow x y
//     const mainWindow = BrowserWindow.getAllWindows()[0]
//     const mainWindowBounds = mainWindow.getBounds()

//     let newWindow:any = new BrowserWindow({
//         width: 1280,
//         height: 720,
//         webPreferences: {
//           contextIsolation: false,
//           preload: path.join(MAIN_DIST, 'preload.js'),
//       },
//     })
    
//     newWindow.loadURL(
//         'http://localhost:3000/tab?arg=' + btoa(encodeURIComponent(args))
//     )

//     newWindow.webContents.openDevTools()
//     newWindow.on('closed', () => {
//         newWindow = null
//     })
// })
