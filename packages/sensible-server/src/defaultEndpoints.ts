import { Endpoint, notEmpty } from "sensible-core";
import { createMakeEndpoint } from "./createMakeEndpoint";
import * as TJS from "typescript-json-schema";
import { getSchema } from "./getSchema";

const getTypesFromSchema = (
  schema: TJS.Definition | null,
  shouldInclude: (typeName: string) => boolean
) => {
  return schema?.definitions
    ? Object.keys(schema.definitions)
        .map((name) => {
          if (shouldInclude(name)) {
            return { name, definition: schema.definitions![name] };
          }
          return null;
        })
        .filter(notEmpty)
    : [];
};

const isEndpoint = (typeName) =>
  typeName.endsWith("Endpoint") || typeName.endsWith("Endpoints");
const isModel = (typeName) => typeName.endsWith("Type");
const isOther = (typeName) => !isEndpoint(typeName) && !isModel(typeName);

interface DocsEndpoint extends Endpoint {
  method: "GET";
  body: {};
  response: {
    endpoints?: {
      name: string;
      definition: TJS.DefinitionOrBoolean;
    }[];
    models?: {
      name: string;
      definition: TJS.DefinitionOrBoolean;
    }[];
    other?: {
      name: string;
      definition: TJS.DefinitionOrBoolean;
    }[];
    success: boolean;
    response: string;
  };
}

interface RecentEndpoint extends Endpoint {
  method: "GET";
  body: {};
  response: {
    success: boolean;
    response: string;
    recent?: (Endpoint & {
      endpoint: string;
    })[];
  };
}

interface DefaultEndpoints {
  docs: DocsEndpoint;
  recent: RecentEndpoint;
}

export const makeDocsEndpoints = (typeFiles: string[]) => {
  const makeEndpoint = createMakeEndpoint<DefaultEndpoints>(typeFiles);

  return [
    makeEndpoint("docs", "GET", async (ctx) => {
      const schema = getSchema(typeFiles);
      const endpoints = getTypesFromSchema(schema, isEndpoint);
      const models = getTypesFromSchema(schema, isModel);
      const other = getTypesFromSchema(schema, isOther);

      return {
        endpoints,
        models,
        other,
        success: true,
        response: "Wow",
      };
    }),

    makeEndpoint("recent", "GET", async (ctx) => {
      return { success: false, response: "Not implemented yet", recent: [] };
    }),
  ];
};

export const makeDefaultEndpoints = (typeFiles: string[]) => {
  return [...makeDocsEndpoints(typeFiles)];
};
