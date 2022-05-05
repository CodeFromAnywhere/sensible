import path from "path";
import {
  App,
  Cron,
  FrontendFile,
  InterpretableTypes,
  mapOrRemove,
  ModelSchemaObject,
  Path,
  ProjectType,
} from "sensible-core";
import { getCachedCrons } from "./getCachedCrons";
import { getCachedFrontend } from "./getCachedFrontend";
import { getCachedSchema } from "./getCachedSchema";
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
export const getAppInfo = (
  folderPath: Path,
  modelSchemaObject: ModelSchemaObject
): App | null => {
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

  let crons: Cron[] = [];
  if (type === "server") {
    crons = getCachedCrons(folderPath);
  }

  let frontend: FrontendFile[] = [];

  if (type === "frontend") {
    frontend = getCachedFrontend(folderPath);
  }

  return {
    folder,
    name: packageInfo.name,
    private: packageInfo.private || false,
    version: packageInfo.version,
    description: packageInfo.description,
    homepage: packageInfo.homepage,
    repo: getRepo(packageInfo.repository),
    crons,
    frontend,
    models: type === "core" ? modelSchemaObject : undefined,
    // TODO: put back after i cached this properly (if needed). Probably also should put this in separate api?
    md: [], //findAllMd(folderPath);
    dependencies: [], //getCachedDependencies(packageInfo.dependencies, folderPath),
    devDependencies: [], //getDependencies(packageInfo.devDependencies, folderPath),
    peerDependencies: [], //getDependencies(packageInfo.peerDependencies, folderPath),
  };
};
//just generate the schema once every server restart because there can't be any changes without the server restarting.
let cachedApps: App[] = [];

export const getCachedApps = (
  appPaths: Path[],
  interpretableTypes: InterpretableTypes,
  schemasFolderPath: Path
): App[] => {
  if (cachedApps.length > 0) {
    return cachedApps;
  }

  const models = getCachedSchema(interpretableTypes, schemasFolderPath);
  const apps = mapOrRemove(appPaths, (path) => getAppInfo(path, models));

  cachedApps = apps;
  return apps;
};
