#!/usr/bin/env node
//wrapper around sensible init
//this should run the whole script as a cli
const child_process = require("child_process");
const argumentsArray = process.argv.slice(2);
const argumentsArrayWithDoubleDash = argumentsArray.map((arg) => {
  if (!arg.startsWith("--")) {
    return "--" + arg;
  }
  return arg;
});
//const arguments = argumentsArray.join(" ");
const argumentsDoubleDashed = argumentsArrayWithDoubleDash.join(" ");
child_process.execSync(`npx sensible init ${argumentsDoubleDashed}`, {
  stdio: "inherit",
});
