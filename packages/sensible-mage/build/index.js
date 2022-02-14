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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseStuff = void 0;
const ts = __importStar(require("typescript"));
const ts_morph_1 = require("ts-morph");
const path_1 = __importDefault(require("path"));
const colors_1 = __importDefault(require("colors"));
function foo(param) {
    console.log("foo");
}
const oldStuff = () => {
    const filepath = process.argv[2];
    const program = ts.createProgram([path_1.default.resolve(`./` + filepath)], {
        target: ts.ScriptTarget.ES2015,
    });
    const file = program.getSourceFile(filepath);
    console.log(file);
    const node = file === null || file === void 0 ? void 0 : file.statements[0];
    const checker = program.getTypeChecker();
    // var type = checker.getTypeAtLocation(node.arguments[0]);
    // checker.getAliasedSymbol;
    // const config = {depth:999}
    // console.dir(type, config);
};
const mergeObjectArray = objectArray => {
    return objectArray.reduce((previous, current) => { }, ...previous, ...current);
}, {};
const logLengthObject = (object) => {
    const lengths = mergeObjectArray(Object.keys(object).map(key => ({ [key]: object[key].length })));
    console.log(lengths);
};
const parseStuff = () => __awaiter(void 0, void 0, void 0, function* () {
    const dir = process.argv[2];
    const normalizedDir = path_1.default.join(dir);
    const project = new ts_morph_1.Project();
    project.addSourceFilesAtPaths([`${normalizedDir}/**/*.ts`]);
    const sourceFiles = project
        .getSourceFiles()
        .filter((file) => !file.getFilePath().includes("/node_modules/"));
    console.log(sourceFiles.map((s) => s.getBaseName()));
    sourceFiles.map((file) => {
        console.log("looking into", file.getBaseName());
        file.getImportDeclarations().map((importDeclaration) => {
            console.log(colors_1.default.red("Import"), importDeclaration.getFullText());
        });
        const functions = file.getFunctions();
        const interfaces = file.getInterfaces();
        const children = file.getChildren();
        const classes = file.getClasses();
        const consts = file.getVariableDeclarations();
        const exports = file.getExportSymbols();
        logLens;
        functions.map((func) => {
            console.log(func.getTypeParameters().map((p) => p.getFullText()));
        });
        interfaces.map((interfaceDeclaration) => {
            //console.log("type".green, interfaceDeclaration.getType().getBaseTypes());//
        });
    });
});
exports.parseStuff = parseStuff;
(0, exports.parseStuff)();
