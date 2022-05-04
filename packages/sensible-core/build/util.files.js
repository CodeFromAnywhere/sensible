"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findFilesRecursively = exports.getExtension = exports.withoutExtension = void 0;
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var withoutExtension = function (fileName) {
    var pieces = fileName.split(".");
    pieces.pop();
    return pieces.join(".");
};
exports.withoutExtension = withoutExtension;
var getExtension = function (fileName) {
    var pieces = fileName.split(".");
    return pieces.pop();
};
exports.getExtension = getExtension;
var findFilesRecursively = function (_a) {
    var match = _a.match, basePath = _a.basePath, relativePath = _a.relativePath, onlyInSubFolders = _a.onlyInSubFolders, onlyInCurrentFolder = _a.onlyInCurrentFolder;
    var location = relativePath ? path_1.default.join(basePath, relativePath) : basePath;
    var contents = fs_1.default.readdirSync(location, { withFileTypes: true });
    return contents.reduce(function (all, fileOrFolder) {
        if (fileOrFolder.isDirectory() && !onlyInCurrentFolder) {
            var folder = fileOrFolder;
            var thisFolder = (0, exports.findFilesRecursively)({
                basePath: basePath,
                relativePath: relativePath
                    ? "".concat(relativePath, "/").concat(folder.name)
                    : folder.name,
                match: match,
                onlyInSubFolders: false,
            });
            var allWithThisFolder = all.concat(thisFolder);
            return allWithThisFolder;
        }
        else if (!onlyInSubFolders) {
            var file = fileOrFolder;
            var filePath = path_1.default.join(location, file.name);
            var allWithMatchedFile = match((0, exports.withoutExtension)(file.name), (0, exports.getExtension)(file.name))
                ? all.concat([{ relativeFolder: relativePath, path: filePath }])
                : all;
            return allWithMatchedFile;
        }
        return all;
    }, []);
};
exports.findFilesRecursively = findFilesRecursively;
//# sourceMappingURL=util.files.js.map