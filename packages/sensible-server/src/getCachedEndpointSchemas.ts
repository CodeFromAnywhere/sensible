import * as TJS from "typescript-json-schema";

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

let cachedEndpointSchemas: {
  endpointSchemas: { [key: string]: TJS.Definition | undefined };
  endpoints: { [key: string]: string | undefined };
} | null = null;
export const getCachedEndpointSchemas = <
  TAllEndpoints extends unknown,
  TEndpoint extends keyof TAllEndpoints = keyof TAllEndpoints
>(
  schema: TJS.Definition | null
) => {
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
  }) as {
    [key in TEndpoint]: string | undefined;
  };

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
  }) as {
    [key in TEndpoint]: TJS.Definition | undefined;
  };

  const response = { endpointSchemas, endpoints };
  cachedEndpointSchemas = response;
  return response;
};
