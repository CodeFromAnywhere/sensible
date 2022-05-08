import { Path } from "sensible-files";
import * as TJS from "typescript-json-schema";
import { ModelSchemaObject, InterpretableTypes } from "sensible-core";
/**
 * returns unix timestamp (ms) of the last modificationdate of the last modified file
 **/
export declare const getLastModification: (files: Path[]) => number;
/**
 * If existing schema is not stale, just require it.
 * Otherwise, generate it for all files (this takes a long time).
 */
export declare const generateOrRequireSchema: ({ typeFiles, schemaFilePath, type, model, }: {
    typeFiles: Path[];
    schemaFilePath: Path;
    type: string;
    model: string;
}) => {
    [key: string]: TJS.DefinitionOrBoolean;
} | undefined;
export declare const getCachedSchema: (typeFilesObject: InterpretableTypes, schemasFolderPath: Path) => ModelSchemaObject;
//# sourceMappingURL=getCachedSchema.d.ts.map