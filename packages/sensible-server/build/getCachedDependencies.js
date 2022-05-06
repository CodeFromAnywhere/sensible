"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCachedDependencies = exports.getDependencyObject = void 0;
const path_1 = __importDefault(require("path"));
const sensible_core_1 = require("sensible-core");
const sensible_files_1 = require("sensible-files");
const getRelevantPackageInfo_1 = require("./util/getRelevantPackageInfo");
const getRepo_1 = require("./util/getRepo");
const getDependencyObject = (dependencyName, currentVersion, dependencyPath) => {
    const packageInfo = (0, getRelevantPackageInfo_1.getRelevantPackageInfo)(path_1.default.join(dependencyPath, "package.json"));
    if (!packageInfo) {
        console.warn(`Couldn't find package.json for dependency ${dependencyPath}`);
        return null;
    }
    const md = (0, sensible_files_1.findAllMd)(dependencyPath);
    return {
        name: dependencyName,
        version: currentVersion,
        latestVersion: packageInfo.version,
        homepage: packageInfo.homepage,
        description: packageInfo.description,
        private: packageInfo.private || false,
        repo: (0, getRepo_1.getRepo)(packageInfo.repository),
        md,
    };
};
exports.getDependencyObject = getDependencyObject;
const getCachedDependencies = (dependencies, folderPath) => {
    return dependencies
        ? Object.keys(dependencies)
            .map((key) => {
            const value = dependencies?.[key];
            return (0, exports.getDependencyObject)(key, value, path_1.default.join(folderPath, "node_modules", key));
        })
            .filter(sensible_core_1.notEmpty)
        : [];
};
exports.getCachedDependencies = getCachedDependencies;
//# sourceMappingURL=getCachedDependencies.js.map