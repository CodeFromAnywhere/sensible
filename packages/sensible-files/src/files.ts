import path from "path";
import fs from "fs";
import { Path, FolderPath } from "./types";

export const mergeObjectsArray = (
  objectsArray: object[]
): { [key: string]: any } =>
  objectsArray.reduce((previous, current) => {
    return { ...previous, ...current };
  }, {});

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

export const isArrayGuard = (moduleExports: any) =>
  typeof moduleExports === "object" && Array.isArray(moduleExports);
/**
 * @param slug what should the suffix or the name of thie file be (plural also possible)
 * @returns file path array
 */
export const findFiles = (slug: string, basePath: string): FolderPath[] => {
  return findFilesRecursively({
    basePath,
    match: (fileName) =>
      fileName === slug ||
      fileName === slug + "s" ||
      fileName.endsWith(`.${slug}`) ||
      fileName.endsWith(`.${slug}s`),
  });
};

export const importFromFiles = ({
  files,
  importStrategy = "default",
  list,
  guard,
}: {
  files: Path[];
  importStrategy?: "default" | "fileName" | "list";
  list?: string[];
  guard?: (moduleExports: any) => boolean;
}) => {
  return files
    .map((filePath) => {
      const moduleExports = require(filePath);
      if (importStrategy === "default") {
        return moduleExports.default || moduleExports;
      } else if (importStrategy === "fileName") {
        const fileName = withoutExtension(filePath.split("/").pop()!);
        return moduleExports[fileName];
      } else if (importStrategy === "list") {
        return list
          ? mergeObjectsArray(
              list.map((item) => {
                return { item: moduleExports[item] };
              })
            )
          : {};
      }
    })
    .filter((moduleExport) =>
      guard ? guard(moduleExport) && moduleExport : moduleExport
    );
};
