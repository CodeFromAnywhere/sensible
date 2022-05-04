import {
  findFilesRecursively,
  FolderPath,
  mergeObjectsArray,
  Path,
  withoutExtension,
} from "sensible-core";

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
