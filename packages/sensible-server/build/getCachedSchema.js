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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCachedSchema = void 0;
const sensible_core_1 = require("sensible-core");
const TJS = __importStar(require("typescript-json-schema"));
const _1 = require(".");
//just generate the schema once every server restart because there can't be any changes without the server restarting.
let cachedSchema = null;
const getCachedSchema = (typeFilesObject) => {
    if (cachedSchema) {
        return cachedSchema;
    }
    // optionally pass argument to schema generator
    const settings = {
        required: true,
        noExtraProps: true,
        strictNullChecks: true,
    };
    //
    // optionally pass ts compiler options
    const compilerOptions = {
        strictNullChecks: true,
        allowUmdGlobalAccess: false,
        skipDefaultLibCheck: true,
        skipLibCheck: true,
    };
    const schema = (0, sensible_core_1.objectMap)(typeFilesObject, (typeFiles) => {
        const endpointsProgram = TJS.getProgramFromFiles(typeFiles.endpoints, compilerOptions);
        const typesProgram = TJS.getProgramFromFiles(typeFiles.types, compilerOptions);
        const examples = (0, _1.importFromFiles)({
            files: typeFiles.examples,
            guard: _1.isArrayGuard,
        }).flat();
        const endpoints = TJS.generateSchema(endpointsProgram, "*", settings, typeFiles.endpoints)?.definitions;
        const types = TJS.generateSchema(typesProgram, "*", settings, typeFiles.types)?.definitions;
        return {
            endpoints,
            types,
            examples,
        };
    });
    cachedSchema = schema;
    return schema;
};
exports.getCachedSchema = getCachedSchema;
//# sourceMappingURL=getCachedSchema.js.map