export type UnixTimestamp = number;

export type MarkdownContent = string;

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

export type Path = string;
export type FolderPath = { relativeFolder: string | undefined; path: Path };
