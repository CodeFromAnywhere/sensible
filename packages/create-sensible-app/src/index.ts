#!/usr/bin/env node
//this should run the whole script as a cli

import readline from "readline";
import path from "path";
import { spawn } from "child_process";
import fs from "fs";
import { homedir } from "os";

const DEBUG_COMMANDS = false;
const defaultAppName = "makes-sense";
//test environment should be optional and easy to set up, live should be the default, since we want people to immedeately ship
const initialCommitMessage = "🧠 This Makes Sense";

// currently, this results in a couple of invalid hook calls due to mismatching react* versions
const includedRepoSlugs: string[] = [
  "Code-From-Anywhere/react-with-native",
  "Code-From-Anywhere/sensible",
];

const settingsLocation = path.join(homedir(), ".sensible/settings.txt");
const settingsString = fs.existsSync(settingsLocation)
  ? fs.readFileSync(settingsLocation, "utf8")
  : "";
const settingsArray = settingsString.split(" ");
const findArgument = (flag: string) => (arg: string) =>
  arg.startsWith(`--${flag}`);

const getFlagValue = (flag: string | undefined) =>
  flag ? flag.split("=")[1] || true : false;

const getFlag = (flag: string): boolean | string => {
  const foundFlagSettings = settingsArray.find(findArgument(flag));
  const foundFlag = process.argv.find(findArgument(flag));

  const flagValue = getFlagValue(foundFlagSettings) || getFlagValue(foundFlag);
  return flagValue;
};

const isDebug = getFlag("debug");
const isInteractive = getFlag("interactive");
const isOffline = getFlag("offline");
const isNoCache = getFlag("no-cache");
const isNoThirdParty = getFlag("no-third-party");
const mainBranch = getFlag("branch");
const cacheDays = getFlag("cache-days");
const isNewDefaults = getFlag("new-defaults");

const cacheDaysNumber =
  typeof cacheDays === "string" && !isNaN(Number(cacheDays))
    ? Number(cacheDays)
    : 1;

const cacheUpdatedAtLocation = path.join(homedir(), ".sensible/updatedAt.txt");
const updatedAt = fs.existsSync(cacheUpdatedAtLocation)
  ? fs.readFileSync(cacheUpdatedAtLocation, "utf8")
  : "0";
const difference = Date.now() - Number(updatedAt);
const shouldGetCache =
  (difference < 86400 * 1000 * cacheDaysNumber || isOffline) && !isNoCache;

const mainBranchName =
  typeof mainBranch === "string" && mainBranch.length > 0 ? mainBranch : "live";

type Command = {
  command: string;
  description: string;
  isDisabled?: boolean;
};
type CommandsObject = {
  dir: string;
  commands: Command[];
};
function slugify(string: string) {
  var a =
    "àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìıİłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;";
  var b =
    "aaaaaaaaaacccddeeeeeeeegghiiiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------";
  var p = new RegExp(a.split("").join("|"), "g");
  return string
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(p, function (c) {
      return b.charAt(a.indexOf(c));
    }) // Replace special characters
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

const ask = (question: string): Promise<string> => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
  });

  return new Promise((resolve) => {
    rl.question(question, (input) => {
      resolve(input);
      rl.close();
    });
  });
};

const flagArgumentsString = process.argv
  .filter((a) => a.startsWith("--"))
  .join(" ");
const argumentsWithoutFlags = process.argv.filter((a) => !a.startsWith("--"));

const getArgumentOrAsk = async (
  argumentPosition: number,
  question: string
): Promise<string> => {
  let argument = argumentsWithoutFlags[argumentPosition + 1];
  if (argument && argument.length > 0) return argument;

  if (!isInteractive) {
    return "";
  }

  return ask(question);
};

const getName = async (): Promise<string> => {
  const name = await getArgumentOrAsk(
    1,
    `What should your sensible app be called? (default: ${defaultAppName})\n`
  );
  const appName = name.length > 0 ? slugify(name) : defaultAppName;

  //making sure we make a folder that doesn't exist yet:
  let n = 0;
  let fullAppName = appName;
  while (fs.existsSync(fullAppName)) {
    console.log(`Folder ${fullAppName} already exists...`);
    n++;
    fullAppName = `${appName}${n}`;
  }
  return fullAppName;
};

const getRemote = async (name: string): Promise<string | null> => {
  const remote = await getArgumentOrAsk(
    2,
    `Where should ${name} be hosted? Provide an URL or a GitHub slug (either "org/repo" or "username/repo")\n`
  );
  return remote.length > 0
    ? remote.includes("https://")
      ? remote
      : `https://github.com/${remote}.git`
    : null;
};

