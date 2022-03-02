import * as TJS from "typescript-json-schema";
import { objectMap, ModelSchemaObject, getDefinition } from "sensible-core";

const isDefinition = (
  maybeDefinition: TJS.DefinitionOrBoolean | undefined
): maybeDefinition is TJS.Definition => {
  return typeof maybeDefinition === "object";
};

let cachedEndpointSchemas: {
  endpointSchemas: { [key: string]: TJS.Definition | null | undefined };
  endpoints: { [key: string]: string | undefined };
} | null = null;

export const getCachedEndpointSchemas = <
  TAllEndpoints extends unknown,
  TEndpoint extends keyof TAllEndpoints = keyof TAllEndpoints
>(
  schema: ModelSchemaObject
) => {
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

  const endpoints = objectMap(AllEndpointsSchema.properties, (value) => {
    if (isDefinition(value)) {
      return value.$ref?.split("/").pop();
    }
  }) as {
    [key in TEndpoint]: string | undefined;
  };

  const endpointSchemas = objectMap(
    endpoints,
    (interfaceName: string | undefined) => {
      if (interfaceName) {
        return getDefinition(firstModelEndpoints?.definitions?.[interfaceName]);
      }
    }
  );

  const response = { endpointSchemas, endpoints };
  cachedEndpointSchemas = response;
  return response;
};
