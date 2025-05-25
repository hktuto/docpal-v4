"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAppClient = void 0;
var browseWindow_1 = require("./browseWindow");
var pref_1 = require("./pref");
var main_1 = require("./main");
var createAppClient = function (mainWindow) {
    // get pref and set to sitSettingJson
    var pref = (0, pref_1.havePrefs)();
    if (!pref)
        throw new Error('no pref');
    mainWindow = (0, browseWindow_1.createWindow)(mainWindow);
    // mainWindow.webContents.openDevTools()
    (0, main_1.createMenu)();
    return mainWindow;
};
exports.createAppClient = createAppClient;
//# sourceMappingURL=app.js.map