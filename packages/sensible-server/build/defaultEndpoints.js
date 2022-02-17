"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDefaultEndpoints = exports.makeDocsEndpoints = void 0;
const sensible_core_1 = require("sensible-core");
const createMakeEndpoint_1 = require("./createMakeEndpoint");
const getSchema_1 = require("./getSchema");
const getTypesFromSchema = (schema, shouldBeIncluded) => {
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
const makeDocsEndpoints = (typeFiles) => {
    const makeEndpoint = (0, createMakeEndpoint_1.createMakeEndpoint)(typeFiles);
    return [
        makeEndpoint("docs", "GET", async (ctx) => {
            const schema = (0, getSchema_1.getSchema)(typeFiles);
            const endpoints = getTypesFromSchema(schema, isEndpoint);
            const models = getTypesFromSchema(schema, isModel);
            const other = getTypesFromSchema(schema, isOther);
            return {
                endpoints,
                models,
                other,
                success: true,
                response: "Wow",
            };
        }),
        makeEndpoint("recent", "GET", async (ctx) => {
            return { success: false, response: "Not implemented yet", recent: [] };
        }),
    ];
};
exports.makeDocsEndpoints = makeDocsEndpoints;
const makeDefaultEndpoints = (typeFiles) => {
    // for now we only have doc-endpoints. Don't know what needs to be there more actually, but let's see.
    return (0, exports.makeDocsEndpoints)(typeFiles);
};
exports.makeDefaultEndpoints = makeDefaultEndpoints;
