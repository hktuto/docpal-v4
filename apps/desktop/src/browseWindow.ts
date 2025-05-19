import {BrowserWindow} from "electron";
import path from "path";
import log from 'electron-log/main';
import {havePrefs} from './pref'

export const createWindow = (mainWindow:BrowserWindow) =>{
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 1920,
        height: 1080,
        webPreferences: {
            nodeIntegration:true,
            webSecurity: false,
            preload: path.join(__dirname, 'preload.js')
        }
    })
    const pref = havePrefs()
    if(pref) {
       const url = pref.DOCPAL_END_POINT.includes('localhost') ? 'http://'+pref.DOCPAL_END_POINT : 'https://'+pref.DOCPAL_END_POINT
        mainWindow.loadURL(url);
    }
    
    // mainWindow.webContents.openDevTools()
    return mainWindow
}
