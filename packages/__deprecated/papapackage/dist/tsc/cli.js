#!/usr/bin/env node
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { handler as defaultHandler } from "./commands/DEFAULT.js";
yargs(hideBin(process.argv))
    .scriptName("papapackage")
    .command("*", "The default command", () => { }, defaultHandler)
    .alias({ h: "help" }).argv;
//# sourceMappingURL=cli.js.map