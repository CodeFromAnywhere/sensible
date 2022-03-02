import { InterpretableTypes, ModelSchemaObject, Path, ProjectType, App } from "sensible-core";
export declare const getAppType: (projectType: ProjectType, folder: string) => "server" | "frontend" | "core" | null;
/**
 *
 * @param folderPath path to app folder
 * @param modelSchemaObject only needed for core folder
 * @returns App | null
 */
export declare const getAppInfo: (folderPath: Path, modelSchemaObject: ModelSchemaObject) => App | null;
export declare const getCachedApps: (appPaths: Path[], interpretableTypes: InterpretableTypes, schemasFolderPath: Path) => App[];
//# sourceMappingURL=getCachedApps.d.ts.map