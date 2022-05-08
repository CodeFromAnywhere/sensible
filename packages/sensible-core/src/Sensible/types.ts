import * as TJS from "typescript-json-schema";
import { Endpoint } from "../types";
import { Path, Markdown } from "sensible-files";
//////////// Here the Sensible API types and all types related to that ///////////////

export type RootModel = "root";
export type AllEndpointsModel = "AllEndpoints";

export type InterpretableTypes = {
  [key in RootModel | string]: {
    endpoints: Path[];
    types: Path[];
    endpointExamples: Path[];
    typeExamples: Path[];
  };
};

export type Method = "GET" | "POST";

export type EndpointExample = {
  type: "endpoint";
  path: `${Method}:${string}`;
  id: number;
  body: object;
  response: object;
};

export type TypeExample = {
  type: "type";
  typeInterfaceName: string;
  value: any;
};

export type DefinitionObject = {
  [key: string]: TJS.DefinitionOrBoolean;
};

export type ModelSchemaObject = {
  [key: string | RootModel]: {
    endpoints?: DefinitionObject;
    types?: DefinitionObject;
  };
};

export interface Cron {
  interval: string;
  comment: string;
}

export interface CoreResponse {
  success: boolean;
  response?: string;
  models: ModelSchemaObject;
}

export type RecentType = Endpoint & {
  endpoint: string;
};

export interface AppsObject {
  [key: string]: App;
}
export interface App {
  folder: string;
  private: boolean;
  /**
   * must be defined as it could be used as a key
   */
  name: string;
  version?: string;
  description?: string;
  dependencies: Dependency[];
  devDependencies: Dependency[];
  peerDependencies: Dependency[];
  repo?: string;
  homepage?: string;
}

export interface Dependency {
  name: string;
  private: boolean;
  version: string;
  latestVersion: string;
  description?: string;
  md: Markdown[];
  repo?: string;
  homepage?: string;
}

export type FileOrFolder = string;

/**
 * should be typed based on which interpreter we use
 */
export type Interface = any;

export type Parameter = {
  variable: string;
  type: Interface;
};

export interface FrontendExport {
  name: string;
  params?: Parameter[];
  interface?: Interface;
  return: Interface;
  description?: string;
  annotations: {
    [key: string]: any;
  };
}

export type FrontendFileObject = { [key: string]: FrontendFile };

export interface FrontendFile {
  fileName: string;
  isFolder: boolean;
  folderContent: FrontendFile[];
  defaultExport?: FrontendExport;
  otherExports: FrontendExport[];
}

export type PackageInfoObject = {
  [key: string]: string;
};

export type ProjectType =
  | "next"
  | "react-native"
  | "react"
  | "express"
  | "server"
  | "unknown";

export type PackageInfo = {
  path: string;
  name?: string;
  description?: string;
  type: ProjectType;
  version?: string;
  private?: boolean;
  author?: string | { [key: string]: string };
  repository: string | { [key: string]: string };
  homepage?: string;
  dependencies?: PackageInfoObject;
  devDependencies?: PackageInfoObject;
  peerDependencies?: PackageInfoObject;
};

export type MenuItemPath = string;

//Todo: if the interpreter of type interfaces can't handle this, let's just kiss and have a maximum depth of 1 for menus
export type Menu = {
  [title: string]: Menu | MenuItemPath;
};

//@example
// const menu: Menu = {
//   Guides: {
//     Expo: {
//       Camera: "/guides/expo/camera.md",
//       "Tab Bar": "/guides/expo/camera.md",
//       "Menu Bar": "/guides/expo/camera.md",
//     },
//   },
// };

export type ErrorType = {
  message: string;
};

export type ErrorResponse = {
  errors: ErrorType[];
};
