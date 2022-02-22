import { Dependency, PackageInfo, PackageInfoObject, Path } from ".";
import { App } from "./defaultEndpointTypes";
/**
 * parse a md file to all the needed info
 * @param mdFilePath path to a md file
 * @returns Md
 */
export declare const getAppType: (projectType: ProjectType, folder: string) => "frontend" | "server" | "core" | null;
export declare const getDependencies: (dependencies: PackageInfoObject | undefined, folderPath: string) => any[];
export declare const getRepo: (repository: string | {
    [key: string]: string | undefined;
} | undefined) => string | undefined;
export declare const getAllPackageJsonDependencies: (p: PackageInfo) => string[];
export declare const hasDependency: (packageJson: PackageInfo, dependency: string) => boolean;
export declare const getProjectType: (packageJson: any) => ProjectType;
export declare const getRelevantPackageInfo: (path: string) => PackageInfo | null;
export declare const getDependencyObject: (dependencyName: string, currentVersion: string, dependencyPath: string) => Dependency | null;
export declare const getAppInfo: (folderPath: Path, models: ModelSchemaObject) => App | null;
/** general purpose function that maps over an array and only returns it as part of the mapped array if the result is truthy */
export declare const mapOrRemove: <T extends unknown, U extends unknown>(array: T[], mapFn: (item: T) => U | null) => U[];
export declare const getCachedApps: (appPaths: Path[], interpretableTypes: InterpretableTypes) => App[];
//# sourceMappingURL=getCachedApps.d.ts.map