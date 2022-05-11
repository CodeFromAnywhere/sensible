"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAndRenameTemplateFiles = exports.renameTemplateToNormalFile = exports.renameToTemplateFile = exports.findTemplateFiles = void 0;
var fs_1 = __importDefault(require("fs"));
var sensible_files_1 = require("sensible-files");
/*
As long as there are no .template files present in the template folder that DONT need to be changed, it is fine.
If there are, we should warn people.
*/
var templateExtension = ".template";
var findTemplates = function (basePath, onlyInCurrentFolder) {
    return (0, sensible_files_1.findFilesRecursively)({
        basePath: basePath,
        onlyInCurrentFolder: onlyInCurrentFolder,
        match: function (fileName, extension) {
            return fileName.includes(".template") || extension.includes(".template");
        },
    }).map(function (x) { return x.path; });
};
/**
 * finds all .template renamed files recursively and returns the paths in an array
 */
var findTemplateFiles = function (dirName) {
    var appTemplateFiles = findTemplates("".concat(dirName, "/apps"));
    var packageTemplateFiles = findTemplates("".concat(dirName, "/packages"));
    var rootTemplateFiles = findTemplates(dirName, true);
    return appTemplateFiles
        .concat(packageTemplateFiles)
        .concat(rootTemplateFiles);
};
exports.findTemplateFiles = findTemplateFiles;
var renameToTemplateFile = function (fileName) {
    var extensionStartsAt = fileName.lastIndexOf(".");
    var insertPosition = extensionStartsAt === -1 ? fileName.length : extensionStartsAt;
    var beforeExtension = fileName.substring(0, insertPosition);
    var afterExtension = fileName.substring(insertPosition);
    return "".concat(beforeExtension).concat(templateExtension).concat(afterExtension);
};
exports.renameToTemplateFile = renameToTemplateFile;
var renameTemplateToNormalFile = function (fileName) {
    return fileName.replace(".template", "");
};
exports.renameTemplateToNormalFile = renameTemplateToNormalFile;
var test = function () {
    var fileNames = [".gitignore", "package.json", "Podfile"];
    var changedFileNames = fileNames
        .map(exports.renameToTemplateFile)
        .map(exports.renameTemplateToNormalFile);
    return (fileNames.length === changedFileNames.length &&
        fileNames.every(function (value, index) { return value === changedFileNames[index]; }));
};
//console.log(test());
var findAndRenameTemplateFiles = function (appDir) { return function (onDone) {
    (0, exports.findTemplateFiles)(appDir)
        .map(function (path) { return ({
        oldPath: path,
        newPath: (0, exports.renameTemplateToNormalFile)(path),
    }); })
        .map(function (_a) {
        var oldPath = _a.oldPath, newPath = _a.newPath;
        console.log("RENAMED: ", { oldPath: oldPath, newPath: newPath });
        fs_1.default.renameSync(oldPath, newPath);
    });
    // not sure, maybe I need to make sure that it's renamed before resolving.... it's not waiting now. It could crash and still resolve!
    onDone();
}; };
exports.findAndRenameTemplateFiles = findAndRenameTemplateFiles;
//# sourceMappingURL=util.templates.js.map