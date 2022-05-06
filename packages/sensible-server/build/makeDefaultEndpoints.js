"use strict";
/*
---
description: exposes a function that
---
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDefaultEndpoints = void 0;
const path_1 = __importDefault(require("path"));
const server_1 = __importDefault(require("server"));
const reply_1 = require("server/reply");
const createMakeEndpoint_1 = require("./createMakeEndpoint");
const makeDocsEndpoints_1 = require("./makeDocsEndpoints");
// TODO: should also expose these in models under Sensible key
// const defaultEndpointsTypeFiles = [resolve("./defaultEndpointTypes.ts")];
const { get } = server_1.default.router;
const makeDefaultEndpoints = (basePath, appPaths, interpretableTypes, constants) => {
    const schemasFolderPath = path_1.default.join(basePath, "..", "schemas");
    const makeEndpoint = (0, createMakeEndpoint_1.createMakeEndpoint)(interpretableTypes, //.concat(defaultEndpointsTypeFiles)
    schemasFolderPath);
    // for now we only have doc-endpoints. Don't know what needs to be there more actually, but let's see.
    return (0, makeDocsEndpoints_1.makeDocsEndpoints)(makeEndpoint, basePath, appPaths, interpretableTypes, constants, schemasFolderPath).concat([
        //redirect anything that doesn't work to the docs
        get("*", (ctx) => {
            return (0, reply_1.redirect)(`https://docs.sensibleframework.co/${ctx.req.headers.host || ""}`);
        }),
    ]);
};
exports.makeDefaultEndpoints = makeDefaultEndpoints;
//# sourceMappingURL=makeDefaultEndpoints.js.map