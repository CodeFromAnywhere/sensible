#!/usr/bin/env node
//this should run the whole script as a cli

import path from "path";
import fs from "fs";
import { homedir } from "os";
import { findAndRenameTemplateFiles } from "./util.templates";
import { log } from "./util.log";
import { getPlatformId, platformIds } from "./util.platform";
import commandExists from "command-exists";
import { Command, executeCommand, getCommand } from "./util.commands";
import { ask, askOk, getArgumentOrAsk } from "./util.userinput";
import { handleVersionUpdates } from "./util.versions";
import { isCommandPerOs } from "./util.commands";

//InstallHelper
const installHelper = {
  [platformIds.macOS]: "brew",
  [platformIds.windows]: "choco",
  [platformIds.linux]: "brew",
};

const openUrlHelper = {
  [platformIds.macOS]: "open",
  [platformIds.windows]: "start",
  [platformIds.linux]: "open",
};

const copyCommandHelper = {
  [platformIds.macOS]: (source: string, dest: string) => {
    return `cp -R ${source} ${dest}`;
  },
  [platformIds.windows]: (
    source: string,
    dest: string,
    flags: string = "/MIR"
  ) => {
    return `robocopy "${source}" "${dest}" ${flags}`;
  },
  [platformIds.linux]: (source: string, dest: string) => {
    return `cp -R ${source} ${dest}`;
  },
};

const removeDirCommandHelper = {
  [platformIds.macOS]: (filePath: string) => {
    return `rm -rf ${filePath}`;
  },
  [platformIds.windows]: (filePath: string) => {
    return `rmdir ${filePath} /s /q`;
  },
  [platformIds.linux]: (filePath: string) => {
    return `rm -rf ${filePath}`;
  },
};

const makeDirCommandHelper = {
  [platformIds.macOS]: (filePath: string) => {
    return `mkdir -p ${filePath}`;
  },
  [platformIds.windows]: (filePath: string) => {
    return `mkdir "${filePath}"`;
  },
  [platformIds.linux]: (filePath: string) => {
    return `mkdir -p ${filePath}`;
  },
};

const removeDirAndRecreateEmptyHelper = {
  [platformIds.macOS]: (filePath: string) => {
    return `rm -rf ${filePath} && mkdir -p ${filePath}`;
  },
  [platformIds.windows]: (filePath: string) => {
    return `if exist "${filePath}" (rmdir "${filePath}" /s /q && mkdir "${filePath}") else (mkdir "${filePath}")`;
  },
  [platformIds.linux]: (filePath: string) => {
    return `rm -rf ${filePath} && mkdir -p ${filePath}`;
  },
};

//TYPE INTERFACES
type AppType = {
  slug: string;
  description: string;
  default?: boolean;
};

type CommandsObject = {
  dir: string;
  commands: Command[];
};

const os = process.platform;
const currentPlatformId = getPlatformId(os);

type TaskObject = {};

type InstallObject = {
  commands: Command[];
  tasks: TaskObject[];
};

//CONSTANTS

const defaultAppName = "makes-sense";
//test environment should be optional and easy to set up, live should be the default, since we want people to immedeately ship
const initialCommitMessage = "🧠 This Makes Sense";

