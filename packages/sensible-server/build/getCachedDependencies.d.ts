import { Dependency, PackageInfoObject } from "sensible-core";
export declare const getDependencyObject: (dependencyName: string, currentVersion: string, dependencyPath: string) => Dependency | null;
export declare const getCachedDependencies: (dependencies: PackageInfoObject | undefined, folderPath: string) => Dependency[];
//# sourceMappingURL=getCachedDependencies.d.ts.map