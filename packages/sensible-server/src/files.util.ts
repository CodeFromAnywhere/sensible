import path from "path";
import fs from "fs";
import { mergeObjectsArray } from "sensible-core";

/**
 * @param slug what should the suffix or the name of thie file be (plural also possible)
 * @returns file path array
 */
export const findFiles = (slug: string, location: string) => {
  return findFilesRecursively({
    location,
    match: (fileName) =>
      fileName === slug ||
      fileName === slug + "s" ||
      fileName.endsWith(`.${slug}`) ||
      fileName.endsWith(`.${slug}s`),
  });
};

export const findFilesRecursively = ({
  match,
  location,
  onlyInSubFolders,
}: {
  match: (fileName: string) => boolean;
  location: Path;
  /**
   * only find files in folders of this location, not in this location itself
   */
  onlyInSubFolders?: boolean;
}): Path[] => {
  const contents = fs.readdirSync(location, { withFileTypes: true });

  return contents.reduce((all, fileOrFolder) => {
    if (fileOrFolder.isDirectory()) {
      const folder = fileOrFolder;
      const thisFolderLocation = path.join(location, folder.name);
      const thisFolder = findFilesRecursively({
        location: thisFolderLocation,
        match,
        onlyInSubFolders: false,
      });
      const allWithThisFolder = all.concat(thisFolder);
      return allWithThisFolder;
    } else if (!onlyInSubFolders) {
      const file = fileOrFolder;
      const filePath: Path = path.join(location, file.name);
      const allWithMatchedFile = match(withoutExtension(file.name))
        ? all.concat([filePath])
        : all;
      return allWithMatchedFile;
    }
    return all;
  }, [] as Path[]);
};

export type Path = string;

export const withoutExtension = (fileName: string) => {
  const pieces = fileName.split(".");
  pieces.pop();
  return pieces.join(".");
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
