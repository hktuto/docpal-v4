"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAIN_DIST = void 0;
var electron_1 = require("electron");
var path_1 = __importDefault(require("path"));
var main_1 = __importDefault(require("electron-log/main"));
var pref_1 = require("./pref");
var app_1 = require("./app");
exports.MAIN_DIST = path_1.default.join(__dirname, '../dist-electron');
// set up env
process.env.ROOT = path_1.default.join(__dirname, '..');
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
var mainWindow;
electron_1.app.requestSingleInstanceLock();
electron_1.app.setAsDefaultProtocolClient('docpal');
electron_1.app.whenReady().then(function () { return __awaiter(void 0, void 0, void 0, function () {
    var alreadyHavePrefs;
    return __generator(this, function (_a) {
        alreadyHavePrefs = (0, pref_1.havePrefs)();
        if (alreadyHavePrefs) {
            mainWindow = (0, app_1.createAppClient)(mainWindow);
        }
        else {
            main_1.default.log("no pref");
            mainWindow = (0, pref_1.createSetPrefFrontend)(mainWindow);
        }
        return [2 /*return*/];
    });
}); });
electron_1.app.on('window-all-closed', function () {
    electron_1.app.quit();
});
electron_1.ipcMain.handle('setBaseUrl', function (event, url) {
    main_1.default.log('setBaseUrl', url);
    mainWindow.close();
    var setting = {
        "pdfReaderUrl": "https://".concat(url, "/resources/pdfjs/web/viewer.html"),
        "PROXY": "https://".concat(url, "/api"),
        "DASHBOARD_PROXY": "https://".concat(url, "/public-api/report/v1/api"),
        "CLIENT_PROXY": "https://".concat(url, "/api"),
        "ADMIN_PROXY": "https://admin.".concat(url, "/api"),
        "endPoint": "client",
        "DEFAULT_PATH": "/browse",
        "OFFICE_END_POINT": "office.".concat(url),
        "UPLOAD_END_POINT": "upload.".concat(url),
        "DOCPAL_END_POINT": "".concat(url),
        "ADMIN_END_POINT": "admin.".concat(url)
    };
    (0, pref_1.setPrefs)(setting);
    mainWindow = (0, app_1.createAppClient)(mainWindow);
});
electron_1.ipcMain.handle('removeBaseUrl', function () {
    (0, pref_1.removePrefs)();
    console.log('removeBaseUrl');
    mainWindow.close();
    mainWindow = (0, pref_1.createSetPrefFrontend)(mainWindow);
});
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
//# sourceMappingURL=main.js.map