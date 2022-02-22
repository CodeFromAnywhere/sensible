"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCachedApps = exports.mapOrRemove = exports.getAppInfo = exports.getDependencyObject = exports.getRelevantPackageInfo = exports.getProjectType = exports.hasDependency = exports.getAllPackageJsonDependencies = exports.getRepo = exports.getDependencies = exports.getAppType = void 0;
const getCachedCrons_1 = require("./getCachedCrons");
const getCachedSchema_1 = require("./getCachedSchema");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const sensible_core_1 = require("sensible-core");
const getCachedFrontend_1 = require("./getCachedFrontend");
const findAllMd_1 = require("./findAllMd");
/**
 * parse a md file to all the needed info
 * @param mdFilePath path to a md file
 * @returns Md
 */
const getAppType = (projectType, folder) => {
    return ["next", "react", "react-native"].includes(projectType)
        ? "frontend"
        : ["express", "server"].includes(projectType)
            ? "server"
            : folder.startsWith("sensible-core-")
                ? "core"
                : null;
};
exports.getAppType = getAppType;
const getDependencies = (dependencies, folderPath) => {
    return dependencies
        ? Object.keys(dependencies)
            .map((key) => {
            const value = dependencies?.[key];
            return (0, exports.getDependencyObject)(key, value, path_1.default.join(folderPath, "node_modules", key));
        })
            .filter(sensible_core_1.notEmpty)
        : [];
};
exports.getDependencies = getDependencies;
const getRepo = (repository) => (typeof repository === "object" ? repository.url : repository);
exports.getRepo = getRepo;
const getAllPackageJsonDependencies = (p) => {
    const dependencies = p.dependencies ? Object.keys(p.dependencies) : [];
    const devDependencies = p.devDependencies
        ? Object.keys(p.devDependencies)
        : [];
    const peerDependencies = p.peerDependencies
        ? Object.keys(p.peerDependencies)
        : [];
    return [...dependencies, ...devDependencies, ...peerDependencies];
};
exports.getAllPackageJsonDependencies = getAllPackageJsonDependencies;
const hasDependency = (packageJson, dependency) => {
    return (0, exports.getAllPackageJsonDependencies)(packageJson).includes(dependency);
};
exports.hasDependency = hasDependency;
const getProjectType = (packageJson) => {
    const hasNext = (0, exports.hasDependency)(packageJson, "next");
    const hasExpo = (0, exports.hasDependency)(packageJson, "expo");
    const hasReactNative = (0, exports.hasDependency)(packageJson, "react-native");
    const hasReact = (0, exports.hasDependency)(packageJson, "react");
    const hasExpress = (0, exports.hasDependency)(packageJson, "express");
    const hasServer = (0, exports.hasDependency)(packageJson, "server");
    return hasNext
        ? "next"
        : hasExpo || hasReactNative
            ? "react-native"
            : hasReact
                ? "react"
                : hasExpress
                    ? "express"
                    : hasServer
                        ? "server"
                        : "unknown";
};
exports.getProjectType = getProjectType;
const getRelevantPackageInfo = (path) => {
    let fileBuffer;
    try {
        fileBuffer = fs_1.default.readFileSync(path);
    }
    catch (e) {
        //can't find file
        console.warn("couldn't find file");
    }
    //@ts-ignore // why doesn't JSON know it can parse a buffer? Touche
    const json = fileBuffer ? JSON.parse(fileBuffer) : null;
    return json
        ? {
            path,
            description: json.description,
            name: json.name,
            version: json.version,
            private: json.private,
            author: json.author,
            repository: json.repository,
            homepage: json.homepage,
            dependencies: json.dependencies,
            devDependencies: json.devDependencies,
            peerDependencies: json.peerDependencies,
            type: (0, exports.getProjectType)(json),
        }
        : null;
};
exports.getRelevantPackageInfo = getRelevantPackageInfo;
const getDependencyObject = (dependencyName, currentVersion, dependencyPath) => {
    const packageInfo = (0, exports.getRelevantPackageInfo)(path_1.default.join(dependencyPath, "package.json"));
    if (!packageInfo) {
        console.warn(`Couldn't find package.json for dependency ${dependencyPath}`);
        return null;
    }
    const md = (0, findAllMd_1.findAllMd)(dependencyPath);
    return {
        name: dependencyName,
        version: currentVersion,
        latestVersion: packageInfo.version,
        homepage: packageInfo.homepage,
        description: packageInfo.description,
        private: packageInfo.private || false,
        repo: (0, exports.getRepo)(packageInfo.repository),
        md,
    };
};
exports.getDependencyObject = getDependencyObject;
const getAppInfo = (folderPath, models) => {
    const folders = folderPath.split("/");
    const folder = folders.pop();
    const packageInfo = (0, exports.getRelevantPackageInfo)(path_1.default.join(folderPath, "package.json"));
    if (!packageInfo) {
        console.warn("Couldn't find package.json in ", folderPath);
        return null;
    }
    const type = (0, exports.getAppType)(packageInfo.type, folder);
    const md = (0, findAllMd_1.findAllMd)(folderPath);
    let crons = [];
    if (type === "server") {
        crons = (0, getCachedCrons_1.getCachedCrons)(folderPath);
    }
    let frontend = [];
    if (type === "frontend") {
        frontend = (0, getCachedFrontend_1.getCachedFrontend)(folderPath);
    }
    return {
        folder,
        name: packageInfo.name,
        private: packageInfo.private || false,
        version: packageInfo.version,
        description: packageInfo.description,
        homepage: packageInfo.homepage,
        repo: (0, exports.getRepo)(packageInfo.repository),
        md,
        crons,
        frontend,
        models: type === "core" ? models : undefined,
        dependencies: (0, exports.getDependencies)(packageInfo.dependencies, folderPath),
        devDependencies: (0, exports.getDependencies)(packageInfo.devDependencies, folderPath),
        peerDependencies: (0, exports.getDependencies)(packageInfo.peerDependencies, folderPath),
    };
};
exports.getAppInfo = getAppInfo;
//just generate the schema once every server restart because there can't be any changes without the server restarting.
let cachedApps = [];
/** general purpose function that maps over an array and only returns it as part of the mapped array if the result is truthy */
const mapOrRemove = (array, mapFn) => {
    const initialReturnArray = [];
    return array.reduce((all, item) => {
        const mappedItem = mapFn(item);
        if (mappedItem) {
            all.push(mappedItem);
        }
        return all;
    }, initialReturnArray);
};
exports.mapOrRemove = mapOrRemove;
const getCachedApps = (appPaths, interpretableTypes) => {
    if (cachedApps.length > 0) {
        return cachedApps;
    }
    const models = (0, getCachedSchema_1.getCachedSchema)(interpretableTypes);
    const apps = (0, exports.mapOrRemove)(appPaths, (path) => (0, exports.getAppInfo)(path, models));
    cachedApps = apps;
    return apps;
};
exports.getCachedApps = getCachedApps;
//# sourceMappingURL=getCachedApps.js.map