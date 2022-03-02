"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDocsEndpoints = void 0;
const getCachedApps_1 = require("./getCachedApps");
const findAllMd_1 = require("./util/findAllMd");
const makeDocsEndpoints = (makeEndpoint, basePath, appPaths, interpretableTypes, constants, schemasFolderPath) => {
    const docsEndpoint = async (ctx) => {
        ctx.res.header("Access-Control-Allow-Origin", "*");
        ctx.res.header("Access-Control-Allow-Headers", "X-Requested-With");
        let apps = [];
        try {
            apps = (0, getCachedApps_1.getCachedApps)(appPaths, interpretableTypes, schemasFolderPath);
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
        const response = {
            success: true,
            constants: extendedConstants,
            apps,
            md,
        };
        return response;
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
//# sourceMappingURL=makeDocsEndpoints.js.map