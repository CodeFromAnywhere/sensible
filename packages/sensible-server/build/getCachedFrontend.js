"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCachedFrontend = void 0;
//just generate the frontendFile[] once every server restart because there can't be any changes without the server restarting.
let cachedFrontend = {};
const getCachedFrontend = (folderPath) => {
    if (Object.keys(cachedFrontend).length > 0) {
        return cachedFrontend;
    }
    //should introspect frontend files. All ts and tsx files and their exports.
    const frontend = {};
    cachedFrontend = frontend;
    return frontend;
};
exports.getCachedFrontend = getCachedFrontend;
//# sourceMappingURL=getCachedFrontend.js.map