const getSpawnCommandsReducer =
  (dir: string, debug: boolean) =>
  async (previous: Promise<void>, command: Command) => {
    await previous;

    //tell the user what is happening, with a dot every second
    process.stdout.write(command.description);
    const interval = setInterval(() => process.stdout.write("."), 1000);

    return new Promise<void>((resolve) => {
      const messages: string[] = [];

      if (DEBUG_COMMANDS) {
        console.log(`${Date.toString()}: extecuted ${command} in ${dir}`);
      } else {
        spawn(command.command, {
          stdio: debug ? "inherit" : "ignore",
          shell: true,
          cwd: dir,
        })
          .on("exit", (code) => {
            const CODE_SUCCESSFUL = 0;
            if (code === CODE_SUCCESSFUL) {
              //once done, clear the console
              console.clear();
              clearInterval(interval);
              resolve();
            } else {
              clearInterval(interval);
              console.log(messages.join("\n"));
              throw `The following command failed: "${command}"`;
            }
          })
          //save all output so it can be printed on an error
          .on("message", (message) => {
            messages.push(message.toString());
          })
          .on("error", (err) => {
            console.log(messages.join("\n"));
            throw `The following command failed: "${command}": "${err}"`;
          });
      }
    });
  };

const askEnvironmentSetup = async () => {
  const envIsSetup =
    await ask(`Do you have the following environment setup and tools installed? Continuing with a different setup could cause bugs. 

- macos
- node 18, npm, yarn
- vscode with code cli
- jq
- git
- watchman

See https://github.com/Code-From-Anywhere/sensible/blob/main/docs/cli.md for more info.

Yes (y, yes, enter) or no?\n\n`);

  if (["y", "", "yes"].includes(envIsSetup)) {
    return true;
  } else {
    return false;
  }
};

