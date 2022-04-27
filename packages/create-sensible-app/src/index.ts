#!/usr/bin/env node
//this should run the whole script as a cli

import readline from "readline";
import path from "path";
import { spawn } from "child_process";

type Command = {
  command: string;
  description: string;
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

const getName = async (): Promise<string> => {
  let firstArgument = process.argv[2];
  if (firstArgument && firstArgument.length > 0) return firstArgument;

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
  });

  return new Promise((resolve) => {
    rl.question("What should your sensible app be called?\n", (name) => {
      resolve(slugify(name));
      rl.close();
    });
  });
};

const isDebug = () => {
  return process.argv.includes("--debug");
};

const getSpawnCommandsReducer =
  (dir: string, debug: boolean) =>
  async (previous: Promise<void>, command: Command) => {
    await previous;

    // this can be used to test if the commands really are excecuted sequentially with the right parameters.
    // return new Promise<void>((resolve) => {
    //   setTimeout(() => {
    //     resolve(console.log(`extecuted ${command} in ${dir}`));
    //   }, 1000);
    // });

    process.stdout.write(command.description);
    const interval = setInterval(() => process.stdout.write("."), 1000);
    return new Promise<void>((resolve) => {
      const messages: string[] = [];
      spawn(command.command, {
        stdio: debug ? "inherit" : "ignore",
        shell: true,
        cwd: dir,
      })
        .addListener("exit", (code) => {
          console.clear();
          clearInterval(interval);
          resolve();
        })
        //save all output so it can be printed on an error
        .on("message", (message) => {
          messages.push(message.toString());
        })
        .on("error", (err) => {
          console.log(messages.join("\n"));
          throw `The following command failed: "${command}": "${err}"`;
        });
    });
  };

(async () => {
  const appName = await getName();
  const debug = isDebug();
  const assetsDir = path.resolve(__dirname, "..", `assets`);
  const targetDir = process.cwd();

  const commandsFromFolders: CommandsObject[] = [
    {
      dir: targetDir,
      commands: [
        {
          command: `mkdir ${appName}`,
          description: "Making folder for your app",
        },
        {
          command: `cp -R ${assetsDir}/templates/init/* ${targetDir}/${appName}`,
          description: "Copying sensible template",
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
          command: `cp -R ${assetsDir}/templates/web/* ${targetDir}/${appName}/apps/web`,
          description: "Copying web template",
        },
        {
          command: `cp -R ${assetsDir}/templates/app/* ${targetDir}/${appName}/apps/app`,
          description: "Copying app template",
        },
      ],
    },

    {
      dir: `${targetDir}/${appName}/apps/web`,
      commands: [
        {
          command:
            "yarn add react-query react-with-native react-with-native-date-input react-with-native-form react-with-native-number-input react-with-native-password-input react-with-native-phone-input react-with-native-select-input react-with-native-store react-with-native-text-input react-with-native-textarea-input react-with-native-toggle-input react-with-native-notification react-with-native-router next-transpile-linked-modules next-transpile-modules @badrap/bar-of-progress",
          description: "Installing web dependencies",
        },
        {
          command: "yarn add -D tailwindcss postcss autoprefixer",
          description: "Installing web devDependencies",
        },
        { command: "mkdir src", description: "Making src directory" },
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
          command: "npx tailwindcss init -p",
          description: "Installing tailwind",
        },
      ],
    },

    {
      dir: `${targetDir}/${appName}/apps/app`,
      commands: [
        {
          command:
            "yarn add react-query react-with-native react-with-native-date-input react-with-native-form react-with-native-number-input react-with-native-password-input react-with-native-phone-input react-with-native-select-input react-with-native-store react-with-native-text-input react-with-native-textarea-input react-with-native-toggle-input react-with-native-notification react-with-native-router",
          description: "Installing app dependencies",
        },
        // open vscode
        {
          command: `code ${targetDir}/${appName}`,
          description: "Opening your project",
        },
      ],
    },
  ];

  commandsFromFolders.reduce(
    async (previous: Promise<void>, commandsObject: CommandsObject) => {
      await previous;
      return commandsObject.commands.reduce(
        getSpawnCommandsReducer(commandsObject.dir, debug),
        Promise.resolve()
      );
    },
    Promise.resolve()
  );
})();
