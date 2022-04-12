import * as fs from "fs";
import * as path from "path";
import { Arguments } from "yargs";
import { IGNORE_DIRS, MATCH_FILE } from "./constants.js";
import * as oraAll from "ora";
const ora = oraAll.default;
import { Ora } from "ora";

import type {
  WatchmanDest,
  Watch,
  ProjectType,
  LinkingStrategy,
  LinkingCli,
  WatchPackageObject,
  PackageInfo,
  FileType,
  SubscriptionResponse,
  Command,
} from "./types.js";
import * as watchman from "fb-watchman";

import { exec, execSync } from "child_process";
//var colors = require("colors");
import colors from "colors";

let LATEST_EVENT_INFO: any;

const COMMANDS = [
  { key: "^c", info: "Quitoooo" },
  { key: "f", info: "Show files that have been found" },
  { key: "l", info: "List and copy the watchlist and linklist" },
  { key: "i", info: "Get information" },
  { key: "d", info: "Show details about latest copy/link event" },
];
let STARTUP_INFO: string[] = [];
let START_WATCH_TIME = 0;

export const hasDependency = (packageJson: PackageInfo, dependency: string) => {
  return getAllPackageJsonDependencies(packageJson).includes(dependency);
};

export const getProjectType = (packageJson: any): ProjectType => {
  const hasNext = hasDependency(packageJson, "next");
  const hasExpo = hasDependency(packageJson, "expo");
  const hasReactNative = hasDependency(packageJson, "react-native");
  const hasReact = hasDependency(packageJson, "react");
  const hasExpress = hasDependency(packageJson, "express");

  return hasNext
    ? "next"
    : hasExpo || hasReactNative
    ? "react-native"
    : hasReact
    ? "react"
    : hasExpress
    ? "express"
    : "unknown";
};
/**
 * searches for a match (file) in a base dir, but ignores folders in {ignore}
 */
export function searchRecursiveSync(
  dir: string,
  ignore: string[],
  match: string
): string[] {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  //@ts-ignore
  return files
    .filter((file) => !ignore.includes(file.name))
    .map((file) => {
      if (file.isDirectory()) {
        return searchRecursiveSync(path.join(dir, file.name), ignore, match);
      } else {
        return file.name === match ? path.join(dir, file.name) : null;
      }
    })
    .reduce((previous: string[], current) => {
      const newArray = Array.isArray(current)
        ? [...previous, ...current]
        : current !== null
        ? [...previous, current]
        : previous;
      return newArray;
    }, []);
}

export const findPackageDependencyPair =
  (dependencyPackagesNames: (string | undefined)[]) => (p: PackageInfo) => {
    return {
      package: p,
      dependencies: unique(getAllPackageJsonDependencies(p), String).filter(
        (dependency) => dependencyPackagesNames.includes(dependency)
      ),
    };
  };

export const getLinkingStrategy = (type?: ProjectType): LinkingStrategy => {
  const linkTypes: ProjectType[] = ["next"]; //react is used in a lot of packages as well that don't have a watcher but just watch node_modules

  return type && linkTypes.includes(type) ? "link" : "copy";
};

export const getRelevantWatchlistInfo = (object: WatchPackageObject): Watch => {
  return {
    src: {
      folderPath: getFolder(object.src.path),
      dependencyName: object.src.name!,
      packageInfo: object.src,
    },
    dests: object.dests.map((packageInfo) => ({
      folderPath: getFolder(packageInfo.path),
      linkingStrategy: getLinkingStrategy(packageInfo.type),
      packageInfo,
    })),
  };
};

export const getPackages = (args: (string | number)[]) => {
  //step 1: get the folder to run this command from
  const folder = chooseFolder(args);

  //step 2: recursively search all directories except for certain ignored directories for package.json files
  const files = searchRecursiveSync(folder, IGNORE_DIRS, MATCH_FILE);

  //step 3: now that we got all package.json's, fetch their data
  const packages = files.map(getRelevantPackageInfo).filter(notEmpty);

  return { files, packages };
};

