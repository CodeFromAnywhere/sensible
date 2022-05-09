import { App, AppsObject, InterpretableTypes, ProjectType } from "sensible-core";
import { Path } from "sensible-files";
export declare const getAppType: (projectType: ProjectType, folder: string) => "server" | "frontend" | "core" | null;
/**
 *
 * @param folderPath path to app folder
 * @param modelSchemaObject only needed for core folder
 * @returns App | null
 */
export declare const getAppInfo: (folderPath: Path) => App | null;
export declare const getCachedApps: (appPaths: Path[], interpretableTypes: InterpretableTypes, schemasFolderPath: Path) => AppsObject;
//# sourceMappingURL=getCachedApps.d.ts.map