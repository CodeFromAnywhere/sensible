import { App, DocsEndpoint, InterpretableTypes, Path } from "sensible-core";

import { ServerEndpoint } from "./types";
import { getCachedApps } from "./getCachedApps";
import { Link, PublicConstantsType } from "sensible-core";
import { findAllMd } from "./util/findAllMd";

export const makeDocsEndpoints = (
  //TODO: type this
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
