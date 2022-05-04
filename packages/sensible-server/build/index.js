"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDocsEndpoints = exports.makeDefaultEndpoints = void 0;
const defaultEndpoints_1 = require("./defaultEndpoints");
Object.defineProperty(exports, "makeDefaultEndpoints", { enumerable: true, get: function () { return defaultEndpoints_1.makeDefaultEndpoints; } });
const makeDocsEndpoints_1 = require("./makeDocsEndpoints");
Object.defineProperty(exports, "makeDocsEndpoints", { enumerable: true, get: function () { return makeDocsEndpoints_1.makeDocsEndpoints; } });
__exportStar(require("./DefaultModel"), exports);
//util functions
__exportStar(require("./util/files"), exports);
__exportStar(require("./util/findAllMd"), exports);
__exportStar(require("./util/parseMd"), exports);
__exportStar(require("./util/sequelize"), exports);
__exportStar(require("./types"), exports);
__exportStar(require("./createMakeEndpoint"), exports);
//# sourceMappingURL=index.js.map