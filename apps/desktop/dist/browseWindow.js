"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWindow = void 0;
var electron_1 = require("electron");
var path_1 = __importDefault(require("path"));
var pref_1 = require("./pref");
var createWindow = function (mainWindow) {
    // Create the browser window.
    mainWindow = new electron_1.BrowserWindow({
        width: 1920,
        height: 1080,
        transparent: true, // Make background transparent (optional)
        titleBarStyle: 'hidden', // macOS only: hide title bar but keep traffic lights
        trafficLightPosition: { x: 10, y: 10 }, // macOS: position the traffic lights
        webPreferences: {
            nodeIntegration: true,
            webSecurity: false,
            preload: path_1.default.join(__dirname, 'preload.js')
        }
    });
    var pref = (0, pref_1.havePrefs)();
    if (pref) {
        var url = pref.DOCPAL_END_POINT.includes('localhost') ? 'http://' + pref.DOCPAL_END_POINT : 'https://' + pref.DOCPAL_END_POINT;
        mainWindow.loadURL(url);
    }
    // mainWindow.webContents.openDevTools()
    return mainWindow;
};
exports.createWindow = createWindow;
//# sourceMappingURL=browseWindow.js.map