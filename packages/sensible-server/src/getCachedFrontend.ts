import { FrontendFile, Path } from "sensible-core";

//just generate the frontendFile[] once every server restart because there can't be any changes without the server restarting.
let cachedFrontend: FrontendFile[] = [];

export const getCachedFrontend = (folderPath: Path): FrontendFile[] => {
  if (cachedFrontend.length > 0) {
    return cachedFrontend;
  }

  //should introspect frontend files. All ts and tsx files and their exports.
  const frontend = [];

  cachedFrontend = frontend;

  return frontend;
};
