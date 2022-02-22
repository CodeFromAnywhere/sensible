import { Endpoint, PublicConstantsType } from "sensible-core";
import { ModelSchemaObject } from ".";
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
export interface DocsEndpoint extends Endpoint {
    method: "GET";
    body: {};
    response: {
        response: string;
        success: false;
    } | {
        constants: PublicConstantsType;
        apps: App[];
        md: Md[];
        success: true;
    };
}
export interface Cron {
    interval: string;
    comment: string;
}
export interface App {
    folder: string;
    private: boolean;
    name?: string;
    version?: string;
    description?: string;
    dependencies: Dependency[];
    devDependencies: Dependency[];
    peerDependencies: Dependency[];
    repo?: string;
    homepage?: string;
    md: Md[];
    /**
     * only available for servers
     */
    crons?: Cron[];
    /**
     * only available for sensible-core-*
     */
    models?: ModelSchemaObject;
    /**
     * only available for sensible-ui-* or other react frontends
     */
    frontend?: FrontendFile[];
}
export interface Dependency {
    name: string;
    private: boolean;
    version: string;
    latestVersion: string;
    description?: string;
    md: Md[];
    repo?: string;
    homepage?: string;
}
export declare type UnixTimestamp = number;
export declare type MarkdownContent = string;
export interface Md {
    fileName: string;
    params: {
        title?: string;
        author?: string;
    } & {
        [key: string]: string;
    };
    createdAt: UnixTimestamp;
    updatedAt: UnixTimestamp;
    modifiedAt: UnixTimestamp;
    openedAt: UnixTimestamp;
    content: MarkdownContent;
}
export interface RecentEndpoint extends Endpoint {
    method: "GET";
    body: {};
    response: {
        success: boolean;
        response: string;
        recent?: (Endpoint & {
            endpoint: string;
        })[];
    };
}
export interface DefaultEndpoints {
    "sensible/docs": DocsEndpoint;
    "sensible/recent": RecentEndpoint;
}
export interface AllEndpoints extends DefaultEndpoints {
}
//# sourceMappingURL=defaultEndpointTypes.d.ts.map