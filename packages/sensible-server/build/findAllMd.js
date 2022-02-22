"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllMd = void 0;
const _1 = require(".");
const parseMd_1 = require("./parseMd");
const findAllMd = (folderPath, onlyInCurrentFolder) => {
    //1. find all md file paths recursively in this folder, but don't look in node_modules
    const fileFolderPaths = (0, _1.findFilesRecursively)({
        basePath: folderPath,
        match: (_, extension) => extension === "md",
        onlyInCurrentFolder,
    });
    const filePaths = fileFolderPaths.map((x) => x.path);
    const mdArray = filePaths.map(parseMd_1.parseMd);
    return mdArray;
};
exports.findAllMd = findAllMd;
//# sourceMappingURL=findAllMd.js.map