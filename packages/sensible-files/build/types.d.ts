export declare type UnixTimestamp = number;
export declare type MarkdownContent = string;
export interface Markdown {
    fileName: string;
    params: {
        title?: string;
        author?: string;
    } & {
        [key: string]: string;
    };
    createdAt: UnixTimestamp;
    updatedAt: UnixTimestamp;
    modifiedAt: UnixTimestamp;
    openedAt: UnixTimestamp;
    content: MarkdownContent;
}
export declare type Path = string;
export declare type FolderPath = {
    relativeFolder: string | undefined;
    path: Path;
};
//# sourceMappingURL=types.d.ts.map