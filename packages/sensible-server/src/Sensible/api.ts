import path from "path";
import {
  AllSensibleEndpoints,
  App,
  Cron,
  DocsEndpoint,
  InterpretableTypes,
  Link,
  PublicConstantsType,
} from "sensible-core";
import { Path, parseMd } from "sensible-files";
import server from "server";
import { redirect } from "server/reply";
import { createMakeEndpoint } from "../createMakeEndpoint";
import { getCachedApps } from "../getCachedApps";
import { getCachedFrontend } from "../getCachedFrontend";
import { getCachedSchema } from "../getCachedSchema";

const { get } = server.router;

export const makeSensibleEndpoints = (
  basePath: Path,
  appPaths: Path[],
  interpretableTypes: InterpretableTypes,
  constants: PublicConstantsType
) => {
  const schemasFolderPath: Path = path.join(basePath, "..", "schemas");

  const makeEndpoint = createMakeEndpoint<AllSensibleEndpoints>(
    interpretableTypes, //.concat(defaultEndpointsTypeFiles)
    schemasFolderPath
  );

  return [
    makeEndpoint("sensible/apps", "GET", async (ctx) => {
      const { app } = ctx.body;

      let apps: { [key: string]: App } = {};
      try {
        apps = getCachedApps(appPaths, interpretableTypes, schemasFolderPath);
      } catch (e) {
        console.warn(e);
        return { apps, success: false, response: "Couldn't get apps" };
      }

      return { apps, response: "", success: true };
    }),

    makeEndpoint("sensible/core", "GET", async (ctx) => {
      const { definition } = ctx.body;

      const models = getCachedSchema(interpretableTypes, schemasFolderPath);

      return { models, success: true, response: "Good" };
    }),

    makeEndpoint("sensible/doc", "GET", async (ctx) => {
      const { slug, pathToDoc } = ctx.body;

      //const md = findAllMd(basePath, true);

      const doc = pathToDoc ? parseMd(pathToDoc) : undefined;
      return {
        doc,
        response: doc ? "Success" : "Couldn't find document",
        success: !!doc,
      };
    }),

    makeEndpoint(
      "sensible/docs",
      "GET",
      async (ctx): Promise<DocsEndpoint["response"]> => {
        // //is this still needed? dont think so
        // ctx.res.header("Access-Control-Allow-Origin", "*");
        // ctx.res.header("Access-Control-Allow-Headers", "X-Requested-With");

        const { slug } = ctx.body;

        return {
          hoi: "/apath",
        };
      }
    ),

    makeEndpoint("sensible/errors", "GET", async (ctx) => {
      const { app, endpoint } = ctx.body;
      return { errors: [{ message: "TEST" }] };
    }),

    makeEndpoint("sensible/examples", "GET", async (ctx) => {
      const { slug } = ctx.body;
      return {
        success: false,
        response: "Not implemented yet",
        endpointExamples: [],
        typeExamples: [],
      };
    }),

    makeEndpoint("sensible/other", "GET", async (ctx) => {
      const {} = ctx.body;

      // how to get this, and what is it used for?
      const repoUrl = "";

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
            // {
            //   label: "Board",
            //   url: cleanRepoUrl + "/projects",
            // },
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

      let crons: Cron[] = [];
      //crons = getCachedCrons(folderPath);

      return { crons, response: "Good", success: true, constants };
    }),

    makeEndpoint("sensible/recent", "GET", async (ctx) => {
      const { endpoint } = ctx.body;
      return { response: "Not implemented yet", success: false, recent: [] };
    }),

    makeEndpoint("sensible/ui", "GET", async (ctx) => {
      const { appFolderPath } = ctx.body;

      if (!appFolderPath) {
        return {
          success: false,
          response: "Please provide an app folder path",
          frontendFiles: {},
        };
      }

      const frontendFiles = getCachedFrontend(appFolderPath);

      return {
        frontendFiles,
        response: "Not implemented yet",
        success: false,
      };
    }),

    makeEndpoint("sensible/recent", "GET", async (ctx) => {
      ctx.res.header("Access-Control-Allow-Origin", "*");
      ctx.res.header("Access-Control-Allow-Headers", "X-Requested-With");

      return { success: false, response: "Not implemented yet", recent: [] };
    }),

    //redirect anything that doesn't work to the docs
    get("*", (ctx) => {
      return redirect(
        `https://docs.sensibleframework.co/${ctx.req.headers.host || ""}`
      );
    }),
  ];
};