export const getSrcDestsPairs = (argv: Arguments, status: Ora) => {
  const command = argv.$0;
  const args = argv._;
  const debug = args[1];

  //step 1-3
  const { files, packages } = getPackages(args);

  status.render();

  //step 4: get all dependencies of all packages
  const depList = packages.reduce(getDependenciesList, []);

  const pathy = path.join(process.cwd(), "deps.json");

  const allDependencies = unique(depList, String);
  console.log("woww deplist", allDependencies.length, pathy);

  fs.writeFileSync(pathy, JSON.stringify(allDependencies));

  //step 5: search for packages that are included in all dependencies and only keep their highest version
  const dependencyPackages = packages.filter(
    (p) => p.name && allDependencies.includes(p.name)
  );

  if (debug) {
    console.log({ files });
    //console.dir(allDependencies, { maxArrayLength: null });
    console.log(dependencyPackages.map((p) => p.name));
  }

  status.render();

  //step 6: find dependencies for all packages
  const dependencyPackagesNames = dependencyPackages.map((p) => p.name);
  const dependentPackages = packages
    .map(findPackageDependencyPair(dependencyPackagesNames))
    .filter((res) => res.dependencies.length > 0);

  status.render();

  //step 7: find srcDestPairs
  const srcDestPairs = dependentPackages
    .map((dp) => {
      const dest = dp.package;
      const watchlistPartly = dp.dependencies.map((dependency) => ({
        src: dependencyPackages.find((p) => p.name === dependency)!,
        //.reduce(keepHighestVersion, [])[0],
        dest,
      }));
      return watchlistPartly;
    })
    .reduce((previous, current) => {
      return [...previous, ...current];
    }, []);

  status.render();

  const uniqueSources = unique(
    srcDestPairs,
    (srcDestPair) => srcDestPair.src.path
  ).map((sd) => sd.src);

  status.render();

  //step 8: find all dests for one src, for all unique src's
  const srcDestsPairs: WatchPackageObject[] = uniqueSources.map((src) => {
    const dests = srcDestPairs
      .filter((srcDest) => srcDest.src.name === src.name)
      .map((srcDest) => srcDest.dest);

    return {
      src,
      dests,
    };
  });

  status.render();

  if (debug) {
    console.log("SRCDEST & SRCDESTS");
    console.dir(
      {
        srcDestPairs: srcDestPairs.map((sd) => ({
          src: sd.src.path,
          dest: sd.dest.path,
        })),

        srcDestsPairs: srcDestsPairs.map((sd) => ({
          src: sd.src.path,
          dests: sd.dests.map((d) => d.path),
        })),
      },
      { depth: 999 }
    );
  }

  return srcDestsPairs;
};

export function notEmpty<TValue>(
  value: TValue | null | undefined
): value is TValue {
  return value !== null && value !== undefined;
}

export const calculateWatchlist = (argv: Arguments): Watch[] => {
  const status = ora({
    text: "Searching...",
    discardStdin: false,
    hideCursor: false,
  })
    .start()
    .render();

  const srcDestsPairs = getSrcDestsPairs(argv, status);

  //step 9: we just need the folders
  const watchlist: Watch[] = srcDestsPairs
    .map(getRelevantWatchlistInfo)
    .filter((x) => x.dests.length !== 0);

  //TODO: add step 10-12 later, as it's probably not needed
  //step 10: safe last time papapackage was running and check the last time every dependency has had changes in non-ignored folders
  //step 11: remove current dest/node_modules/dependency folder
  //step 12: copy src folder to dest/node_modules/dependency

  const numDestinations = watchlist.reduce(
    (num, pair) => pair.dests.length + num,
    0
  );

  const successMessage = `Found ${srcDestsPairs.length} packages to be linked to ${numDestinations} destinations.`;
  status.succeed(successMessage);

  STARTUP_INFO.push(successMessage);

  return watchlist;
};

export const watchAndSubscribe = (
  client: watchman.Client,
  debug: boolean,
  status: Ora,
  watchlist: Watch[]
) => {
  return function (error: any, resp: any) {
    if (error) {
      // error will be an Error object if the watchman service is not
      // installed, or if any of the names listed in the `required`
      // array are not supported by the server
      console.error(error);
      client.end();
      return;
    }
    if (debug) {
      console.log(colors.green("Watchman is ok"), resp);
    }

    // Initiate the watch
    watchlist.forEach(watchWatch(client, status, debug));

    const numWatchDestinations = watchlist.reduce(
      (num, watch) =>
        watch.dests.filter((d) => d.linkingStrategy === "copy").length + num,
      0
    );

    const successMessage = `Watching ${watchlist.length} packages for ${numWatchDestinations} destinations`;
    status.succeed(successMessage);

    STARTUP_INFO.push(successMessage);

    createSubscriptionEventEmitter(client, watchlist, debug);
  };
};
export const showCommands = () => {
  console.log(colors.yellow("Commands"));
  console.log(COMMANDS.map((c) => `${c.key}: ${c.info}`).join("\n"));
};
export const showInfo = () => {
  console.log(colors.green("Status"));
  console.log(STARTUP_INFO.map((i) => `✅  ${i}`).join("\n"));
  showCommands();
};

