import { createMakeEndpoint } from "./createMakeEndpoint";
import { getCachedSchema } from "./getCachedSchema";
import {
  AllEndpoints as AllDefaultEndpoints,
  App,
  Cron,
  DocsEndpoint,
} from "./defaultEndpointTypes";

import server from "server";
import { redirect } from "server/reply";
import { InterpretableTypes, ServerEndpoint } from "./types";
import { ModelSchemaObject, Path } from ".";
import { getCachedApps } from "./getCachedApps";
import { getCachedCrons } from "./getCachedCrons";
import { Link, PublicConstantsType } from "sensible-core";
import { findAllMd } from "./findAllMd";
// const getTypesFromSchema = (
//   schema: TJS.Definition | null,
//   shouldBeIncluded: (typeName: string) => boolean
// ) => {
//   console.log({ all: schema?.definitions?.AllEndpoints });
//   return schema?.definitions
//     ? Object.keys(schema.definitions)
//         .map((definitionKey) => {
//           if (shouldBeIncluded(definitionKey)) {
//             return {
//               name: definitionKey,
//               definition: schema.definitions![definitionKey],
//             };
//           }
//           return null;
//         })
//         .filter(notEmpty)
//     : [];
// };

export const makeDocsEndpoints = (
  makeEndpoint: any,
  basePath: Path,
  appPaths: Path[],
  interpretableTypes: InterpretableTypes,
  constants: PublicConstantsType
) => {
  const docsEndpoint: ServerEndpoint<DocsEndpoint> = async (ctx) => {
    ctx.res.header("Access-Control-Allow-Origin", "*");
    ctx.res.header("Access-Control-Allow-Headers", "X-Requested-With");

    let apps: App[] = [];
    try {
      apps = getCachedApps(appPaths, interpretableTypes);
    } catch (e) {
      console.warn(e);
      return { success: false, response: "Couldn't get apps" };
    }

    const repoUrl = apps[0].repo;

    const cleanRepoUrl = repoUrl?.endsWith(".git")
      ? repoUrl.split(".git")[0]
      : repoUrl;

    const githubLinks: Link[] = cleanRepoUrl
      ? [
          {
            label: "Code",
            url: cleanRepoUrl,
          },
          {
            label: "Issues",
            url: cleanRepoUrl + "/issues",
          },
          {
            label: "Board",
            url: cleanRepoUrl + "/projects",
          },
          {
            label: "Branches",
            url: cleanRepoUrl + "branches",
          },
          {
            label: "PR's",
            url: cleanRepoUrl + "/pulls",
          },
        ]
      : [];

    const extendedConstants: PublicConstantsType = {
      ...constants,
      links: (constants.links || []).concat(githubLinks),
    };

    const md = findAllMd(basePath, true);

    return {
      success: true,
      constants: extendedConstants,
      apps,
      md,
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
