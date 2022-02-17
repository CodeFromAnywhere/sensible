"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCachedEndpointSchemas = void 0;
function objectMap(object, mapFn) {
    return Object.keys(object).reduce(function (result, key) {
        result[key] = mapFn(object[key]);
        return result;
    }, {});
}
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
    const AllEndpointsSchema = getDefinition(schema?.definitions?.AllEndpoints);
    if (!AllEndpointsSchema || !AllEndpointsSchema.properties) {
        throw new Error("Couldn't find AllEndpoints interface");
    }
    const endpoints = objectMap(AllEndpointsSchema.properties, (value) => {
        if (isDefinition(value)) {
            return value.$ref?.split("/").pop();
        }
    });
    const endpointSchemas = objectMap(endpoints, (interfaceName) => {
        if (interfaceName) {
            const definitionOrBooleanOrUndefined = 
            //@ts-ignore <-- fix later
            schema?.definitions?.[interfaceName];
            if (isDefinition(definitionOrBooleanOrUndefined)) {
                const definition = definitionOrBooleanOrUndefined;
                return definition;
            }
        }
    });
    const response = { endpointSchemas, endpoints };
    cachedEndpointSchemas = response;
    return response;
};
exports.getCachedEndpointSchemas = getCachedEndpointSchemas;
