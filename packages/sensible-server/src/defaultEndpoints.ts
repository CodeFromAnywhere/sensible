import { notEmpty } from "sensible-core";
import { createMakeEndpoint } from "./createMakeEndpoint";
import * as TJS from "typescript-json-schema";
import { getCachedSchema } from "./getCachedSchema";
import {
  AllEndpoints as AllDefaultEndpoints,
  DocsEndpoint,
} from "./defaultEndpointTypes";
import server from "server";
import { redirect } from "server/reply";
import { InterpretableTypes, Path, ServerEndpoint } from "./types";

const getTypesFromSchema = (
  schema: TJS.Definition | null,
  shouldBeIncluded: (typeName: string) => boolean
) => {
  console.log({ all: schema?.definitions?.AllEndpoints });
  return schema?.definitions
    ? Object.keys(schema.definitions)
        .map((definitionKey) => {
          if (shouldBeIncluded(definitionKey)) {
            return {
              name: definitionKey,
              definition: schema.definitions![definitionKey],
            };
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

export const makeDocsEndpoints = (
  makeEndpoint: any,
  interpretableTypes: InterpretableTypes,
  constants: object
) => {
  const docsEndpoint: ServerEndpoint<DocsEndpoint> = async (ctx) => {
    ctx.res.header("Access-Control-Allow-Origin", "*");
    ctx.res.header("Access-Control-Allow-Headers", "X-Requested-With");

    const schema = getCachedSchema(interpretableTypes);

    return {
      constants,
      schema,
      success: true,
      response: "Wow",
    };
  };
  return [
    makeEndpoint("sensible/docs", "GET", docsEndpoint),

    makeEndpoint("sensible/recent", "GET", async (ctx) => {
      ctx.res.header("Access-Control-Allow-Origin", "*");
      ctx.res.header("Access-Control-Allow-Headers", "X-Requested-With");

      return { success: false, response: "Not implemented yet", recent: [] };
    }),
  ];
};

// const defaultEndpointsTypeFiles = [resolve("./defaultEndpointTypes.ts")];
const { get, post } = server.router;

export const makeDefaultEndpoints = (
  interpretableTypes: InterpretableTypes,
  constants: object
) => {
  const makeEndpoint = createMakeEndpoint<AllDefaultEndpoints>(
    interpretableTypes //.concat(defaultEndpointsTypeFiles)
  );

  // for now we only have doc-endpoints. Don't know what needs to be there more actually, but let's see.
  return makeDocsEndpoints(makeEndpoint, interpretableTypes, constants).concat([
    //redirect anything that doesn't work to the docs
    get("*", (ctx) => {
      const origin = encodeURIComponent(
        `${ctx.req.protocol}://${ctx.req.headers.host}`
      );

      return redirect(`https://docs.sensibleframework.co/${origin}`);
    }),
  ]);
};
