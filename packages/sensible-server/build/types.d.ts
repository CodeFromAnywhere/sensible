import { Context } from "./server";
import { Endpoint } from "sensible-core";
import * as TJS from "typescript-json-schema";
export declare type WithDataValues<TModel> = TModel & {
    dataValues: TModel;
};
export declare type ServerEndpoint<TEndpoint extends Endpoint> = (ctx: Context & {
    body: TEndpoint["body"];
}) => Promise<TEndpoint["response"]>;
export declare type RootModel = "root";
export declare type AllEndpointsModel = "AllEndpoints";
export declare type Path = string;
export declare type FolderPath = {
    relativeFolder: string | undefined;
    path: Path;
};
export declare type InterpretableTypes = {
    [key in RootModel | AllEndpointsModel | string]: {
        endpoints: Path[];
        types: Path[];
        examples: Path[];
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
export declare type ModelSchemaObject = {
    [key: string | RootModel | AllEndpointsModel]: {
        endpoints: TJS.Definition | null;
        types: TJS.Definition | null;
        examples: (EndpointExample | TypeExample)[];
    };
};
//# sourceMappingURL=types.d.ts.map