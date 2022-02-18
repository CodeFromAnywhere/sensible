import { Endpoint } from "sensible-core";
import { ModelSchemaObject } from ".";
export interface DocsEndpoint extends Endpoint {
    method: "GET";
    body: {};
    response: {
        constants: object;
        schema?: ModelSchemaObject;
        success: boolean;
        response: string;
    };
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