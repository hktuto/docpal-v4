"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
//@ts-ignore
window.ipcRenderer = require('electron').ipcRenderer;
//@ts-ignore
window.isDesktopMode = true;
electron_1.contextBridge.exposeInMainWorld('shell', {
    open: function () { return electron_1.ipcRenderer.send('shell:open'); },
    close: function () { return electron_1.ipcRenderer.send('shell:close'); },
});
window.addEventListener('removeBaseUrl', function () {
    console.log("removeBaseUrl event called");
    electron_1.ipcRenderer.invoke('removeBaseUrl');
});
window.addEventListener('dragTagToWindow', function (event) {
    console.log("preload dragTagToWindow", event);
    electron_1.ipcRenderer.send('dragTagToWindow', JSON.stringify(event.detail));
});
//# sourceMappingURL=preload.js.map