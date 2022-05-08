import path from "path";
import {
  App,
  AppsObject,
  InterpretableTypes,
  ProjectType,
} from "sensible-core";
import { Path } from "sensible-files";
import { getRelevantPackageInfo } from "./util/getRelevantPackageInfo";
import { getRepo } from "./util/getRepo";

export const getAppType = (projectType: ProjectType, folder: string) => {
  return ["next", "react", "react-native"].includes(projectType)
    ? "frontend"
    : ["express", "server"].includes(projectType)
    ? "server"
    : folder === "core"
    ? "core"
    : null;
};

/**
 *
 * @param folderPath path to app folder
 * @param modelSchemaObject only needed for core folder
 * @returns App | null
 */
export const getAppInfo = (folderPath: Path): App | null => {
  const folders = folderPath.split("/");
  const folder = folders.pop()!;

  const packageInfo = getRelevantPackageInfo(
    path.join(folderPath, "package.json")
  );

  if (!packageInfo) {
    console.warn("Couldn't find package.json in ", folderPath);
    return null;
  }

  const type = getAppType(packageInfo.type, folder);

  return {
    folder,
    name: packageInfo.name!,
    private: packageInfo.private || false,
    version: packageInfo.version,
    description: packageInfo.description,
    homepage: packageInfo.homepage,
    repo: getRepo(packageInfo.repository),
    // TODO: put back after i cached this properly (if needed). Probably also should put this in separate api?
    dependencies: [], //getCachedDependencies(packageInfo.dependencies, folderPath),
    devDependencies: [], //getDependencies(packageInfo.devDependencies, folderPath),
    peerDependencies: [], //getDependencies(packageInfo.peerDependencies, folderPath),
  };
};

//just generate the schema once every server restart because there can't be any changes without the server restarting.
let cachedApps: AppsObject = {};

export const getCachedApps = (
  appPaths: Path[],
  interpretableTypes: InterpretableTypes,
  schemasFolderPath: Path
) => {
  if (Object.keys(cachedApps).length > 0) {
    return cachedApps;
  }

  const apps = appPaths.reduce((allApps, appPath) => {
    const appInfo = getAppInfo(appPath);

    if (appInfo) {
      allApps[appInfo.name] = appInfo;
    }

    return allApps;
  }, {} as AppsObject);

  cachedApps = apps;
  return apps;
};
