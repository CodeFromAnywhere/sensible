import { Endpoint, InterpretableTypes, Path } from "sensible-core";
import { PublicConstantsType } from "sensible-core";
import { MakeEndpointType } from ".";
export declare const makeDocsEndpoints: <TAllDefaultEndpoints extends { [key in Extract<keyof TAllDefaultEndpoints, string>]: Endpoint; }>(makeEndpoint: MakeEndpointType<TAllDefaultEndpoints>, basePath: Path, appPaths: Path[], interpretableTypes: InterpretableTypes, constants: PublicConstantsType, schemasFolderPath: Path) => import("server/typings/common").Middleware[];
//# sourceMappingURL=makeDocsEndpoints.d.ts.map