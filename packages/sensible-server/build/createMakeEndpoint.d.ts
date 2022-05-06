import Ajv from "ajv";
import * as TJS from "typescript-json-schema";
import { CreateMakeEndpointType } from ".";
export declare const ajv: Ajv;
export declare const typeHasIncorrectInterface: (typeName: string, data: any, schema: TJS.Definition) => false | string;
/**
 * This function is provided the schema info from core and creates a typed function that can be used on the server to make endpoints
 * @param interpretableTypes
 * @param schemasFolderPath
 * @returns
 */
export declare const createMakeEndpoint: CreateMakeEndpointType;
//# sourceMappingURL=createMakeEndpoint.d.ts.map