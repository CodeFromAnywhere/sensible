"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllMd = void 0;
var files_1 = require("./files");
var parseMd_1 = require("./parseMd");
var findAllMd = function (folderPath, onlyInCurrentFolder) {
    //1. find all md file paths recursively in this folder, but don't look in node_modules
    var fileFolderPaths = (0, files_1.findFilesRecursively)({
        basePath: folderPath,
        match: function (_, extension) { return extension === "md"; },
        onlyInCurrentFolder: onlyInCurrentFolder,
    });
    var filePaths = fileFolderPaths.map(function (x) { return x.path; });
    var mdArray = filePaths.map(parseMd_1.parseMd);
    return mdArray;
};
exports.findAllMd = findAllMd;
//# sourceMappingURL=findAllMd.js.map