import {
  Cron,
  Dependency,
  FrontendFile,
  InterpretableTypes,
  ModelSchemaObject,
  PackageInfo,
  PackageInfoObject,
  Path,
  ProjectType,
} from ".";
import { App } from "./defaultEndpointTypes";
import { getCachedCrons } from "./getCachedCrons";
import { getCachedSchema } from "./getCachedSchema";
import fs from "fs";
import path from "path";
import { notEmpty } from "sensible-core";
import { getCachedFrontend } from "./getCachedFrontend";
import { findAllMd } from "./findAllMd";
/**
 * parse a md file to all the needed info
 * @param mdFilePath path to a md file
 * @returns Md
 */

export const getAppType = (projectType: ProjectType, folder: string) => {
  return ["next", "react", "react-native"].includes(projectType)
    ? "frontend"
    : ["express", "server"].includes(projectType)
    ? "server"
    : folder.startsWith("sensible-core-")
    ? "core"
    : null;
};

export const getDependencies = (
  dependencies: PackageInfoObject | undefined,
  folderPath: string
) => {
  return dependencies
    ? Object.keys(dependencies)
        .map((key) => {
          const value = dependencies?.[key]!;
          return getDependencyObject(
            key,
            value,
            path.join(folderPath, "node_modules", key)
          );
        })
        .filter(notEmpty)
    : [];
};

export const getRepo = (
  repository: { [key: string]: string | undefined } | string | undefined
) => (typeof repository === "object" ? repository.url : repository);

export const getAllPackageJsonDependencies = (p: PackageInfo): string[] => {
  const dependencies = p.dependencies ? Object.keys(p.dependencies) : [];
  const devDependencies = p.devDependencies
    ? Object.keys(p.devDependencies)
    : [];
  const peerDependencies = p.peerDependencies
    ? Object.keys(p.peerDependencies)
    : [];

  return [...dependencies, ...devDependencies, ...peerDependencies];
};

export const hasDependency = (packageJson: PackageInfo, dependency: string) => {
  return getAllPackageJsonDependencies(packageJson).includes(dependency);
};

export const getProjectType = (packageJson: any): ProjectType => {
  const hasNext = hasDependency(packageJson, "next");
  const hasExpo = hasDependency(packageJson, "expo");
  const hasReactNative = hasDependency(packageJson, "react-native");
  const hasReact = hasDependency(packageJson, "react");
  const hasExpress = hasDependency(packageJson, "express");
  const hasServer = hasDependency(packageJson, "server");

  return hasNext
    ? "next"
    : hasExpo || hasReactNative
    ? "react-native"
    : hasReact
    ? "react"
    : hasExpress
    ? "express"
    : hasServer
    ? "server"
    : "unknown";
};

export const getRelevantPackageInfo = (path: string): PackageInfo | null => {
  let fileBuffer;
  try {
    fileBuffer = fs.readFileSync(path);
  } catch (e) {
    //can't find file
    console.warn("couldn't find file");
  }

  //@ts-ignore // why doesn't JSON know it can parse a buffer? Touche
  const json = fileBuffer ? JSON.parse(fileBuffer) : null;

  return json
    ? {
        path,
        description: json.description,
        name: json.name,
        version: json.version,
        private: json.private,
        author: json.author,
        repository: json.repository,
        homepage: json.homepage,
        dependencies: json.dependencies,
        devDependencies: json.devDependencies,
        peerDependencies: json.peerDependencies,
        type: getProjectType(json),
      }
    : null;
};

export const getDependencyObject = (
  dependencyName: string,
  currentVersion: string,
  dependencyPath: string
): Dependency | null => {
  const packageInfo = getRelevantPackageInfo(
    path.join(dependencyPath, "package.json")
  );

  if (!packageInfo) {
    console.warn(`Couldn't find package.json for dependency ${dependencyPath}`);
    return null;
  }

  const md = findAllMd(dependencyPath);

  return {
    name: dependencyName,
    version: currentVersion,
    latestVersion: packageInfo.version!,
    homepage: packageInfo.homepage,
    description: packageInfo.description,
    private: packageInfo.private || false,
    repo: getRepo(packageInfo.repository),
    md,
  };
};

export const getAppInfo = (
  folderPath: Path,
  models: ModelSchemaObject
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
  const md = findAllMd(folderPath);

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
    md,
    crons,
    frontend,
    models: type === "core" ? models : undefined,
    dependencies: getDependencies(packageInfo.dependencies, folderPath),
    devDependencies: getDependencies(packageInfo.devDependencies, folderPath),
    peerDependencies: getDependencies(packageInfo.peerDependencies, folderPath),
  };
};
//just generate the schema once every server restart because there can't be any changes without the server restarting.
let cachedApps: App[] = [];

/** general purpose function that maps over an array and only returns it as part of the mapped array if the result is truthy */
export const mapOrRemove = <T extends unknown, U extends unknown>(
  array: T[],
  mapFn: (item: T) => U | null
): U[] => {
  const initialReturnArray: any[] = [];

  return array.reduce((all, item) => {
    const mappedItem = mapFn(item);
    if (mappedItem) {
      all.push(mappedItem);
    }
    return all;
  }, initialReturnArray);
};

export const getCachedApps = (
  appPaths: Path[],
  interpretableTypes: InterpretableTypes
): App[] => {
  if (cachedApps.length > 0) {
    return cachedApps;
  }

  const models = getCachedSchema(interpretableTypes);
  const apps = mapOrRemove(appPaths, (path) => getAppInfo(path, models));

  cachedApps = apps;
  return apps;
};
