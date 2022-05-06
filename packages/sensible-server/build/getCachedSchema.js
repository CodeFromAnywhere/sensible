"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCachedSchema = exports.generateOrRequireSchema = exports.getLastModification = void 0;
const sensible_core_1 = require("sensible-core");
const path_1 = __importDefault(require("path"));
const TJS = __importStar(require("typescript-json-schema"));
const fs_1 = __importDefault(require("fs"));
const sensible_files_1 = require("sensible-files");
// optionally pass argument to schema generator
const settings = {
    required: true,
    noExtraProps: true,
    strictNullChecks: true,
};
// optionally pass ts compiler options
const compilerOptions = {
    strictNullChecks: true,
    allowUmdGlobalAccess: false,
    skipDefaultLibCheck: true,
    skipLibCheck: true,
    allowJs: true,
};
/**
 * returns unix timestamp (ms) of the last modificationdate of the last modified file
 **/
const getLastModification = (files) => {
    return files.reduce((modificationTime, filePath) => {
        if (!fs_1.default.existsSync(filePath)) {
            return modificationTime;
        }
        const fileModificationTime = fs_1.default.statSync(filePath).mtimeMs;
        return fileModificationTime > modificationTime
            ? fileModificationTime
            : modificationTime;
    }, 0);
};
exports.getLastModification = getLastModification;
/**
 * If existing schema is not stale, just require it.
 * Otherwise, generate it for all files (this takes a long time).
 */
const generateOrRequireSchema = (
/**
 * can be empty
 */
{ typeFiles, schemaFilePath, type, model, }) => {
    if (typeFiles.length === 0)
        return;
    const isStale = (0, exports.getLastModification)(typeFiles) > (0, exports.getLastModification)([schemaFilePath]);
    if (isStale) {
        console.log(`Hot damn! We need to update ${model} ${type}`);
        const typesProgram = TJS.getProgramFromFiles(typeFiles, compilerOptions);
        const schema = TJS.generateSchema(typesProgram, "*", settings, typeFiles)?.definitions;
        const schemaDirPath = path_1.default.dirname(schemaFilePath);
        if (!fs_1.default.existsSync(schemaDirPath)) {
            fs_1.default.mkdirSync(schemaDirPath, { recursive: true });
        }
        const schemaString = JSON.stringify(schema);
        fs_1.default.writeFile(schemaFilePath, schemaString, () => {
            //console.log("written the file", schemaFilePath);
        });
        return schema;
    }
    //TODO: Validate this file as it could be corrupt, resulting in weird errors down the line
    return require(schemaFilePath);
};
exports.generateOrRequireSchema = generateOrRequireSchema;
const getCachedSchema = (typeFilesObject, schemasFolderPath) => {
    const schema = (0, sensible_core_1.objectMap)(typeFilesObject, (typeFiles, key) => {
        const endpointSchemaFilePath = path_1.default.join(schemasFolderPath, key, "endpoints.json");
        const typeSchemaFilePath = path_1.default.join(schemasFolderPath, key, "types.json");
        //TODO: if the user makes a mistake in the type definition, crashes will happen down the line now. I think the guard should be improved
        const typeExamples = (0, sensible_files_1.importFromFiles)({
            files: typeFiles.typeExamples,
            guard: sensible_files_1.isArrayGuard,
        }).flat();
        const endpointExamples = (0, sensible_files_1.importFromFiles)({
            files: typeFiles.endpointExamples,
            guard: sensible_files_1.isArrayGuard,
        }).flat();
        const types = (0, exports.generateOrRequireSchema)({
            typeFiles: typeFiles.types,
            schemaFilePath: typeSchemaFilePath,
            model: key,
            type: "types",
        });
        const endpoints = (0, exports.generateOrRequireSchema)({
            typeFiles: typeFiles.endpoints,
            schemaFilePath: endpointSchemaFilePath,
            model: key,
            type: "endpoints",
        });
        return {
            endpoints,
            types,
            typeExamples,
            endpointExamples,
        };
    });
    return schema;
};
exports.getCachedSchema = getCachedSchema;
//# sourceMappingURL=getCachedSchema.js.map