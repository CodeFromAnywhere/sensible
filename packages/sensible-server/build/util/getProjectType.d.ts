import { PackageInfo, ProjectType } from "sensible-core";
export declare const getAllPackageJsonDependencies: (p: PackageInfo) => string[];
export declare const hasDependency: (packageJson: PackageInfo, dependency: string) => boolean;
export declare const getProjectType: (packageJson: any) => ProjectType;
//# sourceMappingURL=getProjectType.d.ts.map