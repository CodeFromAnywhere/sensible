import { Endpoint } from "sensible-core";
import server from "server";
import { getCachedSchema } from "./getCachedSchema";
import { getCachedEndpointSchemas } from "./getCachedEndpointSchemas";
import { ServerEndpoint } from "./types";
import * as TJS from "typescript-json-schema";
import Ajv from "ajv";
import { InterpretableTypes } from ".";

export type Keys<TObject> = Extract<keyof TObject, string>;

export const ajv = new Ajv({
  allErrors: true,
  coerceTypes: true,
  useDefaults: true,
});

export const typeHasIncorrectInterface = (
  typeName: string,
  data: any,
  schema: TJS.Definition
): false | string => {
  //console.log("Validating", typeName, data);
  // ajv.addSchema(schema, typeName);
  //ajv.addMetaSchema(require("ajv/lib/refs/json-schema-draft-07.json"));
  const validateFunction = ajv.compile(schema);

  //const validator: any = ajv.getSchema(`Schema#/definitions/${typeName}`); <--AVDD

  const isValid = validateFunction(data);

  if (!isValid) {
    //return JSON.stringify(validateFunction.errors);
    return ajv.errorsText(validateFunction.errors, { dataVar: typeName });
  }

  return !isValid; //always false
};

const getDefinition = (
  definitionOrBooleanOrUndefined: TJS.DefinitionOrBoolean | undefined
) => {
  const type = typeof definitionOrBooleanOrUndefined;
  return typeof definitionOrBooleanOrUndefined === "object"
    ? definitionOrBooleanOrUndefined
    : null;
};

export const createMakeEndpoint = <TAllEndpoints extends unknown>(
  interpretableTypes: InterpretableTypes
) => {
  return <TEndpoint extends Keys<TAllEndpoints>>(
    path: TEndpoint,
    method: TAllEndpoints[TEndpoint] extends Endpoint
      ? TAllEndpoints[TEndpoint]["method"]
      : never,
    endpoint: ServerEndpoint<
      TAllEndpoints[TEndpoint] extends Endpoint
        ? TAllEndpoints[TEndpoint]
        : never
    >
  ) => {
    const callMethod = method === "GET" ? "get" : "post";

    return server.router[callMethod](`/${path}`, async (ctx) => {
      const body: TAllEndpoints[TEndpoint] extends Endpoint
        ? TAllEndpoints[TEndpoint]["body"]
        : never = method === "POST" ? ctx.data : ctx.query;
      const extendedCtx = { ...ctx, body };

      const schema = getCachedSchema(interpretableTypes);
      const { endpointSchemas, endpoints } =
        getCachedEndpointSchemas<TAllEndpoints>(schema);
      const endpointInterfaceName: string | undefined = endpoints[path];
      const endpointSchema: TJS.Definition | undefined = endpointSchemas[path];

      const bodySchema = getDefinition(endpointSchema?.properties?.body);
      const responseSchema = getDefinition(
        endpointSchema?.properties?.response
      );

      const isUserEndpoint = !path.startsWith("sensible/");

      if (isUserEndpoint) {
        if (!bodySchema || !responseSchema) {
          return {
            success: false,
            response: "Couldn't find bodySchema or repsonseSchema",
          };
        }

        // console.dir(
        //   { endpointSchema, bodySchema, responseSchema },
        //   { depth: 999 }
        // );

        if (!endpointInterfaceName || !schema) {
          return {
            response: "Couldn't find schema and/or endpoint interface name",
            success: false,
          };
        }
        const bodyErrors = typeHasIncorrectInterface(
          endpointInterfaceName,
          body,
          schema
        );
        if (bodyErrors) {
          return {
            response: "Body is invalid",
            success: false,
            errors: !bodySchema ? "Body schema undefined" : bodyErrors,
          };
        }
      }
      const response = await endpoint(extendedCtx);

      // response validation
      if (isUserEndpoint && endpointInterfaceName && schema) {
        const responseErrors = typeHasIncorrectInterface(
          endpointInterfaceName,
          response,
          schema
        );

        if (responseErrors) {
          return {
            response: "Response is invalid",
            success: false,
            errors: !responseSchema
              ? "Response schema undefined"
              : responseErrors,
          };
        }
      }

      return response;
    });
  };
};
