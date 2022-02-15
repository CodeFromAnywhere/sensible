import { Endpoint } from "sensible-core";
import { ServerEndpoint } from "./types";
export declare const typeIsValid: (body: any, type: any) => true | {
    invalidParams: string[];
    invalidBody: string[];
};
export declare const createMakeEndpoint: <TAllEndpoints extends unknown>() => <TEndpoint extends keyof TAllEndpoints>(path: TEndpoint, method: TAllEndpoints[TEndpoint] extends Endpoint ? TAllEndpoints[TEndpoint]["method"] : never, endpoint: ServerEndpoint<TAllEndpoints[TEndpoint] extends Endpoint ? TAllEndpoints[TEndpoint] : never>) => import("server/typings/common").Middleware;
//# sourceMappingURL=createMakeEndpoint.d.ts.map