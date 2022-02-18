/**
 * @param slug what should the suffix or the name of thie file be (plural also possible)
 * @returns file path array
 */
export declare const findFiles: (slug: string, location: string) => string[];
export declare const findFilesRecursively: ({ match, location, onlyInSubFolders, }: {
    match: (fileName: string) => boolean;
    location: Path;
    /**
     * only find files in folders of this location, not in this location itself
     */
    onlyInSubFolders?: boolean | undefined;
}) => Path[];
export declare type Path = string;
export declare const withoutExtension: (fileName: string) => string;
export declare const importFromFiles: ({ files, importStrategy, list, guard, }: {
    files: Path[];
    importStrategy?: "default" | "fileName" | "list" | undefined;
    list?: string[] | undefined;
    guard?: ((moduleExports: any) => boolean) | undefined;
}) => any[];
//# sourceMappingURL=files.util.d.ts.map