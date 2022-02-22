"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.importFromFiles = exports.getExtension = exports.withoutExtension = exports.findFilesRecursively = exports.findFiles = exports.isArrayGuard = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const sensible_core_1 = require("sensible-core");
const isArrayGuard = (moduleExports) => typeof moduleExports === "object" && Array.isArray(moduleExports);
exports.isArrayGuard = isArrayGuard;
/**
 * @param slug what should the suffix or the name of thie file be (plural also possible)
 * @returns file path array
 */
const findFiles = (slug, basePath) => {
    return (0, exports.findFilesRecursively)({
        basePath,
        match: (fileName) => fileName === slug ||
            fileName === slug + "s" ||
            fileName.endsWith(`.${slug}`) ||
            fileName.endsWith(`.${slug}s`),
    });
};
exports.findFiles = findFiles;
const findFilesRecursively = ({ match, basePath, relativePath, onlyInSubFolders, onlyInCurrentFolder, }) => {
    const location = relativePath ? path_1.default.join(basePath, relativePath) : basePath;
    const contents = fs_1.default.readdirSync(location, { withFileTypes: true });
    return contents.reduce((all, fileOrFolder) => {
        if (fileOrFolder.isDirectory() && !onlyInCurrentFolder) {
            const folder = fileOrFolder;
            const thisFolder = (0, exports.findFilesRecursively)({
                basePath,
                relativePath: relativePath
                    ? `${relativePath}/${folder.name}`
                    : folder.name,
                match,
                onlyInSubFolders: false,
            });
            const allWithThisFolder = all.concat(thisFolder);
            return allWithThisFolder;
        }
        else if (!onlyInSubFolders) {
            const file = fileOrFolder;
            const filePath = path_1.default.join(location, file.name);
            const allWithMatchedFile = match((0, exports.withoutExtension)(file.name), (0, exports.getExtension)(file.name))
                ? all.concat([{ relativeFolder: relativePath, path: filePath }])
                : all;
            return allWithMatchedFile;
        }
        return all;
    }, []);
};
exports.findFilesRecursively = findFilesRecursively;
const withoutExtension = (fileName) => {
    const pieces = fileName.split(".");
    pieces.pop();
    return pieces.join(".");
};
exports.withoutExtension = withoutExtension;
const getExtension = (fileName) => {
    const pieces = fileName.split(".");
    return pieces.pop();
};
exports.getExtension = getExtension;
const importFromFiles = ({ files, importStrategy = "default", list, guard, }) => {
    return files
        .map((filePath) => {
        const moduleExports = require(filePath);
        if (importStrategy === "default") {
            return moduleExports.default || moduleExports;
        }
        else if (importStrategy === "fileName") {
            const fileName = (0, exports.withoutExtension)(filePath.split("/").pop());
            return moduleExports[fileName];
        }
        else if (importStrategy === "list") {
            return list
                ? (0, sensible_core_1.mergeObjectsArray)(list.map((item) => {
                    return { item: moduleExports[item] };
                }))
                : {};
        }
    })
        .filter((moduleExport) => guard ? guard(moduleExport) && moduleExport : moduleExport);
};
exports.importFromFiles = importFromFiles;
//# sourceMappingURL=files.util.js.map