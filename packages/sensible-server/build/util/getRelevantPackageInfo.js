"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRelevantPackageInfo = void 0;
const fs_1 = __importDefault(require("fs"));
const getProjectType_1 = require("./getProjectType");
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
            type: (0, getProjectType_1.getProjectType)(json),
        }
        : null;
};
exports.getRelevantPackageInfo = getRelevantPackageInfo;
//# sourceMappingURL=getRelevantPackageInfo.js.map