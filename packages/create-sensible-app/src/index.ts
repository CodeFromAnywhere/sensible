#!/usr/bin/env node
//this should run the whole script as a cli

import readline from "readline";
import path from "path";

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

(async () => {
  const appName = await getName();
  const assetsDir = path.resolve(__dirname, "..", `assets`);
  const targetDir = process.cwd();

  const commandsFromFolders = [
    {
      dir: targetDir,
      commands: [
        `mkdir ${appName}`,
        `cp -R ${assetsDir}/templates/init/* ${targetDir}/${appName}`,
      ],
    },

    {
      dir: `${targetDir}/${appName}`,
      commands: [
        "yarn create next-app --typescript web",
        "npx expo-cli init -t expo-template-blank-typescript app",
        `cp -R ${assetsDir}/templates/app/* ${targetDir}/${appName}/app`,
        `cp -R ${assetsDir}/templates/web/* ${targetDir}/${appName}/web`,
      ],
    },

    {
      dir: `${targetDir}/${appName}/web`,
      commands: [
        "yarn add react-query react-with-native react-with-native-date-input react-with-native-form react-with-native-number-input react-with-native-password-input react-with-native-phone-input react-with-native-select-input react-with-native-store react-with-native-text-input react-with-native-textarea-input react-with-native-toggle-input react-with-native-notification react-with-native-router next-transpile-linked-modules next-transpile-modules @badrap/bar-of-progress",
        "yarn add -D tailwindcss postcss autoprefixer",
        "mkdir src",
        "mv styles src/styles",
        "mv pages src/pages",
        "touch src/types.ts",
        "touch src/constants.ts",
        "npx tailwindcss init -p",
      ],
    },

    {
      dir: `${targetDir}/${appName}/app`,
      commands: [
        "yarn add react-query react-with-native react-with-native-date-input react-with-native-form react-with-native-number-input react-with-native-password-input react-with-native-phone-input react-with-native-select-input react-with-native-store react-with-native-text-input react-with-native-textarea-input react-with-native-toggle-input react-with-native-notification react-with-native-router",
        // open vscode
        `code ${targetDir}/${appName}`,
      ],
    },
  ];
})();
