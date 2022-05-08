#!/usr/bin/env node
//this should run the whole script as a cli
const child_process = require("child_process");
const arguments = process.argv.slice(2).join(" ");
child_process.execSync(`npx sensible init ${arguments}`, { stdio: "inherit" });
