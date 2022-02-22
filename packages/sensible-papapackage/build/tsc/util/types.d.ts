export declare type HomogeneousObject<T> = {
    [key: string]: T;
};
export declare type Command = {
    command: string;
    what: string;
};
export declare type PackageInfoObject = {
    [key: string]: string;
};
export declare type PackageInfo = {
    path: string;
    name?: string;
    type: ProjectType;
    version?: string;
    private?: boolean;
    author?: string;
    dependencies?: PackageInfoObject;
    devDependencies?: PackageInfoObject;
    peerDependencies?: PackageInfoObject;
};
export declare type LinkingStrategy = "copy" | "link";
export declare type SubscriptionResponse = {
    subscription: FolderPathString;
    root: FolderPathString;
    files: FileType[];
};
export declare type ProjectType = "next" | "react-native" | "react" | "express" | "unknown";
export declare type LinkingCli = "yarn" | "npm";
export declare type WatchmanDest = {
    currentPackageJsonPath?: string;
    currentVersion?: string;
    destinationFolder: string;
};
export declare type WatchDestination = {
    folderPath: FolderPathString;
    linkingStrategy: LinkingStrategy;
    packageInfo: PackageInfo;
};
export declare type WatchPackageObject = {
    src: PackageInfo;
    dests: PackageInfo[];
};
export declare type WatchSource = {
    packageInfo: PackageInfo;
    folderPath: FolderPathString;
    dependencyName: string;
};
export declare type Watch = {
    src: WatchSource;
    dests: WatchDestination[];
};
export declare type FolderPathString = string;
export declare type FileType = {
    name: string;
    size: number;
    mtime_ms: number;
    exists: boolean;
    type: string;
};
