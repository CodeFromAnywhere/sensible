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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseStuff = void 0;
var ts = __importStar(require("typescript"));
var ts_morph_1 = require("ts-morph");
var path_1 = __importDefault(require("path"));
var colors_1 = __importDefault(require("colors"));
function foo(param) {
    console.log("foo");
}
var oldStuff = function () {
    var filepath = process.argv[2];
    var program = ts.createProgram([path_1.default.resolve("./" + filepath)], {
        target: ts.ScriptTarget.ES2015,
    });
    var file = program.getSourceFile(filepath);
    console.log(file);
    var node = file === null || file === void 0 ? void 0 : file.statements[0];
    var checker = program.getTypeChecker();
    // var type = checker.getTypeAtLocation(node.arguments[0]);
    // checker.getAliasedSymbol;
    // const config = {depth:999}
    // console.dir(type, config);
};
var mergeObjectArray = function (objectArray) {
    return objectArray.reduce(function (previous, current) { return (__assign(__assign({}, previous), current)); }, {});
};
var logLengthObject = function (object) {
    var lengths = mergeObjectArray(Object.keys(object).map(function (key) {
        var _a;
        return (_a = {}, _a[key] = object[key].length, _a);
    }));
    console.log(lengths);
};
var parseStuff = function () { return __awaiter(void 0, void 0, void 0, function () {
    var dir, normalizedDir, project, sourceFiles;
    return __generator(this, function (_a) {
        dir = process.argv[2];
        normalizedDir = path_1.default.join(dir);
        project = new ts_morph_1.Project();
        project.addSourceFilesAtPaths(["".concat(normalizedDir, "/**/*.ts")]);
        sourceFiles = project
            .getSourceFiles()
            .filter(function (file) { return !file.getFilePath().includes("/node_modules/"); });
        console.log(sourceFiles.map(function (s) { return s.getBaseName(); }));
        sourceFiles.map(function (file) {
            console.log("looking into", file.getBaseName());
            file.getImportDeclarations().map(function (importDeclaration) {
                console.log(colors_1.default.red("Import"), importDeclaration.getFullText());
            });
            var functions = file.getFunctions();
            var interfaces = file.getInterfaces();
            var children = file.getChildren();
            var classes = file.getClasses();
            var consts = file.getVariableDeclarations();
            var exports = file.getExportSymbols();
            functions.map(function (func) {
                console.log(func.getTypeParameters().map(function (p) { return p.getFullText(); }));
            });
            interfaces.map(function (interfaceDeclaration) {
                //console.log("type".green, interfaceDeclaration.getType().getBaseTypes());//
            });
        });
        return [2 /*return*/];
    });
}); };
exports.parseStuff = parseStuff;
(0, exports.parseStuff)();
//# sourceMappingURL=index.js.map