import { Endpoint, mergeObjectsArray, notEmpty } from "sensible-core";
import server from "server";
import { getSchema } from "./getSchema";
import { ServerEndpoint } from "./types";
import * as TJS from "typescript-json-schema";
import Ajv from "ajv";

const getEndpointsInterfacesObject = (schema: TJS.Definition | null) => {
  const allEndpointsSchema = getDefinition(
    schema?.definitions?.AllEndpoints
  )?.allOf?.reduce((all, definition) => {
    const realDefinition = getDefinition(definition);

    if (realDefinition) {
      if (realDefinition.$ref) {
        // here we should go to the defition it refers to
        const defKey = realDefinition.$ref.split("/").pop(); //UserEndpoints

        if (defKey) {
          const allEndpointDefinitions = getDefinition(
            schema?.definitions?.[defKey]
          );

          const keyValueArray = allEndpointDefinitions?.properties
            ? Object.keys(allEndpointDefinitions.properties)
                ?.map((key) => {
                  const value = getDefinition(
                    allEndpointDefinitions?.properties?.[key]
                  )
                    ?.$ref?.split("/")
                    .pop();

                  return { [key]: value };
                })
                .filter(notEmpty)
            : [];

          const keyValueObject = mergeObjectsArray(keyValueArray);
          return { ...all, ...keyValueObject };
        } else {
          return all;
        }
      } else {
        const key = realDefinition.$schema;
        const value = null;
        return { ...all, [key || "WTF"]: value };
      }
    } else {
      return { ...all };
    }
  }, [] as any);

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

export const ajv = new Ajv({
  allErrors: true,
  coerceTypes: true,
  unicode: true,
  useDefaults: true,
});

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

const getDefinition = (
  definitionOrBooleanOrUndefined: TJS.DefinitionOrBoolean | undefined
) => {
  return typeof definitionOrBooleanOrUndefined === "object"
    ? definitionOrBooleanOrUndefined
    : null;
};

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
