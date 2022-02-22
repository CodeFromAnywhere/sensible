import { createMakeEndpoint } from "./createMakeEndpoint";
import {
  AllEndpoints as AllDefaultEndpoints,
  InterpretableTypes,
  Path,
} from "sensible-core";

import server from "server";
import { redirect } from "server/reply";
import { PublicConstantsType } from "sensible-core";
import { makeDocsEndpoints } from "./makeDocsEndpoints";

// TODO: should also expose these in models under Sensible key
// const defaultEndpointsTypeFiles = [resolve("./defaultEndpointTypes.ts")];
const { get } = server.router;

export const makeDefaultEndpoints = (
  basePath: Path,
  appPaths: Path[],
  interpretableTypes: InterpretableTypes,
  constants: PublicConstantsType
) => {
  const makeEndpoint = createMakeEndpoint<AllDefaultEndpoints>(
    interpretableTypes //.concat(defaultEndpointsTypeFiles)
  );

  // for now we only have doc-endpoints. Don't know what needs to be there more actually, but let's see.
  return makeDocsEndpoints(
    makeEndpoint,
    basePath,
    appPaths,
    interpretableTypes,
    constants
  ).concat([
    //redirect anything that doesn't work to the docs
    get("*", (ctx) => {
      return redirect(
        `https://docs.sensibleframework.co/${ctx.req.headers.host || ""}`
      );
    }),
  ]);
};