// currently, this results in a couple of invalid hook calls due to mismatching react* versions
const includedRepoSlugs: string[] = [
  // "Code-From-Anywhere/react-with-native",
  // "Code-From-Anywhere/sensible",
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
const isNonInteractive = getFlag("non-interactive");
const isOffline = getFlag("offline");
const isNoCache = getFlag("no-cache") || true; //doesn't work for some reason
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
const sensibleDir = path.resolve(__dirname, "..");
const targetDir = process.cwd();

//UTILITY FUNCTIONS

const getInstallAppCommands =
  ({ appName, isExistingApp }: { appName?: string; isExistingApp?: boolean }) =>
  (app: string): CommandsObject => {
    const appsDir = isExistingApp
      ? path.join(targetDir, "apps")
      : path.join(targetDir, appName!, "apps");

    const destinationPath = path.join(appsDir, app);

    const installFilePath = path.join(
      sensibleDir,
      `templates/apps/${app}.install.json`
    );

    const templateLocationPath = `${sensibleDir}/templates/apps/${app}/.`;

    const fileString = fs.existsSync(installFilePath)
      ? fs.readFileSync(installFilePath, { encoding: "utf8" })
      : "";

    const appsCommands: InstallObject =
      fileString && fileString.length > 0
        ? JSON.parse(fileString)
        : { commands: [], tasks: [] };

    const commandsPerOSreplaced = appsCommands.commands.map(
      (command: Command) => {
        //command.command: CommandPerOS | string
        if (command.command) {
          const isCommandObject = isCommandPerOs(command.command);
          if (isCommandObject) {
            command.command = getCommand(command) || "";
          }
        }
        return command;
      }
    );
    //const filledInAppCommands = commandsPerOSreplaced;
    const filledInAppCommands = commandsPerOSreplaced.map(
      commandReplaceVariables({})
    );

    //lets assume you are running "add" in the root folder of your project
    const defaultAppsCommands: Command[] = [
      {
        command: copyCommandHelper[currentPlatformId](
          templateLocationPath,
          destinationPath,
          "/E"
        ),
        description: `Copying ${app} template`,
        // NB: this implies there must be at least one command to copy the template, isn't always the case!
        isDisabled: appsCommands.commands.length === 0,
      },
    ];

    return {
      dir: appsDir,
      commands: filledInAppCommands.concat(defaultAppsCommands),
    };
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

const possibleApps: AppType[] = [
  {
    slug: "app",
    description: "Expo app (for android, iOS, web)",
    default: true,
  },
  { slug: "web", description: "Next.js app", default: true },
  { slug: "docs", description: "Docusaurus documentation", default: true },
  { slug: "webreact", description: "Bare React.js app (Experimental)" },
  { slug: "chrome", description: "Chrome extension (Experimental)" },
  { slug: "vscode", description: "VSCode extension (Experimental)" },
  {
    slug: "computer",
    description: "Electron app (for Windows, Linux and MacOS) (Experimental)",
  },
];

const flagArgumentsString = process.argv
  .filter((a) => a.startsWith("--"))
  .join(",");
//.join(" ");
const argumentsWithoutFlags = process.argv.filter((a) => !a.startsWith("--"));

const appsHumanReadable = possibleApps
  .map((possible) => `- ${possible.slug}: ${possible.description}\n`)
  .join("");

const getApps = async (): Promise<string[]> => {
  const appsString = await ask(
    `Which apps do you want to create boilerplates for? Just press enter for all non-experimental ones 
    
${appsHumanReadable}\n`
  );

  const apps =
    appsString === ""
      ? possibleApps.filter((x) => x.default).map((x) => x.slug)
      : appsString
          .replaceAll(" ", ",")
          .replaceAll(";", ",")
          .split(",")
          .filter(
            (canditateApp) =>
              possibleApps.map((app) => app.slug).includes(canditateApp) ===
              true
          );

  return apps;
};

const getName = async (): Promise<string> => {
  const name = await getArgumentOrAsk(
    2,
    `What should your sensible app be called? (default: ${defaultAppName})\n`,
    !!isNonInteractive
  );
  const appName = name.length > 0 ? slugify(name) : defaultAppName;

  //making sure we make a folder that doesn't exist yet:
  let n = 0;
  let fullAppName = appName;
  while (fs.existsSync(fullAppName)) {
    n++;
    fullAppName = `${appName}${n}`;
  }
  if (fullAppName !== appName) {
    log(`Using name ${fullAppName} because ${appName} folder already exists.`);
  }
  return fullAppName;
};

const getRemote = async (name: string): Promise<string | null> => {
  const remote = await getArgumentOrAsk(
    3,
    `Where should ${name} be hosted? Provide an URL or a GitHub slug (either "org/repo" or "username/repo")\n`,
    !!isNonInteractive
  );
  return remote.length > 0
    ? remote.includes("https://")
      ? remote
      : `https://github.com/${remote}.git`
    : null;
};

const askOpenDocs = async (): Promise<void> => {
  const openDocs = await askOk(
    `That's all we need to know! Do you want to open the docs while waiting?\n`
  );

  if (openDocs) {
    executeCommand(
      {
        description: "Opening docs",
        command: `${openUrlHelper[currentPlatformId]} https://sensiblestack.com`,
      },
      __dirname,
      false
    );
  }
};

const getSpawnCommandsReducer =
  (dir: string, debug: boolean) =>
  async (previous: Promise<void>, command: Command) => {
    await previous;
    return executeCommand(command, dir, debug);
  };

const commandExistsOrInstall = async ({
  command,
  installCommand,
  installInstructions,
  exitIfNotInstalled,
}: {
  command: string;
  installCommand?: Command;
  installInstructions: string;
  exitIfNotInstalled?: boolean;
}) => {
  let isAvailable = false;
  try {
    isAvailable = !!(await commandExists(command));
  } catch (err) {
    log("Command not found");
  }

  const installCommandString = installCommand && getCommand(installCommand);
  if (isAvailable) return true;

  if (installCommand) {
    const ok = await askOk(
      `You don't have ${command}, but we need it to set up your project. Shall we install it for you, using "${installCommandString}"? \n\n yes/no \n\n`
    );

    if (ok) {
      await executeCommand(installCommand, __dirname, !!isDebug);
      return true;
    }
  }

  log(installInstructions);

  if (exitIfNotInstalled) {
    process.exit(1);
  }
  return false;
};

/**
 * replace all variables in a command string with the actual value
 */
const commandReplaceVariables =
  (variables: { [key: string]: string }) =>
  (command: Command): Command => {
    if (command) {
      const newCommand =
        Object.keys(variables).reduce((command, variableKey) => {
          return command
            ? command?.replaceAll(`{${variableKey}}`, variables[variableKey])
            : "";
        }, getCommand(command)) || "";

      command.command = newCommand;
    }
    return command;
  };

const getPushToGitCommands = (appName: string, remote: string | null) => {
  return {
    dir: `${targetDir}/${appName}`,
    commands: [
      {
        //command: "rm -rf .git",
        command: removeDirCommandHelper[currentPlatformId](".git"),
        description: "Remove previous git",
      },

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
};
const installRequiredStuff = async () => {
  //making sure you have brew, node, npm, yarn, code, git, watchman
  await commandExistsOrInstall({
    command: installHelper[currentPlatformId],
    installInstructions: `Please install ${installHelper[currentPlatformId]}. Go to "https://brew.sh" for instructions`,
    installCommand: {
      command:
        '/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"',
      description: `Installing ${installHelper[currentPlatformId]}`,
    },
    exitIfNotInstalled: true,
  });
  await commandExistsOrInstall({
    command: "node",
    installInstructions: `Please run "${installHelper[currentPlatformId]} install node" or go to https://formulae.brew.sh/formula/node for instructions`,
    installCommand: {
      command: `${installHelper[currentPlatformId]} install node`,
      description: `Installing node using ${installHelper[currentPlatformId]}`,
    },
    exitIfNotInstalled: true,
  });

  await commandExistsOrInstall({
    command: "npm",
    installInstructions:
      "Please install node and npm, see https://docs.npmjs.com/downloading-and-installing-node-js-and-npm",
    installCommand: {
      command: `${installHelper[currentPlatformId]} install node`,
      description: `Installing node using ${installHelper[currentPlatformId]}`,
    },
    exitIfNotInstalled: true,
  });

  await commandExistsOrInstall({
    command: "yarn",
    installInstructions:
      "Please install yarn, see https://classic.yarnpkg.com/lang/en/docs/install",
    installCommand: {
      command: "npm install --global yarn",
      description: "Installing yarn",
    },
    exitIfNotInstalled: true,
  });

  await commandExistsOrInstall({
    command: "code",
    exitIfNotInstalled: true,
    installInstructions:
      'Please install VSCode and the code cli command. see https://code.visualstudio.com/docs/editor/command-line \n\n TL;DR: Linux and Windows, the code command comes with a VSCode installation, but on MacOS you need to activate it from within VSCode using "Cmd + Shift + P" and selecting "Install \'code\' command in PATH".',
  });

  await commandExistsOrInstall({
    command: "git",
    exitIfNotInstalled: true,
    installInstructions:
      "Please install git, see https://git-scm.com/book/en/v2/Getting-Started-Installing-Git for instructions.",
  });

  await commandExistsOrInstall({
    command: "watchman",
    exitIfNotInstalled: true,
    installCommand: {
      command: `${installHelper[currentPlatformId]} install watchman`,
      description: `Installing watchman using ${installHelper[currentPlatformId]}`,
    },
    installInstructions:
      "Please install watchman, see https://facebook.github.io/watchman/docs/install.html for instructions.",
  });
};

const getOpenVSCodeCommand = (appName: string) => ({
  command: `code "${targetDir}/${appName}" --goto README.md:1:1`,
  description: "Opening your project in VSCode",
});

const openDocsCommand = {
  command: `open https://docs.sensibleframework.co/localhost:4000`,
  description: "Opening the docs for your project",
};

const setNewDefaults: Command = {
  command: `echo ${flagArgumentsString} > ${settingsLocation}`,
  description: "Save new setttings",
  isDisabled: !isNewDefaults,
};

const getCommandsWithoutCache = ({
  appName,
  selectedApps,
  remote,
}: {
  appName: string;
  selectedApps: string[];
  remote: string | null;
}) => {
  return [
    {
      dir: targetDir,
      commands: [
        {
          //command: `mkdir ${appName}`,
          command: makeDirCommandHelper[currentPlatformId](appName),
          description: "Making folder for your app",
        },
        {
          //NB: "*" doesn't match hidden files, so we use "." here
          //`cp -R ${sensibleDir}/templates/base/. ${targetDir}/${appName}`,
          command: copyCommandHelper[currentPlatformId](
            `${sensibleDir}/templates/base/.`,
            `${targetDir}/${appName}`
          ),
          description: "Copying sensible base",
        },

        {
          nodeFunction: findAndRenameTemplateFiles(`${targetDir}/${appName}`),
          description: "Rename template files to normal files",
        },
      ],
    },

    {
      dir: `${targetDir}/${appName}/apps/server`,
      commands: [
        {
          command:
            "yarn add cors dotenv md5 reflect-metadata sequelize sequelize-typescript server sqlite3 typescript@4.5.5",
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
      // download all third-party dependencies that are tightly integrated and probably still require some bugfixing in v1
      dir: `${targetDir}/${appName}/third-party`,
      commands: isNoThirdParty
        ? []
        : includedRepoSlugs.map((slug) => ({
            command: `git clone https://github.com/${slug}.git`,
            description: `Adding third-party repo: ${slug}`,
          })),
    },

    // only install selected apps
    ...selectedApps.map(getInstallAppCommands({ appName })),

    {
      dir: `${targetDir}/${appName}`,
      commands: [getOpenVSCodeCommand(appName)],
    },

    getPushToGitCommands(appName, remote),

    {
      dir: homedir(),
      commands: [
        {
          // NB: -p stands for parents and makes directories recursively
          //command: "rm -rf .sensible/cache && mkdir -p .sensible/cache",
          command:
            removeDirAndRecreateEmptyHelper[currentPlatformId](
              ".sensible/cache"
            ),
          description: "Creating sensible cache folder",
        },

        {
          //command: `cp -R ${targetDir}/${appName}/. .sensible/cache`,
          command: copyCommandHelper[currentPlatformId](
            `${targetDir}/${appName}/.`,
            `.sensible/cache`
          ),
          description: "Creating cache",
        },

        {
          command: `echo $(node -e 'log(Date.now())') > .sensible/updatedAt.txt`,
          description: "Add current timestamp to cached files",
        },

        setNewDefaults,
      ],
    },
  ];
};

const getCacheCommands = ({
  appName,
  remote,
}: {
  appName: string;
  remote: string | null;
}) => {
  return [
    {
      dir: targetDir,
      commands: [
        {
          command: `mkdir ${appName}`,
          description: "Creating your app folder",
        },
        {
          //command: `cp -R $HOME/.sensible/cache/. ${targetDir}/${appName}`,
          command: copyCommandHelper[currentPlatformId](
            `$HOME/.sensible/cache/.`,
            `${targetDir}/${appName}`
          ),
          description: "Copying sensible from cache",
        },
        getOpenVSCodeCommand(appName),
        openDocsCommand,
        setNewDefaults,
      ],
    },

    getPushToGitCommands(appName, remote),
  ];
};

const executeCommandsObjectOneByOne = (commandsObject: CommandsObject) => {
  return commandsObject.commands.reduce(
    getSpawnCommandsReducer(commandsObject.dir, !!isDebug),
    Promise.resolve()
  );
};
const main = async () => {
  //problem with imports package.json ect. do some research to solve this.
  await handleVersionUpdates("sensible", targetDir);
  await installRequiredStuff();
  const command = argumentsWithoutFlags[2];

  if (command === "init") {
    const appName = await getName();
    const remote = await getRemote(appName);
    const selectedApps = await getApps();

    await askOpenDocs();

    const commandsFromFolders = shouldGetCache
      ? getCacheCommands({ appName, remote })
      : getCommandsWithoutCache({ appName, remote, selectedApps });

    await commandsFromFolders.reduce(
      async (previous: Promise<void>, commandsObject: CommandsObject) => {
        await previous;
        return executeCommandsObjectOneByOne(commandsObject);
      },
      Promise.resolve()
    );
  } else if (command === "setup") {
    executeCommand(
      {
        description: "Setting up your computer for developing sensible apps",
        ///bin/bash -c \"
        command:
          '/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Code-From-Anywhere/sensible/main/packages/sensible/setup-mac/install.sh)"',
      },
      process.cwd(),
      true
    );
  } else if (command === "add") {
    const appType = await getArgumentOrAsk(
      2,
      `Which app do you want to install?\n\n${appsHumanReadable}`
    );
    if (!possibleApps.map((x) => x.slug).includes(appType)) {
      console.log(`Couldn't find app type "${appType}"`);
      process.exit(0);
    }

    const targetAppDir = path.join(targetDir, "apps", appType);
    if (fs.existsSync(targetAppDir)) {
      return log(
        `You already have an app with this type in your app folder. Please rename it first.`,
        "FgRed"
      );
    }

    const commandsObject = getInstallAppCommands({ isExistingApp: true })(
      appType
    );

    await executeCommandsObjectOneByOne(commandsObject);

    log(`Added ${appType} to your apps`, "FgCyan");
  } else {
    log('please run "sensible init" to use this cli.', "FgCyan");
  }
};
main();
