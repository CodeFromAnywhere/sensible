"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMakeEndpoint = exports.typeHasIncorrectInterface = exports.ajv = void 0;
const ajv_1 = __importDefault(require("ajv"));
const server_1 = __importDefault(require("server"));
const getCachedSchema_1 = require("./getCachedSchema");
exports.ajv = new ajv_1.default({
    allErrors: true,
    coerceTypes: true,
    useDefaults: true,
});
const typeHasIncorrectInterface = (typeName, data, schema) => {
    //console.log("Validating", typeName, data);
    // ajv.addSchema(schema, typeName);
    //ajv.addMetaSchema(require("ajv/lib/refs/json-schema-draft-07.json"));
    const validateFunction = exports.ajv.compile(schema);
    //const validator: any = ajv.getSchema(`Schema#/definitions/${typeName}`); <--AVDD
    const isValid = validateFunction(data);
    if (!isValid) {
        //return JSON.stringify(validateFunction.errors);
        return exports.ajv.errorsText(validateFunction.errors, { dataVar: typeName });
    }
    return !isValid; //always false
};
exports.typeHasIncorrectInterface = typeHasIncorrectInterface;
/**
 * This function is provided the schema info from core and creates a typed function that can be used on the server to make endpoints
 * @param interpretableTypes
 * @param schemasFolderPath
 * @returns
 */
const createMakeEndpoint = (interpretableTypes, schemasFolderPath) => {
    const makeEndpoint = (path, method, endpoint) => {
        const callMethod = method === "GET" ? "get" : "post";
        const middleware = server_1.default.router[callMethod](`/${path}`, async (ctx) => {
            const body = method === "POST" ? ctx.data : ctx.query;
            const extendedCtx = {
                ...ctx,
                body,
            };
            const schema = (0, getCachedSchema_1.getCachedSchema)(interpretableTypes, schemasFolderPath);
            // const { endpointSchemas, endpoints } =
            //   getCachedEndpointSchemas<TAllEndpoints>(schema);
            // const endpointInterfaceName: string | undefined = endpoints[path];
            // const endpointSchema: TJS.Definition | null | undefined =
            //   endpointSchemas[path];
            // const bodySchema = getDefinition(endpointSchema?.properties?.body);
            // const responseSchema = getDefinition(
            //   endpointSchema?.properties?.response
            // );
            // const isUserEndpoint = !path.startsWith("sensible/");
            // if (isUserEndpoint) {
            //   if (!bodySchema || !responseSchema) {
            //     return {
            //       success: false,
            //       response: "Couldn't find bodySchema or responseSchema",
            //     };
            //   }
            //   // console.dir(
            //   //   { endpointSchema, bodySchema, responseSchema },
            //   //   { depth: 999 }
            //   // );
            //   if (!endpointInterfaceName || !schema) {
            //     return {
            //       response: "Couldn't find schema and/or endpoint interface name",
            //       success: false,
            //     };
            //   }
            //   const bodyErrors = typeHasIncorrectInterface(
            //     endpointInterfaceName,
            //     body,
            //     schema
            //   );
            //   if (bodyErrors) {
            //     return {
            //       response: "Body is invalid",
            //       success: false,
            //       errors: !bodySchema ? "Body schema undefined" : bodyErrors,
            //     };
            //   }
            // }
            // let response: DefaultResponse = {
            //   success: false,
            //   response: "Couldn't update response",
            // };
            // try {
            const response = await endpoint(extendedCtx);
            // } catch (e) {
            //   return {
            //     response: e,
            //     success: false,
            //   };
            // }
            // // response validation
            // if (isUserEndpoint && endpointInterfaceName && schema) {
            //   const responseErrors = typeHasIncorrectInterface(
            //     endpointInterfaceName,
            //     response,
            //     schema
            //   );
            //   if (responseErrors) {
            //     return {
            //       response: "Response is invalid",
            //       success: false,
            //       errors: !responseSchema
            //         ? "Response schema undefined"
            //         : responseErrors,
            //     };
            //   }
            // }
            return response;
        });
        return middleware;
    };
    return makeEndpoint;
};
exports.createMakeEndpoint = createMakeEndpoint;
//# sourceMappingURL=createMakeEndpoint.js.map