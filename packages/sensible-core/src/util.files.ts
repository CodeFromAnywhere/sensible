import path from "path";
import fs from "fs";
import { FolderPath, Path } from "./types";

export const withoutExtension = (fileName: string) => {
  const pieces = fileName.split(".");
  pieces.pop();
  return pieces.join(".");
};

export const getExtension = (fileName: string) => {
  const pieces = fileName.split(".");
  return pieces.pop()!;
};

export const findFilesRecursively = ({
  match,
  basePath,
  relativePath,
  onlyInSubFolders,
  onlyInCurrentFolder,
}: {
  match: (fileName: string, extension: string) => boolean;
  basePath: Path;
  relativePath?: string;
  /**
   * only find files in folders of this location, not in this location itself
   */
  onlyInSubFolders?: boolean;
  onlyInCurrentFolder?: boolean;
}): FolderPath[] => {
  const location = relativePath ? path.join(basePath, relativePath) : basePath;

  const contents = fs.readdirSync(location, { withFileTypes: true });

  return contents.reduce((all, fileOrFolder) => {
    if (fileOrFolder.isDirectory() && !onlyInCurrentFolder) {
      const folder = fileOrFolder;
      const thisFolder = findFilesRecursively({
        basePath,
        relativePath: relativePath
          ? `${relativePath}/${folder.name}`
          : folder.name,
        match,
        onlyInSubFolders: false,
      });
      const allWithThisFolder = all.concat(thisFolder);
      return allWithThisFolder;
    } else if (!onlyInSubFolders) {
      const file = fileOrFolder;
      const filePath: Path = path.join(location, file.name);
      const allWithMatchedFile = match(
        withoutExtension(file.name),
        getExtension(file.name)
      )
        ? all.concat([{ relativeFolder: relativePath, path: filePath }])
        : all;
      return allWithMatchedFile;
    }
    return all;
  }, [] as FolderPath[]);
};
