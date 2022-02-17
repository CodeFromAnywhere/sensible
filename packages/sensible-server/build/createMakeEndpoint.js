"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMakeEndpoint = exports.typeHasIncorrectInterface = exports.ajv = void 0;
const sensible_core_1 = require("sensible-core");
const server_1 = __importDefault(require("server"));
const getSchema_1 = require("./getSchema");
const ajv_1 = __importDefault(require("ajv"));
const getEndpointsInterfacesObject = (schema) => {
    const allEndpointsSchema = getDefinition(schema?.definitions?.AllEndpoints)?.allOf?.reduce((all, definition) => {
        const realDefinition = getDefinition(definition);
        if (realDefinition) {
            if (realDefinition.$ref) {
                // here we should go to the defition it refers to
                const defKey = realDefinition.$ref.split("/").pop(); //UserEndpoints
                if (defKey) {
                    const allEndpointDefinitions = getDefinition(schema?.definitions?.[defKey]);
                    const keyValueArray = allEndpointDefinitions?.properties
                        ? Object.keys(allEndpointDefinitions.properties)
                            ?.map((key) => {
                            const value = getDefinition(allEndpointDefinitions?.properties?.[key])
                                ?.$ref?.split("/")
                                .pop();
                            return { [key]: value };
                        })
                            .filter(sensible_core_1.notEmpty)
                        : [];
                    const keyValueObject = (0, sensible_core_1.mergeObjectsArray)(keyValueArray);
                    return { ...all, ...keyValueObject };
                }
                else {
                    return all;
                }
            }
            else {
                const key = realDefinition.$schema;
                const value = null;
                return { ...all, [key || "WTF"]: value };
            }
        }
        else {
            return { ...all };
        }
    }, []);
    return allEndpointsSchema;
};
// export function validate(typeName: string): (value: unknown) => any {
//   const validator: any = ajv.getSchema(`Schema#/definitions/${typeName}`);
//   return (value: unknown): any => {
//     if (!validator) {
//       throw new Error(
//         `No validator defined for Schema#/definitions/${typeName}`
//       );
//     }
//     const valid = validator(value);
//     if (!valid) {
//       throw new Error(
//         "Invalid " +
//           typeName +
//           ": " +
//           ajv.errorsText(
//             validator.errors!.filter((e: any) => e.keyword !== "if"),
//             { dataVar: typeName }
//           )
//       );
//     }
//     return value as any;
//   };
// }
exports.ajv = new ajv_1.default({
    allErrors: true,
    coerceTypes: true,
    unicode: true,
    useDefaults: true,
});
const typeHasIncorrectInterface = (typeName, data, schema) => {
    console.log("Validating", typeName, data, schema);
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
const getDefinition = (definitionOrBooleanOrUndefined) => {
    return typeof definitionOrBooleanOrUndefined === "object"
        ? definitionOrBooleanOrUndefined
        : null;
};
const createMakeEndpoint = (files) => {
    return (path, method, endpoint) => {
        const callMethod = method === "GET" ? "get" : "post";
        return server_1.default.router[callMethod](`/${path}`, async (ctx) => {
            const body = method === "POST" ? ctx.data : ctx.query;
            const extendedCtx = { ...ctx, body };
            const schema = (0, getSchema_1.getSchema)(files);
            const endpointsInterfacesObject = getEndpointsInterfacesObject(schema);
            console.log({ endpointsInterfacesObject });
            // const endpointInterfaceName = allEndpointsSchema[path];
            // const endpointSchema = getDefinition(
            //   schema?.definitions?.[endpointInterfaceName]
            // );
            // const bodySchema = getDefinition(endpointSchema?.properties?.body);
            // const responseSchema = getDefinition(
            //   endpointSchema?.properties?.response
            // );
            //body validation
            // const bodyErrors =
            //   !bodySchema ||
            //   !schema ||
            //   typeHasIncorrectInterface(endpointInterfaceName, body, schema);
            // if (bodyErrors) {
            //   return {
            //     response: "Body is invalid",
            //     success: false,
            //     errors: !bodySchema ? "Body schema undefined" : bodyErrors,
            //   };
            // }
            const response = await endpoint(extendedCtx);
            //response validation
            // const responseErrors =
            //   !responseSchema ||
            //   !schema ||
            //   typeHasIncorrectInterface(endpointInterfaceName, response, schema);
            // if (responseErrors) {
            //   return {
            //     response: "Response is invalid",
            //     success: false,
            //     errors: !responseSchema
            //       ? "Response schema undefined"
            //       : responseErrors,
            //   };
            // }
            return response;
        });
    };
};
exports.createMakeEndpoint = createMakeEndpoint;
