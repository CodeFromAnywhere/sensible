/**
 * finds all .template renamed files recursively and returns the paths in an array
 */
export declare const findTemplateFiles: (dirName: string) => string[];
export declare const renameToTemplateFile: (fileName: string) => string;
export declare const renameTemplateToNormalFile: (fileName: string) => string;
export declare const findAndRenameTemplateFiles: (appDir: string) => (onDone: () => void) => void;
//# sourceMappingURL=util.templates.d.ts.map