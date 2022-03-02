import * as TJS from "typescript-json-schema";
export interface Link {
    label: string;
    url: string;
}
export interface PublicConstantsType {
    appName: string;
    email: string;
    /**
     * can probably remove this and declare this in the homepage of package.json of the actual frontend
     */
    domain: string;
    links?: Link[];
}
export declare type Endpoint = {
    /**
     * api path to endpoint (can contain '/')
     */
    path: string;
    /**
     * SOCKET and SUB aren't supported yet
     */
    method: "GET" | "POST" | "DELETE" | "SOCKET" | "SUB";
    body: object;
    response: object;
};
export declare type API<TAllEndpoints extends unknown> = <TEndpoint extends keyof TAllEndpoints>(endpoint: TEndpoint, method: TAllEndpoints[TEndpoint] extends Endpoint ? TAllEndpoints[TEndpoint]["method"] : never, body?: TAllEndpoints[TEndpoint] extends Endpoint ? TAllEndpoints[TEndpoint]["body"] : never, options?: {
    isExternal?: boolean;
}) => Promise<TAllEndpoints[TEndpoint] extends Endpoint ? TAllEndpoints[TEndpoint]["response"] : never>;
/**
 * whenever something fails, this is the recommended response.
 * Whenever something succeeds, you can either return this or success:true + some data
 */
export interface DefaultResponse {
    /**
     * a boolean indicating whether the intended action succeeded
     */
    success: boolean;
    /**
     * A message indicating the reason of failure (optionally this can be shown to the user)
     */
    response: string;
}
export interface DefaultModelType {
    id: number;
    createdAt: Date;
    updatedAt: Date;
}
export declare type RootModel = "root";
export declare type AllEndpointsModel = "AllEndpoints";
export declare type Path = string;
export declare type FolderPath = {
    relativeFolder: string | undefined;
    path: Path;
};
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
        typeExamples: TypeExample[];
        endpointExamples: EndpointExample[];
    };
};
export declare type DocResponse = {
    response?: string;
    constants?: PublicConstantsType;
    apps?: App[];
    md?: Md[];
    success: boolean;
};
export interface DocsEndpoint extends Endpoint {
    method: "GET";
    body: {};
    response: DocResponse;
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
//# sourceMappingURL=types.d.ts.map