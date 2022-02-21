"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCachedEndpointSchemas = void 0;
const sensible_core_1 = require("sensible-core");
const getDefinition = (definitionOrBooleanOrUndefined) => {
    const type = typeof definitionOrBooleanOrUndefined;
    return typeof definitionOrBooleanOrUndefined === "object"
        ? definitionOrBooleanOrUndefined
        : null;
};
const isDefinition = (maybeDefinition) => {
    return typeof maybeDefinition === "object";
};
let cachedEndpointSchemas = null;
const getCachedEndpointSchemas = (schema) => {
    // only needs to be calculated once per server startup.
    if (cachedEndpointSchemas) {
        return cachedEndpointSchemas;
    }
    const firstKey = Object.keys(schema)[0];
    const firstModel = schema[firstKey];
    const firstModelEndpoints = firstModel.endpoints;
    const AllEndpointsSchema = getDefinition(firstModelEndpoints?.AllEndpoints);
    if (!AllEndpointsSchema || !AllEndpointsSchema.properties) {
        throw new Error("Couldn't find AllEndpoints interface");
    }
    const endpoints = (0, sensible_core_1.objectMap)(AllEndpointsSchema.properties, (value) => {
        if (isDefinition(value)) {
            return value.$ref?.split("/").pop();
        }
    });
    const endpointSchemas = (0, sensible_core_1.objectMap)(endpoints, (interfaceName) => {
        if (interfaceName) {
            return getDefinition(firstModelEndpoints?.definitions?.[interfaceName]);
        }
    });
    const response = { endpointSchemas, endpoints };
    cachedEndpointSchemas = response;
    return response;
};
exports.getCachedEndpointSchemas = getCachedEndpointSchemas;
//# sourceMappingURL=getCachedEndpointSchemas.js.map