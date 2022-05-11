/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("vscode");

/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WebviewPanel = exports.getWebviewOptions = void 0;
const vscode = __webpack_require__(1);
const vscode_1 = __webpack_require__(3);
function getWebviewOptions(extensionUri) {
    return {
        enableScripts: true,
        localResourceRoots: [vscode.Uri.joinPath(extensionUri, "media")],
    };
}
exports.getWebviewOptions = getWebviewOptions;
class WebviewPanel {
    constructor(panel, extensionUri) {
        this._disposables = [];
        this._panel = panel;
        this._extensionUri = extensionUri;
        this._update();
        this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
    }
    static async createOrShow(extensionUri) {
        const column = vscode.window.activeTextEditor
            ? vscode.window.activeTextEditor.viewColumn
            : undefined;
        if (WebviewPanel.currentPanel) {
            WebviewPanel.currentPanel._panel.reveal(column);
            return;
        }
        const panel = vscode.window.createWebviewPanel(WebviewPanel.viewType, "Docs", column || vscode.ViewColumn.One, getWebviewOptions(extensionUri));
        WebviewPanel.currentPanel = new WebviewPanel(panel, extensionUri);
    }
    static revive(panel, extensionUri) {
        WebviewPanel.currentPanel = new WebviewPanel(panel, extensionUri);
    }
    doRefactor() {
        this._panel.webview.postMessage({ command: "refactor" });
    }
    dispose() {
        WebviewPanel.currentPanel = undefined;
        this._panel.dispose();
        while (this._disposables.length) {
            const x = this._disposables.pop();
            if (x) {
                x.dispose();
            }
        }
    }
    _update() {
        const webview = this._panel.webview;
        this._panel.title = "Docs";
        this._panel.webview.html = this._getHtmlForWebview(webview, "Docs");
    }
    _getHtmlForWebview(webview, catGifPath) {
        const nonce = vscode_1.WebviewHelper.getNonce();
        return `<!DOCTYPE html> 
                <html lang="en"> 
                <head>
                    <meta charset="UTF-8"> 
                    <!--
                        Use a content security policy to only allow loading images from https or from our extension directory,
                        and only allow scripts that have a specific nonce.
                    -->
                   <meta http-equiv="Content-Security-Policy" content="default-src * self blob: data: gap:; style-src * self 'unsafe-inline' blob: data: gap:; script-src * 'self' 'unsafe-eval' 'unsafe-inline' blob 'nonce-${nonce}': data: gap:; object-src * 'self' blob: data: gap:; img-src * self 'unsafe-inline' blob: data: gap:; connect-src self * 'unsafe-inline' blob: data: gap:; frame-src * self blob: data: gap:;">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Sensible Docs</title>
                </head>
                <body style="padding:0">
                <iframe frameBorder="0" width="100%"  style="height:100vh" src="https://www.sensible.to" title="Google">
                </iframe>
                </body>
                </html>`;
    }
}
exports.WebviewPanel = WebviewPanel;
WebviewPanel.viewType = "webviewdocs";


/***/ }),
/* 3 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(4), exports);
__exportStar(__webpack_require__(6), exports);
__exportStar(__webpack_require__(8), exports);
__exportStar(__webpack_require__(10), exports);
__exportStar(__webpack_require__(12), exports);
//# sourceMappingURL=index.js.map

/***/ }),
/* 4 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(5), exports);
//# sourceMappingURL=index.js.map

/***/ }),
/* 5 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Configuration = void 0;
const vscode_1 = __webpack_require__(1);
class Configuration {
    /**
     * Get the configuration for a specific section
     * @param section
     * @returns {WorkspaceConfiguration}
     */
    static get(section, scope) {
        return vscode_1.workspace.getConfiguration(section, scope);
    }
    /**
     * Get the configuration for a specific language
     * @param languageId
     * @returns
     */
    static getForLanguage(languageId) {
        return vscode_1.workspace.getConfiguration("", { languageId });
    }
    /**
     * Get a setting from the configuration
     * @param section
     * @param setting
     * @returns
     */
    static getSetting(section, setting, defaultValue) {
        if (defaultValue) {
            return this.get(section).get(setting, defaultValue);
        }
        return this.get(section).get(setting);
    }
    /**
     * Update a setting in the configuration
     * @param section
     * @param setting
     * @param value
     * @param configurationTarget
     */
    static updateSetting(section, setting, value, configurationTarget) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.get(section).update(setting, value, configurationTarget);
        });
    }
    /**
     * Update a setting in the configuration for a specific language
     * @param languageId
     * @param setting
     * @param value
     * @param configurationTarget
     */
    static updateSettingForLanguage(languageId, setting, value, configurationTarget) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getForLanguage(languageId).update(setting, value, configurationTarget ? configurationTarget : false, true);
        });
    }
}
exports.Configuration = Configuration;
//# sourceMappingURL=Configuration.js.map

