import { FolderPath, Path } from "./types";
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
//# sourceMappingURL=util.files.d.ts.map