import * as TJS from "typescript-json-schema";
import { Endpoint } from "../types";
import { Path, Markdown } from "sensible-files";
export declare type RootModel = "root";
export declare type AllEndpointsModel = "AllEndpoints";
export declare type InterpretableTypes = {
    [key in RootModel | string]: {
        endpoints: Path[];
        types: Path[];
        endpointExamples: Path[];
        typeExamples: Path[];
    };
};
export declare type Method = "GET" | "POST";
export declare type EndpointExample = {
    type: "endpoint";
    path: `${Method}:${string}`;
    id: number;
    body: object;
    response: object;
};
export declare type TypeExample = {
    type: "type";
    typeInterfaceName: string;
    value: any;
};
export declare type DefinitionObject = {
    [key: string]: TJS.DefinitionOrBoolean;
};
export declare type ModelSchemaObject = {
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
export declare type RecentType = Endpoint & {
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
export declare type FileOrFolder = string;
/**
 * should be typed based on which interpreter we use
 */
export declare type Interface = any;
export declare type Parameter = {
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
export declare type FrontendFileObject = {
    [key: string]: FrontendFile;
};
export interface FrontendFile {
    fileName: string;
    isFolder: boolean;
    folderContent: FrontendFile[];
    defaultExport?: FrontendExport;
    otherExports: FrontendExport[];
}
export declare type PackageInfoObject = {
    [key: string]: string;
};
export declare type ProjectType = "next" | "react-native" | "react" | "express" | "server" | "unknown";
export declare type PackageInfo = {
    path: string;
    name?: string;
    description?: string;
    type: ProjectType;
    version?: string;
    private?: boolean;
    author?: string | {
        [key: string]: string;
    };
    repository: string | {
        [key: string]: string;
    };
    homepage?: string;
    dependencies?: PackageInfoObject;
    devDependencies?: PackageInfoObject;
    peerDependencies?: PackageInfoObject;
};
export declare type MenuItemPath = string;
export declare type Menu = {
    [title: string]: Menu | MenuItemPath;
};
export declare type ErrorType = {
    message: string;
};
export declare type ErrorResponse = {
    errors: ErrorType[];
};
//# sourceMappingURL=types.d.ts.map