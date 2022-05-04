import fs from "fs";
import path from "path";
import { findFilesRecursively } from "sensible-core";
/*
As long as there are no .template files present in the template folder that DONT need to be changed, it is fine.
If there are, we should warn people.
*/

const templateExtension = ".template";

/**
 * finds all .template renamed files recursively and returns the paths in an array
 */
export const findTemplateFiles = (templateFolder?: string): string[] => {
  return findFilesRecursively({
    basePath: path.join(__dirname, "..", "templates", templateFolder || ""),
    match: (fileName, extension) =>
      fileName.includes(".template") || extension.includes(".template"),
  }).map((x) => x.path);
};

export const renameToTemplateFile = (fileName: string) => {
  const extensionStartsAt = fileName.lastIndexOf(".");
  const insertPosition =
    extensionStartsAt === -1 ? fileName.length : extensionStartsAt;
  const beforeExtension = fileName.substring(0, insertPosition);
  const afterExtension = fileName.substring(insertPosition);

  return `${beforeExtension}${templateExtension}${afterExtension}`;
};

export const renameTemplateToNormalFile = (fileName: string) => {
  return fileName.replace(".template", "");
};

const test = (): boolean => {
  const fileNames = [".gitignore", "package.json", "Podfile"];
  const changedFileNames = fileNames
    .map(renameToTemplateFile)
    .map(renameTemplateToNormalFile);

  return (
    fileNames.length === changedFileNames.length &&
    fileNames.every((value, index) => value === changedFileNames[index])
  );
};

//console.log(test());

export const findAndRenameTemplateFiles = (resolve: () => void) => {
  findTemplateFiles()
    .map((path) => ({
      oldPath: path,
      newPath: renameTemplateToNormalFile(path),
    }))
    .map(({ oldPath, newPath }) => {
      console.log({ oldPath, newPath });
      fs.renameSync(oldPath, newPath);
    });
  // not sure, maybe I need to make sure that it's renamed before resolving.... it's not waiting now. It could crash and still resolve!
  resolve();
};
