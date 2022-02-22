"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDefaultEndpoints = exports.makeDocsEndpoints = void 0;
const createMakeEndpoint_1 = require("./createMakeEndpoint");
const server_1 = __importDefault(require("server"));
const reply_1 = require("server/reply");
const getCachedApps_1 = require("./getCachedApps");
const findAllMd_1 = require("./findAllMd");
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
const makeDocsEndpoints = (makeEndpoint, basePath, appPaths, interpretableTypes, constants) => {
    const docsEndpoint = async (ctx) => {
        ctx.res.header("Access-Control-Allow-Origin", "*");
        ctx.res.header("Access-Control-Allow-Headers", "X-Requested-With");
        let apps = [];
        try {
            apps = (0, getCachedApps_1.getCachedApps)(appPaths, interpretableTypes);
        }
        catch (e) {
            console.warn(e);
            return { success: false, response: "Couldn't get apps" };
        }
        const repoUrl = apps[0].repo;
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
        const extendedConstants = {
            ...constants,
            links: (constants.links || []).concat(githubLinks),
        };
        const md = (0, findAllMd_1.findAllMd)(basePath, true);
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
exports.makeDocsEndpoints = makeDocsEndpoints;
// TODO: should also expose these in models under Sensible key
// const defaultEndpointsTypeFiles = [resolve("./defaultEndpointTypes.ts")];
const { get } = server_1.default.router;
const makeDefaultEndpoints = (basePath, appPaths, interpretableTypes, constants) => {
    const makeEndpoint = (0, createMakeEndpoint_1.createMakeEndpoint)(interpretableTypes //.concat(defaultEndpointsTypeFiles)
    );
    // for now we only have doc-endpoints. Don't know what needs to be there more actually, but let's see.
    return (0, exports.makeDocsEndpoints)(makeEndpoint, basePath, appPaths, interpretableTypes, constants).concat([
        //redirect anything that doesn't work to the docs
        get("*", (ctx) => {
            return (0, reply_1.redirect)(`https://docs.sensibleframework.co/${ctx.req.headers.host || ""}`);
        }),
    ]);
};
exports.makeDefaultEndpoints = makeDefaultEndpoints;
//# sourceMappingURL=defaultEndpoints.js.map