export const linkWatchlist = (
  watchlist: Watch[],
  cli: LinkingCli,
  debug: boolean
): void => {
  const status = ora({
    text: "Linking...",
    discardStdin: false,
    hideCursor: false,
  }).start();

  const commands = watchlist.reduce((commands, watch) => {
    return [
      ...commands,
      {
        command: `rm -rf ~/.config/yarn/link/${watch.src.dependencyName} && cd ${watch.src.folderPath} && ${cli} link`,
        what: watch.src.dependencyName,
      },
      ...watch.dests
        .map((dest, index) =>
          dest.linkingStrategy === "link"
            ? {
                command: `cd ${dest.folderPath} && ${cli} link ${watch.src.dependencyName}`,
                what: `${watch.src.dependencyName} ${index}/${watch.dests.length}`,
              }
            : null
        )
        .filter(notEmpty),
    ];
  }, [] as Command[]);

  commands.forEach((command) => {
    try {
      const result = execSync(command.command, {
        stdio: debug ? "inherit" : "ignore",
      });

      if (debug) {
        console.log({
          command: command.command,
          result: result?.toString("utf-8"),
        });
      }
    } catch (e) {
      if (debug) {
        console.log(colors.red("error running command"), e);
      }
    }
    status.render().start(`Linking ${command.what}`);
  });

  const numLinkedDestinations = commands.length - watchlist.length;

  const successMessage = `Linked ${watchlist.length} packages into ${numLinkedDestinations} destinations`;
  status.succeed(successMessage);
  STARTUP_INFO.push(successMessage);
};

/**
 * exclude: remove certain keys from the copy of an object and return it
 */
export const exclude = (object: { [key: string]: any }, keys: string[]) => {
  const copy = { ...object };

  keys.forEach((key) => {
    delete copy[key];
  });

  return copy;
};

export const showLatestEventInfo = () => {
  console.log(LATEST_EVENT_INFO);
};

export const logWatchlist = (watchlist: Watch[]) => {
  console.log(colors.green("Watch list:"));

  watchlist.forEach((watch) => {
    console.log(
      colors.blue(
        `Source: ${watch.src.dependencyName} (${watch.src.folderPath})`
      )
    );
    console.table(
      watch.dests.map((dest, index) => ({
        [watch.src.dependencyName]: dest.folderPath,
        "Project Type": dest.packageInfo.type,
        Strategy: dest.linkingStrategy,
      }))
    );
  });
};

const onlyCopyIfCurrentVersionIsLower =
  (version: string | undefined) => (object: WatchmanDest) => {
    return object.currentVersion && version
      ? isHigherVersion(version, object.currentVersion)
      : true;
  };

export const getRelevantPackageInfo = (path: string): PackageInfo | null => {
  let fileBuffer;
  try {
    fileBuffer = fs.readFileSync(path);
  } catch (e) {
    //can't find file
  }
  //@ts-ignore // why doesn't JSON know it can parse a buffer? Touche
  const json = fileBuffer ? JSON.parse(fileBuffer) : null;

  return json
    ? {
        path,
        name: json.name,
        version: json.version,
        private: json.private,
        author: json.author,
        dependencies: json.dependencies,
        devDependencies: json.devDependencies,
        peerDependencies: json.peerDependencies,
        type: getProjectType(json),
      }
    : null;
};

/**
 * is higher or the same version
 */
export const isHigherVersion = (x: string, y: string) => {
  const xArray = x.split(".");
  const yArray = y.split(".");
  const longest = Math.max(xArray.length, yArray.length);

  for (let n = 0; n < longest; n++) {
    if (xArray[n] === yArray[n]) {
      continue;
    }
    return xArray[n] > yArray[n];
  }
  return true;
};

export const keepHighestVersion = (
  packages: PackageInfo[],
  current: PackageInfo
) => {
  const previous = packages.find((p) => p.name === current.name);

  return previous
    ? isHigherVersion(previous.version!, current.version!)
      ? packages //discard current because previous is higher
      : packages.filter((p) => p.name === previous.name).concat([current]) //discard previous and keep current because current is higher
    : packages.concat([current]); //there is no previous so just add the current
};

