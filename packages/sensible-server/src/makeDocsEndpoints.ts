import {
  App,
  DocResponse,
  DocsEndpoint,
  Endpoint,
  InterpretableTypes,
  Path,
} from "sensible-core";

import { ServerEndpoint } from "./types";
import { getCachedApps } from "./getCachedApps";
import { Link, PublicConstantsType } from "sensible-core";
import { findAllMd } from "./util/findAllMd";
import { Keys, MakeEndpointType } from ".";

export const makeDocsEndpoints = <
  TAllDefaultEndpoints extends { [key in Keys<TAllDefaultEndpoints>]: Endpoint }
>(
  makeEndpoint: MakeEndpointType<TAllDefaultEndpoints>,
  basePath: Path,
  appPaths: Path[],
  interpretableTypes: InterpretableTypes,
  constants: PublicConstantsType,
  schemasFolderPath: Path
) => {
  const docsEndpoint: ServerEndpoint<DocsEndpoint> = async (ctx) => {
    ctx.res.header("Access-Control-Allow-Origin", "*");
    ctx.res.header("Access-Control-Allow-Headers", "X-Requested-With");

    let apps: App[] = [];
    try {
      apps = getCachedApps(appPaths, interpretableTypes, schemasFolderPath);
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

    const response: DocResponse = {
      success: true,
      constants: extendedConstants,
      apps,
      md,
    };
    return response;
  };

  return [
    makeEndpoint(
      "sensible/docs" as Keys<TAllDefaultEndpoints>,
      "GET",
      docsEndpoint
    ),

    makeEndpoint(
      "sensible/recent" as Keys<TAllDefaultEndpoints>,
      "GET",
      async (ctx) => {
        ctx.res.header("Access-Control-Allow-Origin", "*");
        ctx.res.header("Access-Control-Allow-Headers", "X-Requested-With");

        return { success: false, response: "Not implemented yet", recent: [] };
      }
    ),
  ];
};
