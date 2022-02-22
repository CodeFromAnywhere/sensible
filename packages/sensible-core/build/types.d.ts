export interface Link {
    label: string;
    url: string;
}
export interface PublicConstants {
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
export interface DefaultResponse {
    success: boolean;
    response: string;
}
export interface DefaultModelType {
    id: number;
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=types.d.ts.map