export type HomogeneousObject<T> = {
  [key: string]: T;
};

export type PackageInfoObject = HomogeneousObject<string>;

export type Command = {
  command: string;
  what: string;
};
export type PackageInfo = {
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

export type LinkingStrategy = "copy" | "link";

export type SubscriptionResponse = {
  subscription: FolderPathString;
  root: FolderPathString;
  files: FileType[];
};

export type ProjectType =
  | "next"
  | "react-native"
  | "react"
  | "express"
  | "unknown";

export type LinkingCli = "yarn" | "npm";

export type WatchmanDest = {
  currentPackageJsonPath?: string;
  currentVersion?: string;
  destinationFolder: string;
};

export type WatchDestination = {
  folderPath: FolderPathString;
  linkingStrategy: LinkingStrategy;
  packageInfo: PackageInfo;
};

export type WatchPackageObject = {
  src: PackageInfo;
  dests: PackageInfo[];
};

export type WatchSource = {
  packageInfo: PackageInfo;
  folderPath: FolderPathString;
  dependencyName: string;
};

export type Watch = {
  src: WatchSource;
  dests: WatchDestination[];
};

export type FolderPathString = string;

export type FileType = {
  // ["name", "size", "mtime_ms", "exists", "type"]
  name: string;
  size: number;
  mtime_ms: number;
  exists: boolean;
  type: string;
};
