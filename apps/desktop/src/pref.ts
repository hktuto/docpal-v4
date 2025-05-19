import { BrowserWindow, app } from 'electron';
import path from 'path';
import fs from 'fs'
import log from 'electron-log/main';

export const havePrefs = () => {
    const prefsPath = path.resolve(app.getPath('userData'), 'prefs.json');
    if(fs.existsSync(prefsPath)) {
        // read prefs file and return json
        const prefs = fs.readFileSync(prefsPath, 'utf-8');
        return JSON.parse(prefs)
        // return false
    } else {
        return false
    }
}

export const removePrefs = () => {
    const prefsPath = path.resolve(app.getPath('userData'), 'prefs.json');

    // remove prefs file
    if(fs.existsSync(prefsPath)) {
        fs.unlinkSync(prefsPath)
    }
}

export const setPrefs = (jsonData:any) => {
    const prefsPath = path.resolve(app.getPath('userData'), 'prefs.json');
    log.log(prefsPath)
    fs.writeFileSync(prefsPath, JSON.stringify(jsonData));
}

export const createSetPrefFrontend = (mainWindow:BrowserWindow):BrowserWindow => {
    mainWindow = new BrowserWindow({
        width: 640,
        height: 480,
        webPreferences: {
            nodeIntegration:true,
            webSecurity: false,
            contextIsolation: false,
        }
      })
      mainWindow.loadFile(path.join(process.env.ROOT, 'pref/index.html'))
      return mainWindow
}