/***/ }),
/* 6 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(7), exports);
//# sourceMappingURL=index.js.map

/***/ }),
/* 7 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EditorHelper = void 0;
const vscode_1 = __webpack_require__(1);
class EditorHelper {
    /**
     * Show a file in the editor
     * @param filePath
     */
    static showFile(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            if (filePath) {
                try {
                    filePath = typeof filePath === 'string' ? vscode_1.Uri.file(filePath) : filePath;
                    const doc = yield vscode_1.workspace.openTextDocument(filePath);
                    yield vscode_1.window.showTextDocument(doc, 1, false);
                }
                catch (e) {
                    throw e;
                }
            }
        });
    }
}
exports.EditorHelper = EditorHelper;
//# sourceMappingURL=EditorHelper.js.map

/***/ }),
/* 8 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(9), exports);
//# sourceMappingURL=index.js.map

/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=EventData.js.map

/***/ }),
/* 10 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(11), exports);
//# sourceMappingURL=index.js.map

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WebviewHelper = void 0;
class WebviewHelper {
    /**
     * Generate a random string
     * @returns {string}
     */
    static getNonce() {
        let text = '';
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 32; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }
}
exports.WebviewHelper = WebviewHelper;
//# sourceMappingURL=WebviewHelper.js.map

/***/ }),
/* 12 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(13), exports);
__exportStar(__webpack_require__(14), exports);
//# sourceMappingURL=index.js.map

/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ExtensionInfo = void 0;
const vscode_1 = __webpack_require__(1);
class ExtensionInfo {
    constructor(ctx) {
        this.ctx = ctx;
    }
    /**
     * Creates the singleton instance for the panel
     * @param extPath
     */
    static getInstance(ctx) {
        if (!ExtensionInfo.instance && ctx) {
            ExtensionInfo.instance = new ExtensionInfo(ctx);
        }
        return ExtensionInfo.instance;
    }
    /**
     * Check if the current version was updated
     * @returns
     */
    isUpdated() {
        const pkgJson = this.getPackageJson();
        const installedVersion = pkgJson.version;
        const usedVersion = this.ctx.globalState.get(`${pkgJson.name}:version`);
        return usedVersion !== installedVersion;
    }
    /**
     * Update the used version of the extension
     */
    updateVersion() {
        const pkgJson = this.getPackageJson();
        this.ctx.globalState.update(`${pkgJson.name}:version`, pkgJson.version);
    }
    /**
     * Get the currently used version of the extension
     * @returns
     */
    getUsedVersion() {
        const pkgJson = this.getPackageJson();
        return this.ctx.globalState.get(`${pkgJson.name}:version`);
    }
    /**
     * Get the currently installed version of the extension
     * @returns
     */
    getInstalledVersion() {
        const pkgJson = this.getPackageJson();
        return pkgJson.version;
    }
    /**
     * Retrieve the package JSON file of the extension
     * @returns
     */
    getPackageJson() {
        return this.ctx.extension.packageJSON;
    }
    /**
     * Get the name of the extension
     */
    get name() {
        return this.ctx.extension.packageJSON.name;
    }
    /**
     * Get the name of the extension
     */
    get displayName() {
        return this.ctx.extension.packageJSON.displayName;
    }
    /**
     * Returns the extension's version
     */
    get version() {
        return this.ctx.extension.packageJSON.version;
    }
    /**
     * Check if the extension is in production/development mode
     */
    get isProductionMode() {
        return this.ctx.extensionMode === vscode_1.ExtensionMode.Production;
    }
}
exports.ExtensionInfo = ExtensionInfo;
//# sourceMappingURL=ExtensionInfo.js.map

