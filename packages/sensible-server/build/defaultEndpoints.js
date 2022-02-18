"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDefaultEndpoints = exports.makeDocsEndpoints = void 0;
const sensible_core_1 = require("sensible-core");
const createMakeEndpoint_1 = require("./createMakeEndpoint");
const getCachedSchema_1 = require("./getCachedSchema");
const server_1 = __importDefault(require("server"));
const reply_1 = require("server/reply");
const getTypesFromSchema = (schema, shouldBeIncluded) => {
    console.log({ all: schema?.definitions?.AllEndpoints });
    return schema?.definitions
        ? Object.keys(schema.definitions)
            .map((definitionKey) => {
            if (shouldBeIncluded(definitionKey)) {
                return {
                    name: definitionKey,
                    definition: schema.definitions[definitionKey],
                };
            }
            return null;
        })
            .filter(sensible_core_1.notEmpty)
        : [];
};
const isEndpoint = (typeName) => typeName.endsWith("Endpoint") || typeName.endsWith("Endpoints");
const isModel = (typeName) => typeName.endsWith("Type");
const isOther = (typeName) => !isEndpoint(typeName) && !isModel(typeName);
const makeDocsEndpoints = (makeEndpoint, interpretableTypes, constants) => {
    const docsEndpoint = async (ctx) => {
        ctx.res.header("Access-Control-Allow-Origin", "*");
        ctx.res.header("Access-Control-Allow-Headers", "X-Requested-With");
        const schema = (0, getCachedSchema_1.getCachedSchema)(interpretableTypes);
        return {
            constants,
            schema,
            success: true,
            response: "Wow",
        };
    };
    return [
        makeEndpoint("sensible/docs", "GET", docsEndpoint),
        makeEndpoint("sensible/recent", "GET", async (ctx) => {
            ctx.res.header("Access-Control-Allow-Origin", "*");
            ctx.res.header("Access-Control-Allow-Headers", "X-Requested-With");
            return { success: false, response: "Not implemented yet", recent: [] };
        }),
    ];
};
exports.makeDocsEndpoints = makeDocsEndpoints;
// const defaultEndpointsTypeFiles = [resolve("./defaultEndpointTypes.ts")];
const { get, post } = server_1.default.router;
const makeDefaultEndpoints = (interpretableTypes, constants) => {
    const makeEndpoint = (0, createMakeEndpoint_1.createMakeEndpoint)(interpretableTypes //.concat(defaultEndpointsTypeFiles)
    );
    // for now we only have doc-endpoints. Don't know what needs to be there more actually, but let's see.
    return (0, exports.makeDocsEndpoints)(makeEndpoint, interpretableTypes, constants).concat([
        //redirect anything that doesn't work to the docs
        get("*", (ctx) => {
            const origin = encodeURIComponent(`${ctx.req.protocol}://${ctx.req.headers.host}`);
            return (0, reply_1.redirect)(`https://docs.sensibleframework.co/${origin}`);
        }),
    ]);
};
exports.makeDefaultEndpoints = makeDefaultEndpoints;
//# sourceMappingURL=defaultEndpoints.js.map