"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeSensibleEndpoints = void 0;
const path_1 = __importDefault(require("path"));
const sensible_files_1 = require("sensible-files");
const server_1 = __importDefault(require("server"));
const reply_1 = require("server/reply");
const createMakeEndpoint_1 = require("../createMakeEndpoint");
const getCachedApps_1 = require("../getCachedApps");
const getCachedFrontend_1 = require("../getCachedFrontend");
const getCachedSchema_1 = require("../getCachedSchema");
const { get } = server_1.default.router;
const makeSensibleEndpoints = (basePath, appPaths, interpretableTypes, constants) => {
    const schemasFolderPath = path_1.default.join(basePath, "..", "schemas");
    const makeEndpoint = (0, createMakeEndpoint_1.createMakeEndpoint)(interpretableTypes, //.concat(defaultEndpointsTypeFiles)
    schemasFolderPath);
    return [
        makeEndpoint("sensible/apps", "GET", async (ctx) => {
            const { app } = ctx.body;
            let apps = {};
            try {
                apps = (0, getCachedApps_1.getCachedApps)(appPaths, interpretableTypes, schemasFolderPath);
            }
            catch (e) {
                console.warn(e);
                return { apps, success: false, response: "Couldn't get apps" };
            }
            return { apps, response: "", success: true };
        }),
        makeEndpoint("sensible/core", "GET", async (ctx) => {
            const { definition } = ctx.body;
            const models = (0, getCachedSchema_1.getCachedSchema)(interpretableTypes, schemasFolderPath);
            return { models, success: true, response: "Good" };
        }),
        makeEndpoint("sensible/doc", "GET", async (ctx) => {
            const { slug, pathToDoc } = ctx.body;
            //const md = findAllMd(basePath, true);
            const doc = pathToDoc ? (0, sensible_files_1.parseMd)(pathToDoc) : undefined;
            return {
                doc,
                response: doc ? "Success" : "Couldn't find document",
                success: !!doc,
            };
        }),
        makeEndpoint("sensible/docs", "GET", async (ctx) => {
            // //is this still needed? dont think so
            // ctx.res.header("Access-Control-Allow-Origin", "*");
            // ctx.res.header("Access-Control-Allow-Headers", "X-Requested-With");
            const { slug } = ctx.body;
            return {
                hoi: "/apath",
            };
        }),
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
            const githubLinks = cleanRepoUrl
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
            const extendedConstants = {
                ...constants,
                links: (constants.links || []).concat(githubLinks),
            };
            let crons = [];
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
            const frontendFiles = (0, getCachedFrontend_1.getCachedFrontend)(appFolderPath);
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
            return (0, reply_1.redirect)(`https://docs.sensibleframework.co/${ctx.req.headers.host || ""}`);
        }),
    ];
};
exports.makeSensibleEndpoints = makeSensibleEndpoints;
//# sourceMappingURL=api.js.map