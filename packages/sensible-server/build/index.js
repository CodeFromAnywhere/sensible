"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
Object.defineProperty(exports, "makeDocsEndpoints", { enumerable: true, get: function () { return defaultEndpoints_1.makeDocsEndpoints; } });
Object.defineProperty(exports, "makeDefaultEndpoints", { enumerable: true, get: function () { return defaultEndpoints_1.makeDefaultEndpoints; } });
__exportStar(require("./defaultEndpointTypes"), exports);
__exportStar(require("./DefaultModel"), exports);
__exportStar(require("./sequelize.util"), exports);
__exportStar(require("./files.util"), exports);
__exportStar(require("./types"), exports);
__exportStar(require("./createMakeEndpoint"), exports);
//# sourceMappingURL=index.js.map