/***/ }),
/* 14 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TeamSettings = void 0;
const fs_1 = __webpack_require__(15);
const path_1 = __webpack_require__(16);
const vscode_1 = __webpack_require__(1);
class TeamSettings {
    /**
     * Initialize team settings
     */
    static init(fileName, configKey, wsFolder) {
        if (!fileName) {
            throw new Error('Team file name is not defined');
        }
        if (!fileName.endsWith('.json')) {
            throw new Error('Team file name must end with .json');
        }
        if (!configKey) {
            throw new Error('No config key has been defined');
        }
        TeamSettings.teamFileName = fileName;
        TeamSettings.configKey = configKey;
        TeamSettings.wsFolder = wsFolder;
        const fmConfig = TeamSettings.projectConfigPath();
        if (fmConfig && (0, fs_1.existsSync)(fmConfig)) {
            const localConfig = (0, fs_1.readFileSync)(fmConfig, 'utf8');
            TeamSettings.globalConfig = JSON.parse(localConfig);
        }
        else {
            TeamSettings.globalConfig = undefined;
        }
        TeamSettings.config = vscode_1.workspace.getConfiguration(configKey);
        TeamSettings.onConfigChange((global) => {
            if (global) {
                TeamSettings.globalConfig = Object.assign({}, global);
            }
            else {
                TeamSettings.config = vscode_1.workspace.getConfiguration(configKey);
            }
        });
    }
    /**
     * Create the team configuration file is it would not exist
     * @param defaultValue
     */
    static createIfNotExists(defaultValue) {
        const fmConfig = TeamSettings.projectConfigPath();
        if (fmConfig && !(0, fs_1.existsSync)(fmConfig)) {
            (0, fs_1.writeFileSync)(fmConfig, defaultValue ? JSON.stringify(defaultValue) : '{}', 'utf8');
        }
    }
    /**
     * Retrieve a setting from global and local config
     */
    static get(settingKey, merging = false) {
        const settingName = `${TeamSettings.configKey}.${settingKey}`;
        const configInpection = TeamSettings.config.inspect(settingKey);
        let setting = undefined;
        // Retrieve from global config
        if (TeamSettings.globalConfig && typeof TeamSettings.globalConfig[settingName] !== "undefined") {
            setting = TeamSettings.globalConfig[settingName];
        }
        // Retrieve local overrides global
        if (configInpection && typeof configInpection.workspaceValue !== "undefined") {
            if (merging && setting && typeof setting === "object") {
                setting = Object.assign([], setting, configInpection.workspaceValue);
            }
            else {
                setting = configInpection.workspaceValue;
            }
        }
        if (setting === undefined) {
            setting = TeamSettings.config.get(settingKey);
        }
        return setting;
    }
    /**
     * String update config setting
     * @param name
     * @param value
     * @param updateGlobal
     */
    static update(settingKey, value, updateGlobal = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const settingName = `${TeamSettings.configKey}.${settingKey}`;
            const fmConfig = TeamSettings.projectConfigPath();
            if (updateGlobal) {
                if (fmConfig && (0, fs_1.existsSync)(fmConfig)) {
                    const localConfig = (0, fs_1.readFileSync)(fmConfig, 'utf8');
                    TeamSettings.globalConfig = JSON.parse(localConfig);
                    TeamSettings.globalConfig[settingName] = value;
                    (0, fs_1.writeFileSync)(fmConfig, JSON.stringify(TeamSettings.globalConfig, null, 2), 'utf8');
                    return;
                }
            }
            else {
                yield TeamSettings.config.update(settingKey, value);
                return;
            }
            // Fallback to the local settings
            yield TeamSettings.config.update(settingKey, value);
        });
    }
    /**
     * Check for config changes on global and local settings
     * @param callback
     */
    static onConfigChange(callback) {
        vscode_1.workspace.onDidChangeConfiguration(() => {
            callback();
        });
        vscode_1.workspace.onDidSaveTextDocument((e) => __awaiter(this, void 0, void 0, function* () {
            const filename = e.uri.fsPath;
            if (TeamSettings.checkProjectConfig(filename)) {
                const file = yield vscode_1.workspace.openTextDocument(e.uri);
                if (file) {
                    const fileContents = file.getText();
                    const json = JSON.parse(fileContents);
                    callback(json);
                }
            }
        }));
        vscode_1.workspace.onDidDeleteFiles((e) => {
            const needCallback = e === null || e === void 0 ? void 0 : e.files.find(f => TeamSettings.checkProjectConfig(f.fsPath));
            if (needCallback) {
                callback();
            }
        });
    }
    /**
     * Check if its the project config
     * @param filePath
     * @returns
     */
    static checkProjectConfig(filePath) {
        var _a;
        const fmConfig = TeamSettings.projectConfigPath();
        if (fmConfig && (0, fs_1.existsSync)(fmConfig)) {
            return filePath &&
                TeamSettings.teamFileName &&
                (0, path_1.basename)(filePath).toLowerCase() === ((_a = TeamSettings.teamFileName) === null || _a === void 0 ? void 0 : _a.toLowerCase()) &&
                fmConfig.toLowerCase() === filePath.toLowerCase();
        }
        return false;
    }
    /**
     * Get the project config path
     * @returns
     */
    static projectConfigPath() {
        if (!TeamSettings.teamFileName) {
            return undefined;
        }
        if (TeamSettings.wsFolder) {
            return (0, path_1.join)(TeamSettings.wsFolder.fsPath, TeamSettings.teamFileName);
        }
        const folders = vscode_1.workspace.workspaceFolders;
        if (folders && folders.length > 0) {
            const wsFolder = folders[0].uri;
            return (0, path_1.join)(wsFolder.fsPath, TeamSettings.teamFileName);
        }
        return undefined;
    }
}
exports.TeamSettings = TeamSettings;
//# sourceMappingURL=TeamSettings.js.map

