import { Markdown, Path } from "./types";
import { findFilesRecursively } from "./files";
import { parseMd } from "./parseMd";

export const findAllMd = (
  folderPath: Path,
  onlyInCurrentFolder?: boolean
): Markdown[] => {
  //1. find all md file paths recursively in this folder, but don't look in node_modules

  const fileFolderPaths = findFilesRecursively({
    basePath: folderPath,
    match: (_, extension) => extension === "md",
    onlyInCurrentFolder,
  });

  const filePaths = fileFolderPaths.map((x) => x.path);
  const mdArray = filePaths.map(parseMd);
  return mdArray;
};