export const watchWatch =
  (client: watchman.Client, status: Ora, debug: boolean) => (watch: Watch) => {
    createWatchmanConfig(watch);

    client.command(
      ["watch-project", watch.src.folderPath],
      function (error, resp) {
        if (error) {
          console.error(colors.red("Error initiating watch:"), error);
          return;
        }

        // It is considered to be best practice to show any 'warning' or
        // 'error' information to the user, as it may suggest steps
        // for remediation
        if ("warning" in resp) {
          console.log(
            colors.yellow("Warning initiating watch: "),
            resp.warning
          );
        }

        // `watch-project` can consolidate the watch for your
        // dir_of_interest with another watch at a higher level in the
        // tree, so it is very important to record the `relative_path`
        // returned in resp

        if (debug) {
          console.log(
            colors.green("New watch:"),
            "watch established on ",
            resp.relative_path
              ? path.join(resp.watch, resp.relative_path)
              : resp.watch
          );
        }

        makeSubscription(client, resp.watch, resp.relative_path, debug);
      }
    );
  };

// `watch` is obtained from `resp.watch` in the `watch-project` response.
// `relative_path` is obtained from `resp.relative_path` in the
// `watch-project` response.
export function makeSubscription(
  client: watchman.Client,
  watchBaseFolder: string,
  watchRelativePath: string,
  debug: boolean
) {
  const sub = {
    // Match any `.js` file in the dir_of_interest
    expression: ["allof", ["match", "*.*"]],
    // Which fields we're interested in
    fields: ["name", "size", "mtime_ms", "exists", "type"],
    relative_root: undefined as undefined | string,
  };

  if (watchRelativePath) {
    sub.relative_root = watchRelativePath;
  }

  const subName = `papapackage:${watchBaseFolder}${
    watchRelativePath ? `:${watchRelativePath}` : ""
  }`;

  client.command(
    ["subscribe", watchBaseFolder, subName, sub],
    function (error, resp) {
      if (error) {
        // Probably an error in the subscription criteria
        console.error(
          colors.red("Error subscribing"),
          "Failed to subscribe: ",
          error
        );
        return;
      }
      if (debug) {
        console.log(
          colors.green("New subscribtion"),
          "subscription " + resp.subscribe + " established"
        );
      }
    }
  );

  return subName;

  // Subscription results are emitted via the subscription event.
  // Note that this emits for all subscriptions.  If you have
  // subscriptions with different `fields` you will need to check
  // the subscription name and handle the differing data accordingly.
  // `resp`  looks like this in practice:
  //
  // { root: '/private/tmp/foo',
  //   subscription: 'mysubscription',
  //   files: [ { name: 'node_modules/fb-watchman/index.js',
  //       size: 4768,
  //       exists: true,
  //       type: 'f' } ] }
}

