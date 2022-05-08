import Ajv from "ajv";
import { Endpoint, InterpretableTypes } from "sensible-core";
import { Path } from "sensible-files";
import server from "server";
import { Middleware } from "server/typings/common";
import * as TJS from "typescript-json-schema";
import {
  CreateMakeEndpointType,
  EndpointFunctionType,
  ExtendedContext,
  Keys,
  MakeEndpointType,
} from ".";
import { getCachedSchema } from "./getCachedSchema";

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

/**
 * This function is provided the schema info from core and creates a typed function that can be used on the server to make endpoints
 * @param interpretableTypes
 * @param schemasFolderPath
 * @returns
 */
export const createMakeEndpoint: CreateMakeEndpointType = <
  TAllEndpoints extends { [key in Keys<TAllEndpoints>]: Endpoint }
>(
  interpretableTypes: InterpretableTypes,
  schemasFolderPath: Path
) => {
  const makeEndpoint: MakeEndpointType<TAllEndpoints> = <
    TEndpoint extends Keys<TAllEndpoints>
  >(
    path: TEndpoint,
    method: TAllEndpoints[TEndpoint]["method"],
    endpoint: EndpointFunctionType<TEndpoint, TAllEndpoints>
  ): Middleware => {
    const callMethod = method === "GET" ? "get" : "post";

    const middleware = server.router[callMethod](`/${path}`, async (ctx) => {
      const body: TAllEndpoints[TEndpoint]["body"] =
        method === "POST" ? ctx.data : ctx.query;
      const extendedCtx: ExtendedContext<TAllEndpoints[TEndpoint]["body"]> = {
        ...ctx,
        body,
      };

      const schema = getCachedSchema(interpretableTypes, schemasFolderPath);
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
