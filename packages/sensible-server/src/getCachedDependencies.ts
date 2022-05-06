import { Dependency, PackageInfoObject } from "sensible-core";
import path from "path";
import { notEmpty } from "sensible-core";
import { findAllMd } from "sensible-files";
import { getRelevantPackageInfo } from "./util/getRelevantPackageInfo";
import { getRepo } from "./util/getRepo";

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

export const getCachedDependencies = (
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
