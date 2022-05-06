import { FrontendFile, FrontendFileObject, Path } from "sensible-core";

//just generate the frontendFile[] once every server restart because there can't be any changes without the server restarting.
let cachedFrontend: FrontendFileObject = {};

export const getCachedFrontend = (folderPath: Path): FrontendFileObject => {
  if (Object.keys(cachedFrontend).length > 0) {
    return cachedFrontend;
  }

  //should introspect frontend files. All ts and tsx files and their exports.
  const frontend: FrontendFileObject = {};

  cachedFrontend = frontend;

  return frontend;
};
