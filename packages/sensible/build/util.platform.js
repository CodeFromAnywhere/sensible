"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.platformNames = exports.platformIds = exports.getPlatformId = void 0;
var getPlatformId = function (platformVariable) {
    switch (platformVariable) {
        case "darwin":
            //its macos
            return exports.platformIds.macOS;
        case "linux":
            return exports.platformIds.linux;
        case "win32":
            return exports.platformIds.windows;
        default:
            //default is mac
            return exports.platformIds.macOS;
    }
};
exports.getPlatformId = getPlatformId;
//Platforms
exports.platformIds = {
    macOS: 0,
    windows: 1,
    linux: 2,
};
exports.platformNames = (_a = {},
    _a[exports.platformIds.macOS] = "MacOS",
    _a[exports.platformIds.windows] = "Windows",
    _a[exports.platformIds.linux] = "Linux",
    _a);
//# sourceMappingURL=util.platform.js.map