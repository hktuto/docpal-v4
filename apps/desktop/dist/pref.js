"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSetPrefFrontend = exports.setPrefs = exports.removePrefs = exports.havePrefs = void 0;
var electron_1 = require("electron");
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var havePrefs = function () {
    var prefsPath = path_1.default.resolve(electron_1.app.getPath('userData'), 'prefs.json');
    if (fs_1.default.existsSync(prefsPath)) {
        // read prefs file and return json
        var prefs = fs_1.default.readFileSync(prefsPath, 'utf-8');
        return JSON.parse(prefs);
        // return false
    }
    else {
        return false;
    }
};
exports.havePrefs = havePrefs;
var removePrefs = function () {
    var prefsPath = path_1.default.resolve(electron_1.app.getPath('userData'), 'prefs.json');
    // remove prefs file
    if (fs_1.default.existsSync(prefsPath)) {
        fs_1.default.unlinkSync(prefsPath);
    }
};
exports.removePrefs = removePrefs;
var setPrefs = function (jsonData) {
    var prefsPath = path_1.default.resolve(electron_1.app.getPath('userData'), 'prefs.json');
    fs_1.default.writeFileSync(prefsPath, JSON.stringify(jsonData));
};
exports.setPrefs = setPrefs;
var createSetPrefFrontend = function (mainWindow) {
    mainWindow = new electron_1.BrowserWindow({
        width: 640,
        height: 480,
        transparent: true, // Make background transparent (optional)
        titleBarStyle: 'hidden', // macOS only: hide title bar but keep traffic lights
        trafficLightPosition: { x: 10, y: 10 }, // macOS: position the traffic lights
        webPreferences: {
            nodeIntegration: true,
            webSecurity: false,
            contextIsolation: false,
        }
    });
    mainWindow.loadFile(path_1.default.join(process.env.ROOT, 'pref/index.html'));
    return mainWindow;
};
exports.createSetPrefFrontend = createSetPrefFrontend;
//# sourceMappingURL=pref.js.map