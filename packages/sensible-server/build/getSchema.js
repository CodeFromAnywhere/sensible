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
exports.getSchema = void 0;
const TJS = __importStar(require("typescript-json-schema"));
let cachedSchema = null;
const getSchema = (files) => {
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
    const program = TJS.getProgramFromFiles(files, compilerOptions);
    // We can either get the schema for one file and one type...
    const schema = TJS.generateSchema(program, "*", settings);
    cachedSchema = schema;
    return schema;
};
exports.getSchema = getSchema;
