import { Endpoint } from "sensible-core";
import server from "server";
import { getSchema } from "./getSchema";
import { ServerEndpoint } from "./types";
import * as TJS from "typescript-json-schema";
import Ajv from "ajv";

export const typeHasIncorrectInterface = (
  typeName: string,
  data: any,
  schema: TJS.Definition
): false | string => {
  console.log("Validating", typeName, data, schema);
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

function objectMap<T extends { [key: string]: T[string] }, U extends unknown>(
  object: T,
  mapFn: (value: T[string]) => U
): { [key: string]: U } {
  return Object.keys(object).reduce(function (result, key) {
    result[key] = mapFn(object[key]);
    return result;
  }, {});
}

const getDefinition = (
  definitionOrBooleanOrUndefined: TJS.DefinitionOrBoolean | undefined
) => {
  const type = typeof definitionOrBooleanOrUndefined;
  return typeof definitionOrBooleanOrUndefined === "object"
    ? definitionOrBooleanOrUndefined
    : null;
};

const isDefinition = (
  maybeDefinition: TJS.DefinitionOrBoolean | undefined
): maybeDefinition is TJS.Definition => {
  return typeof maybeDefinition === "object";
};

const getEndpointsInterfacesObject = (schema: TJS.Definition | null) => {
  const AllEndpointsSchema = getDefinition(schema?.definitions?.AllEndpoints);
  if (!AllEndpointsSchema || !AllEndpointsSchema.properties) {
    throw new Error("Couldn't find AllEndpoints interface");
  }

  const allEndpoints = objectMap(AllEndpointsSchema.properties, (value) => {
    if (isDefinition(value)) {
      return value.$ref?.split("/").pop();
    }
  });

  const allEndpointsSchema = objectMap(allEndpoints, (interfaceName) => {
    if (interfaceName) {
      const definitionOrBooleanOrUndefined =
        schema?.definitions?.[interfaceName];
      if (isDefinition(definitionOrBooleanOrUndefined)) {
        const definition = definitionOrBooleanOrUndefined;
        return definition;
      }
    }
  });

  return allEndpointsSchema;
};

export const ajv = new Ajv({
  allErrors: true,
  coerceTypes: true,
  useDefaults: true,
});

export const createMakeEndpoint = <TAllEndpoints extends unknown>(
  files: string[]
) => {
  return <TEndpoint extends keyof TAllEndpoints>(
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

      const schema = getSchema(files);

      const AllEndpointsSchema = getDefinition(
        schema?.definitions?.AllEndpoints
      );
      if (!AllEndpointsSchema || !AllEndpointsSchema.properties) {
        throw new Error("Couldn't find AllEndpoints interface");
      }

      const allEndpoints = objectMap(AllEndpointsSchema.properties, (value) => {
        if (isDefinition(value)) {
          return value.$ref?.split("/").pop();
        }
      }) as {
        [key in TEndpoint]: string | undefined;
      };
      const endpointInterfaceName: string | undefined = allEndpoints[path];

      const endpointSchemasObject = objectMap(allEndpoints, (interfaceName) => {
        if (interfaceName) {
          const definitionOrBooleanOrUndefined =
            //@ts-ignore <-- fix later
            schema?.definitions?.[interfaceName];
          if (isDefinition(definitionOrBooleanOrUndefined)) {
            const definition = definitionOrBooleanOrUndefined;
            return definition;
          }
        }
      }) as {
        [key in TEndpoint]: TJS.Definition | undefined;
      };

      // const endpointSchemasObject = getEndpointsInterfacesObject(schema)

      const endpointSchema: TJS.Definition | undefined =
        endpointSchemasObject[path];

      const bodySchema = getDefinition(endpointSchema?.properties?.body);

      const responseSchema = getDefinition(
        endpointSchema?.properties?.response
      );

      console.dir(
        { endpointSchema, bodySchema, responseSchema },
        { depth: 999 }
      );

      if (!endpointInterfaceName || !schema) {
        return {
          response: "Couldn't find schema and/or endpoint interface name",
          success: false,
        };
      }
      const bodyErrors =
        !bodySchema ||
        typeHasIncorrectInterface(endpointInterfaceName, body, schema);
      if (bodyErrors) {
        return {
          response: "Body is invalid",
          success: false,
          errors: !bodySchema ? "Body schema undefined" : bodyErrors,
        };
      }

      const response = await endpoint(extendedCtx);

      // response validation

      const responseErrors =
        !responseSchema ||
        typeHasIncorrectInterface(endpointInterfaceName, response, schema);

      if (responseErrors) {
        return {
          response: "Response is invalid",
          success: false,
          errors: !responseSchema
            ? "Response schema undefined"
            : responseErrors,
        };
      }

      return response;
    });
  };
};