export const createSubscriptionEventEmitter = (
  client: watchman.Client,
  watchlist: Watch[],
  debug: any
) => {
  START_WATCH_TIME = Date.now();

  client.on("subscription", function (resp: SubscriptionResponse) {
    //console.log("subscription...", resp);
    const [appName, rootPath, relativePath] = resp.subscription.split(":");

    if (!rootPath) {
      console.log("No rootpath found", resp.subscription);
      return;
    }

    const fullPath = relativePath
      ? path.join(rootPath, relativePath)
      : rootPath;

    const watch = watchlist.find((w) => w.src.folderPath === fullPath);

    if (watch) {
      const filteredDests = watch.dests.filter(
        (dest) => dest.linkingStrategy === "copy"
      );

      const linkedDests = watch.dests.filter(
        (dest) => dest.linkingStrategy === "link"
      );

      if (filteredDests.length === 0) {
        // no destinations that need a copy
        return;
      }

      if (rootPath !== resp.root) {
        console.log(colors.red("invalid rootpath"), rootPath, resp.root);
      }

      const filteredFiles = resp.files.filter(
        (f) => !f.name.includes("node_modules/")
      );

      if (filteredFiles.length === 0) {
        //no files that need to be copied
        return;
      }

      if (debug) {
        console.log(
          colors.green("Event"),
          `Copying ${filteredFiles.length} file(s) to ${filteredDests.length} destination(s)`,
          { fullPath },
          colors.yellow("names: "),
          filteredFiles.map((f) => f.name),
          colors.blue("destinations: "),
          filteredDests.map((d) =>
            path.join(d.folderPath, "node_modules", watch.src.dependencyName)
          )
        );
      }

      const message = `${filteredFiles.length} ${
        filteredFiles.length === 1 ? "file" : "files"
      } changed. Copying into ${filteredDests.length} ${
        filteredDests.length === 1 ? "destination" : "destinations"
      } and linking into ${linkedDests.length} ${
        linkedDests.length === 1 ? "destination" : "destinations"
      }`;

      if (START_WATCH_TIME + 10000 < Date.now()) {
        //more than 10 seconds ago since start
        console.log(colors.green("Change detected"), message);
      }

      LATEST_EVENT_INFO = {
        event: message,
        fullPath,
        files: filteredFiles.map((f) => f.name),
        copyDestinations: filteredDests.map((d) =>
          path.join(d.folderPath, "node_modules", watch.src.dependencyName)
        ),
        linkDestinations: linkedDests.map((d) =>
          path.join(d.folderPath, "node_modules", watch.src.dependencyName)
        ),
      };

      filteredFiles.forEach((file) => {
        // convert Int64 instance to javascript integer
        const mtime_ms = +file.mtime_ms;

        // console.log(
        //   "file changed: " + resp.root + "/" + file.name,
        //   mtime_ms,
        //   "should copy to",
        //   dests
        // );

        filteredDests.map((dest) => {
          const from = path.join(fullPath, file.name);
          const to = path.join(
            dest.folderPath,
            "node_modules",
            watch.src.dependencyName,
            file.name
          );

          // if (resp.relative_path) {
          //   console.log({
          //     relative: resp.relative_path,
          //     rootWithRelative,
          //     from,
          //     to,
          //   });
          // }

          const folders = to.split("/");
          folders.pop();
          const folder = folders.join("/");

          if (!fs.existsSync(folder)) {
            fs.mkdirSync(folder, {
              recursive: true,
            });
          }

          try {
            fs.copyFileSync(from, to, fs.constants.COPYFILE_FICLONE);
          } catch (error) {
            console.log(colors.red("copy file error"), {
              from,
              fromExists: fs.existsSync(from),
              to,
              toExists: fs.existsSync(to),
              error,
            });
          }
          //console.log({ from, to });
        });
      });
    } else {
      console.log("Couldnt find watch for ", resp.subscription);
    }
  });
};

export const createWatchmanConfig = (watch: Watch) => {
  const mustIgnore = ["node_modules", ".git"];
  const watchmanConfigPath = path.join(watch.src.folderPath, ".watchmanconfig");

  try {
    const buffer = fs.readFileSync(watchmanConfigPath);

    //@ts-ignore
    const json = JSON.parse(buffer);
  } catch (e) {
    // create file
    console.log(
      colors.green("Created config: "),
      "created watchmanconfig file to ignore node_modules and .git"
    );

    fs.writeFileSync(
      watchmanConfigPath,
      JSON.stringify({ ignore_dirs: mustIgnore })
    );
  }
};

export const chooseFolder = (args: (string | number)[]) => {
  let folder = process.cwd();
  if (args[0]) {
    if (
      !fs.existsSync(String(args[0])) ||
      !fs.lstatSync(String(args[0])).isDirectory()
    ) {
      console.warn("Directory not found:", String(args[0]));
      process.exit(0);
    } else {
      folder = String(args[0]);
    }
  }
  return folder;
};

export function unique<T>(a: T[], getId: (a: T) => string): T[] {
  var seen: { [key: string]: 1 } = {};
  var out = [];
  var len = a.length;
  var j = 0;

  for (var i = 0; i < len; i++) {
    var item = a[i];
    if (seen[getId(item)] !== 1) {
      seen[getId(item)] = 1;
      out[j++] = item;
    }
  }
  return out;
}

export const getAllPackageJsonDependencies = (p: PackageInfo): string[] => {
  const dependencies = p.dependencies ? Object.keys(p.dependencies) : [];
  const devDependencies = p.devDependencies
    ? Object.keys(p.devDependencies)
    : [];
  const peerDependencies = p.peerDependencies
    ? Object.keys(p.peerDependencies)
    : [];

  return [...dependencies, ...devDependencies, ...peerDependencies];
};

export const getDependenciesList = (
  concatDependencies: string[],
  p: PackageInfo
): string[] => {
  return [...concatDependencies, ...getAllPackageJsonDependencies(p)];
};

export const getFolder = (path: string) => {
  const folders = path.split("/");
  folders.pop();
  return folders.join("/");
};
