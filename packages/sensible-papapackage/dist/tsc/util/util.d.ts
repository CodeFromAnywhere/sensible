import { Arguments } from "yargs";
import { Ora } from "ora";
import type { Watch, ProjectType, LinkingStrategy, LinkingCli, WatchPackageObject, PackageInfo } from "./types.js";
import * as watchman from "fb-watchman";
export declare const hasDependency: (packageJson: PackageInfo, dependency: string) => boolean;
export declare const getProjectType: (packageJson: any) => ProjectType;
/**
 * searches for a match (file) in a base dir, but ignores folders in {ignore}
 */
export declare function searchRecursiveSync(dir: string, ignore: string[], match: string): string[];
export declare const findPackageDependencyPair: (dependencyPackagesNames: (string | undefined)[]) => (p: PackageInfo) => {
    package: PackageInfo;
    dependencies: string[];
};
export declare const getLinkingStrategy: (type?: ProjectType | undefined) => LinkingStrategy;
export declare const getRelevantWatchlistInfo: (object: WatchPackageObject) => Watch;
export declare const getPackages: (args: (string | number)[]) => {
    files: string[];
    packages: PackageInfo[];
};
export declare const getSrcDestsPairs: (argv: Arguments, status: Ora) => WatchPackageObject[];
export declare function notEmpty<TValue>(value: TValue | null | undefined): value is TValue;
export declare const calculateWatchlist: (argv: Arguments) => Watch[];
export declare const watchAndSubscribe: (client: watchman.Client, debug: boolean, status: Ora, watchlist: Watch[]) => (error: any, resp: any) => void;
export declare const showCommands: () => void;
export declare const showInfo: () => void;
export declare const linkWatchlist: (watchlist: Watch[], cli: LinkingCli, debug: boolean) => void;
/**
 * exclude: remove certain keys from the copy of an object and return it
 */
export declare const exclude: (object: {
    [key: string]: any;
}, keys: string[]) => {
    [x: string]: any;
};
export declare const showLatestEventInfo: () => void;
export declare const logWatchlist: (watchlist: Watch[]) => void;
export declare const getRelevantPackageInfo: (path: string) => PackageInfo | null;
/**
 * is higher or the same version
 */
export declare const isHigherVersion: (x: string, y: string) => boolean;
export declare const keepHighestVersion: (packages: PackageInfo[], current: PackageInfo) => PackageInfo[];
export declare const watchWatch: (client: watchman.Client, status: Ora, debug: boolean) => (watch: Watch) => void;
export declare function makeSubscription(client: watchman.Client, watchBaseFolder: string, watchRelativePath: string, debug: boolean): string;
export declare const createSubscriptionEventEmitter: (client: watchman.Client, watchlist: Watch[], debug: any) => void;
export declare const createWatchmanConfig: (watch: Watch) => void;
export declare const chooseFolder: (args: (string | number)[]) => string;
export declare function unique<T>(a: T[], getId: (a: T) => string): T[];
export declare const getAllPackageJsonDependencies: (p: PackageInfo) => string[];
export declare const getDependenciesList: (concatDependencies: string[], p: PackageInfo) => string[];
export declare const getFolder: (path: string) => string;