/***/ }),
/* 15 */
/***/ ((module) => {

module.exports = require("fs");

/***/ }),
/* 16 */
/***/ ((module) => {

module.exports = require("path");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deactivate = exports.activate = void 0;
const vscode = __webpack_require__(1);
const webview_1 = __webpack_require__(2);
function openFiles(context) {
    return vscode.commands.registerCommand("vscode.openFiles", async (data) => {
        let uri = vscode.workspace.workspaceFolders;
        if (uri && uri.length > 0 && data) {
            const types = vscode.Uri.file(`${uri[0].uri.path}/packages/core/src/${data}/types.ts`);
            const endpoints = vscode.Uri.file(`${uri[0].uri.path}/packages/core/src/${data}/endpoints.ts`);
            const api = vscode.Uri.file(`${uri[0].uri.path}/apps/server/src/${data}/api.ts`);
            const model = vscode.Uri.file(`${uri[0].uri.path}/apps/server/src/${data}/model.ts`);
            const ui = vscode.Uri.file(`${uri[0].uri.path}/packages/ui/src/${data}/index.ts`);
            await webview_1.WebviewPanel.createOrShow(context.extensionUri);
            await vscode.commands.executeCommand("vscode.setEditorLayout", {
                orientation: 0,
                groups: [
                    { groups: [{}, {}], size: 0.5 },
                    { groups: [{}, {}], size: 0.5 },
                    { groups: [{}, {}], size: 0.5 },
                ],
            });
            await vscode.commands.executeCommand("workbench.action.focusNextGroup");
            await vscode.commands.executeCommand("vscode.open", types);
            await vscode.commands.executeCommand("workbench.action.focusNextGroup");
            await vscode.commands.executeCommand("vscode.open", api);
            await vscode.commands.executeCommand("workbench.action.focusNextGroup");
            await vscode.commands.executeCommand("vscode.open", endpoints);
            await vscode.commands.executeCommand("workbench.action.focusNextGroup");
            await vscode.commands.executeCommand("vscode.open", model);
            await vscode.commands.executeCommand("workbench.action.focusNextGroup");
            await vscode.commands.executeCommand("vscode.open", ui);
            await vscode.commands.executeCommand("workbench.action.focusNextGroup");
        }
    });
}
function openModule() {
    return vscode.commands.registerCommand("vscode.openmodule", async () => {
        let input = (await vscode.window.showInputBox({
            prompt: "Paste a Module name",
            placeHolder: "Type a module name",
            value: "user",
        })) || "";
        vscode.commands.executeCommand("vscode.openFiles", input);
        vscode.window.showInformationMessage(input);
    });
}
function activate(context) {
    context.subscriptions.push(openFiles(context));
    context.subscriptions.push(openModule());
    if (vscode.window.registerWebviewPanelSerializer) {
        vscode.window.registerWebviewPanelSerializer(webview_1.WebviewPanel.viewType, {
            async deserializeWebviewPanel(webviewPanel, state) {
                webviewPanel.webview.options = (0, webview_1.getWebviewOptions)(context.extensionUri);
                webview_1.WebviewPanel.revive(webviewPanel, context.extensionUri);
            },
        });
    }
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=extension.js.map