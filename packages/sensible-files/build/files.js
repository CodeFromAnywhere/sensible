"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.importFromFiles = exports.findFiles = exports.isArrayGuard = exports.findFilesRecursively = exports.getExtension = exports.withoutExtension = exports.mergeObjectsArray = void 0;
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var mergeObjectsArray = function (objectsArray) {
    return objectsArray.reduce(function (previous, current) {
        return __assign(__assign({}, previous), current);
    }, {});
};
exports.mergeObjectsArray = mergeObjectsArray;
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
var isArrayGuard = function (moduleExports) {
    return typeof moduleExports === "object" && Array.isArray(moduleExports);
};
exports.isArrayGuard = isArrayGuard;
/**
 * @param slug what should the suffix or the name of thie file be (plural also possible)
 * @returns file path array
 */
var findFiles = function (slug, basePath) {
    return (0, exports.findFilesRecursively)({
        basePath: basePath,
        match: function (fileName) {
            return fileName === slug ||
                fileName === slug + "s" ||
                fileName.endsWith(".".concat(slug)) ||
                fileName.endsWith(".".concat(slug, "s"));
        },
    });
};
exports.findFiles = findFiles;
var importFromFiles = function (_a) {
    var files = _a.files, _b = _a.importStrategy, importStrategy = _b === void 0 ? "default" : _b, list = _a.list, guard = _a.guard;
    return files
        .map(function (filePath) {
        var moduleExports = require(filePath);
        if (importStrategy === "default") {
            return moduleExports.default || moduleExports;
        }
        else if (importStrategy === "fileName") {
            var fileName = (0, exports.withoutExtension)(filePath.split("/").pop());
            return moduleExports[fileName];
        }
        else if (importStrategy === "list") {
            return list
                ? (0, exports.mergeObjectsArray)(list.map(function (item) {
                    return { item: moduleExports[item] };
                }))
                : {};
        }
    })
        .filter(function (moduleExport) {
        return guard ? guard(moduleExport) && moduleExport : moduleExport;
    });
};
exports.importFromFiles = importFromFiles;
//# sourceMappingURL=files.js.map