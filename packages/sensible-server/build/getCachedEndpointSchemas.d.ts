import * as TJS from "typescript-json-schema";
import { ModelSchemaObject } from "sensible-core";
export declare const getCachedEndpointSchemas: <TAllEndpoints extends unknown, TEndpoint extends keyof TAllEndpoints = keyof TAllEndpoints>(schema: ModelSchemaObject) => {
    endpointSchemas: {
        [key: string]: TJS.Definition | null | undefined;
    };
    endpoints: {
        [key: string]: string | undefined;
    };
};
//# sourceMappingURL=getCachedEndpointSchemas.d.ts.map