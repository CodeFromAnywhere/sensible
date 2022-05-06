export declare type UnixTimestamp = number;
export declare type MarkdownContent = string;
export interface Md {
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
//# sourceMappingURL=types.d.ts.map