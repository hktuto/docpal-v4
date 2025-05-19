import path from 'path';
import fs from 'fs';
import {BrowserWindow, app, ipcMain, Menu, ipcRenderer} from "electron"
import type {MenuItem} from 'electron'
import { createWindow } from "./browseWindow"
import { havePrefs } from "./pref"


export const createAppClient = (mainWindow:BrowserWindow):BrowserWindow => {
  // get pref and set to sitSettingJson
  const pref = havePrefs()
  if(!pref) throw new Error('no pref')
  mainWindow = createWindow(mainWindow)
  mainWindow.webContents.openDevTools()
  
  
    return mainWindow
}

export const closeClient = () => {
 
}
