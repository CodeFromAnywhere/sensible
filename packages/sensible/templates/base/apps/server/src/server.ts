/**
 * This file was auto-generated using the Sensible Boilerplate Creator (npx create-sensible-app).
 * You can edit it in what ever way you see fit.
 */
import { PublicConstants } from "core";
import fs from "fs";
import path, { resolve } from "path";
import { Path, findFiles, importFromFiles } from "sensible-files";
import { makeSensibleEndpoints } from "sensible-server";
import { Middleware } from "server/typings/common";
import { interpretableTypes } from "./typeFiles";

export const getServerEndpoints = (): Middleware[] => {
  const imports = importFromFiles({
    files: findFiles("api", __dirname).map((x) => x.path),
    guard: (moduleExports) => {
      return typeof moduleExports === "object" && Array.isArray(moduleExports);
    },
  });

  return imports.flat();
};

export const getAppPaths = (basePath: Path): Path[] => {
  const contents = fs.readdirSync(basePath, { withFileTypes: true });

  const appPaths = contents
    .filter((x) => x.isDirectory())
    .filter((x) => !x.name.startsWith("."))
    .map((x) => x.name)
    .map((name) => path.join(basePath, name));

  return appPaths;
};
export const getAllEndpoints = (): Middleware[] => {
  const appsPath = resolve("..");
  const packagesPath = resolve("../../packages");

  const appPaths = getAppPaths(appsPath).concat(getAppPaths(packagesPath));
  const sensibleEndpoints = makeSensibleEndpoints(
    appsPath,
    appPaths,
    interpretableTypes,
    PublicConstants
  );
  return getServerEndpoints().concat(sensibleEndpoints);
};