const main = async () => {
  try {
    if (updatedAt === "0" && !(await askEnvironmentSetup()))
      throw `Please set up your environment first.`;

    const appName = await getName();
    const remote = await getRemote(appName);
    const sensibleAssetsDir = path.resolve(__dirname, "..", `assets`);
    const targetDir = process.cwd();

    const pushToGit = {
      dir: `${targetDir}/${appName}`,
      commands: [
        {
          command: `git init`,
          description: "Initialising a git repo",
        },

        {
          command: `git branch -M ${mainBranchName}`,
          description: `Move to '${mainBranchName}' branch`,
        },

        {
          command: `git add . && git commit -m "${initialCommitMessage}"`,
          description: "Creating commit",
          isDisabled: !remote,
        },

        {
          command: `git remote add origin ${remote}`,
          description: "Adding remote",
          isDisabled: !remote,
        },

        {
          command: `git push -u origin ${mainBranchName}`,
          description: "Push",
          isDisabled: !remote,
        },
      ],
    };

    const openVSCode = {
      command: `code ${targetDir}/${appName} --goto README.md:1:1`,
      description: "Opening your project in VSCode",
    };
    const preventInvalidHookCall = {
      command: "yarn add react@17.0.2 react-dom@17.0.2",
      description: "Install right react version to prevent invalid hook call",
    };
    const setNewDefaults: Command = {
      command: `echo ${flagArgumentsString} > ${settingsLocation}`,
      description: "Save new setttings",
      isDisabled: !isNewDefaults,
    };

    const commandsWithoutCache: CommandsObject[] = [
      {
        dir: targetDir,
        commands: [
          {
            command: `mkdir ${appName}`,
            description: "Making folder for your app",
          },
          {
            //NB: "*" doesn't match hidden files, so we use "." here
            command: `cp -R ${sensibleAssetsDir}/templates/init/. ${targetDir}/${appName}`,
            description: "Copying sensible template",
          },

          {
            //https://github.com/jherr/create-mf-app/pull/8

            command: `sleep 1 && cd ${appName} && find . -type f -name 'gitignore' -execdir mv {} .{} ';'`,
            // NB: not sure if sleep is needed.
            // NB: the below doesn't work because glob patterns sometines only work in interactive mode (see https://superuser.com/questions/715007/ls-with-glob-not-working-in-a-bash-script)
            //command: `sleep 2 && cd ${appName} && for f in **/gitignore; do mv "$f" "$(echo "$f" | sed s/gitignore/.gitignore/)"; done`,
            description: "Rename all gitignore files to .gitignore",
          },

          {
            command: `cd ${appName} && find . -type f -name 'package.template.json' -execdir mv {} package.json ';'`,
            description:
              "Rename all package.template.json files to package.json",
          },
        ],
      },

      {
        dir: `${targetDir}/${appName}/apps`,
        commands: [
          {
            command: "yarn create next-app --typescript web",
            description: "Creating next-app",
          },
          {
            command: "npx expo-cli init -t expo-template-blank-typescript app",
            description: "Creating expo-app",
          },
          {
            command: `cp -R ${sensibleAssetsDir}/templates/web/* ${targetDir}/${appName}/apps/web`,
            description: "Copying web template",
          },
          {
            command: `cp -R ${sensibleAssetsDir}/templates/app/* ${targetDir}/${appName}/apps/app`,
            description: "Copying app template",
          },
        ],
      },

      {
        dir: `${targetDir}/${appName}/apps/server`,
        commands: [
          {
            command:
              "yarn add cors dotenv md5 reflect-metadata sequelize sequelize-typescript server sqlite3 typescript",
            description: "Installing server dependencies",
          },
          {
            command:
              "yarn add -D @types/node @types/server @types/validator babel-cli eslint ts-node ts-node-dev",
            description: "Installing server devDependencies",
          },
        ],
      },

      {
        dir: `${targetDir}/${appName}/apps/web`,
        commands: [
          {
            command: "rm -rf .git",
            description: "Removing web git folder",
          },
          preventInvalidHookCall,
          {
            command:
              "yarn add core@* ui@* react-query react-with-native react-with-native-form react-with-native-password-input react-with-native-store react-with-native-text-input react-with-native-router next-transpile-modules @badrap/bar-of-progress",
            description: "Installing web dependencies",
          },
          {
            command: "yarn add -D config@* tsconfig@*",
            description: "Installing web devDependencies",
          },
          {
            command: "mv styles src/styles",
            description: "Moving some stuff around",
          },
          {
            command: "mv pages src/pages",
            description: "Moving some stuff around",
          },
          { command: "touch src/types.ts", description: "Creating files" },
          { command: "touch src/constants.ts", description: "Creating files" },
          {
            command: "npx setup-tailwind-rn",
            description: "Installing tailwind",
          },
        ],
      },

      {
        dir: `${targetDir}/${appName}/apps/app`,
        commands: [
          {
            command: "rm -rf .git",
            description: "Removing git folder",
          },
          preventInvalidHookCall,

          {
            // NB: without renaming it doesn't work
            command:
              "mv package.json package-old.json && jq '.main |= \"index.ts\"' package-old.json > package.json && rm package-old.json",
            description: "changing main entry of package.json",
          },

          {
            command:
              "npx expo-cli install core@* ui@* sensible-core@* tailwind-rn react-query react-with-native react-with-native-form react-with-native-store @react-native-async-storage/async-storage react-with-native-text-input react-with-native-router @react-navigation/native @react-navigation/native-stack",
            description: "Installing app dependencies",
          },

          {
            command:
              "yarn add -D @expo/webpack-config babel-plugin-module-resolver concurrently postcss tailwindcss",
            description: "Installing app devDependencies",
          },
        ],
      },

      {
        // download all third-party dependencies that are tightly integrated and probably still require some bugfixing in v1
        dir: `${targetDir}/${appName}/third-party`,
        commands: isNoThirdParty
          ? []
          : includedRepoSlugs.map((slug) => ({
              command: `git clone https://github.com/${slug}.git`,
              description: `Adding third-party repo: ${slug}`,
            })),
      },

      {
        dir: `${targetDir}/${appName}`,
        commands: [openVSCode],
      },

      pushToGit,

      {
        dir: homedir(),
        commands: [
          {
            command: "rm -rf .sensible/cache && mkdir .sensible/cache",
            description: "Creating sensible cache folder",
          },
          {
            command: `cp -R ${targetDir}/${appName}/. .sensible/cache`,
            description: "creating cache",
          },
          {
            command: `echo $(node -e 'console.log(Date.now())') > .sensible/updatedAt.txt`,
            description: "Add current timestamp to cached files",
          },

          setNewDefaults,
        ],
      },
    ];

    const cacheCommands: CommandsObject[] = [
      {
        dir: targetDir,
        commands: [
          {
            command: `mkdir ${appName}`,
            description: "Creating your app folder",
          },
          {
            command: `cp -R $HOME/.sensible/cache/. ${targetDir}/${appName}`,
            description: "Copying sensible from cache",
          },
          openVSCode,
          setNewDefaults,
        ],
      },

      pushToGit,
    ];

    const commandsFromFolders = shouldGetCache
      ? cacheCommands
      : commandsWithoutCache;

    await commandsFromFolders.reduce(
      async (previous: Promise<void>, commandsObject: CommandsObject) => {
        await previous;
        return commandsObject.commands.reduce(
          getSpawnCommandsReducer(commandsObject.dir, !!isDebug),
          Promise.resolve()
        );
      },
      Promise.resolve()
    );
  } catch (e) {
    console.warn(e);
  }
};
main();
