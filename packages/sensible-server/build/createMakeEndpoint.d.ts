import { Endpoint } from "sensible-core";
import * as TJS from "typescript-json-schema";
import Ajv from "ajv";
import { InterpretableTypes } from "sensible-core";
import { Context } from "./server.types";
export declare type Keys<TObject> = Extract<keyof TObject, string>;
export declare const ajv: Ajv;
export declare const typeHasIncorrectInterface: (typeName: string, data: any, schema: TJS.Definition) => false | string;
export declare const createMakeEndpoint: <TAllEndpoints extends { [key in Extract<keyof TAllEndpoints, string>]: Endpoint; }>(interpretableTypes: InterpretableTypes) => <TEndpoint extends Extract<keyof TAllEndpoints, string>>(path: TEndpoint, method: TAllEndpoints[TEndpoint]["method"], endpoint: (ctx: Context & {
    body: TAllEndpoints[TEndpoint]["body"];
}) => Promise<TAllEndpoints[TEndpoint]["response"]>) => import("server/typings/common").Middleware;
//# sourceMappingURL=createMakeEndpoint.d.ts.map