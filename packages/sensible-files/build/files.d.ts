import { Path, FolderPath } from "./types";
export declare const mergeObjectsArray: (objectsArray: object[]) => {
    [key: string]: any;
};
export declare const withoutExtension: (fileName: string) => string;
export declare const getExtension: (fileName: string) => string;
export declare const findFilesRecursively: ({ match, basePath, relativePath, onlyInSubFolders, onlyInCurrentFolder, }: {
    match: (fileName: string, extension: string) => boolean;
    basePath: Path;
    relativePath?: string | undefined;
    /**
     * only find files in folders of this location, not in this location itself
     */
    onlyInSubFolders?: boolean | undefined;
    onlyInCurrentFolder?: boolean | undefined;
}) => FolderPath[];
export declare const isArrayGuard: (moduleExports: any) => boolean;
/**
 * @param slug what should the suffix or the name of thie file be (plural also possible)
 * @returns file path array
 */
export declare const findFiles: (slug: string, basePath: string) => FolderPath[];
export declare const importFromFiles: ({ files, importStrategy, list, guard, }: {
    files: Path[];
    importStrategy?: "default" | "fileName" | "list" | undefined;
    list?: string[] | undefined;
    guard?: ((moduleExports: any) => boolean) | undefined;
}) => any[];
//# sourceMappingURL=files.d.ts.map