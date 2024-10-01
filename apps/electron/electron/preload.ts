import {contextBridge, ipcRenderer } from 'electron'
//@ts-ignore
window.ipcRenderer = require('electron').ipcRenderer;
//@ts-ignore
window.isDesktopMode = true


window.addEventListener('dragTagToWindow', (event) => {
    console.log("preload dragTagToWindow", event)
    
    ipcRenderer.send('dragTagToWindow', JSON.stringify(event.detail))
})