import * as TJS from "typescript-json-schema";
export declare const getCachedEndpointSchemas: <TAllEndpoints extends unknown, TEndpoint extends keyof TAllEndpoints = keyof TAllEndpoints>(schema: TJS.Definition | null) => {
    endpointSchemas: {
        [key: string]: TJS.Definition | undefined;
    };
    endpoints: {
        [key: string]: string | undefined;
    };
};
//# sourceMappingURL=getCachedEndpointSchemas.d.ts.map