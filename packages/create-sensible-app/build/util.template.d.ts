/**
 * finds all .template renamed files recursively and returns the paths in an array
 */
export declare const findTemplateFiles: (templateFolder?: string | undefined) => string[];
export declare const renameToTemplateFile: (fileName: string) => string;
export declare const renameTemplateToNormalFile: (fileName: string) => string;
export declare const findAndRenameTemplateFiles: (resolve: () => void) => void;
//# sourceMappingURL=util.template.d.ts.map