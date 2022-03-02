import { PackageInfo } from "sensible-core";
import fs from "fs";
import { getProjectType } from "./getProjectType";

export const getRelevantPackageInfo = (path: string): PackageInfo | null => {
  let fileBuffer;
  try {
    fileBuffer = fs.readFileSync(path);
  } catch (e) {
    //can't find file
    console.warn("couldn't find file");
  }

  //@ts-ignore // why doesn't JSON know it can parse a buffer? Touche
  const json = fileBuffer ? JSON.parse(fileBuffer) : null;

  return json
    ? {
        path,
        description: json.description,
        name: json.name,
        version: json.version,
        private: json.private,
        author: json.author,
        repository: json.repository,
        homepage: json.homepage,
        dependencies: json.dependencies,
        devDependencies: json.devDependencies,
        peerDependencies: json.peerDependencies,
        type: getProjectType(json),
      }
    : null;
};
