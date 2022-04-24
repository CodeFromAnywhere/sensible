#!/usr/bin/env node
import watchman from "fb-watchman";
//const readline = require("readline");
import readline from "readline";
import { calculateWatchlist, getPackages, linkWatchlist, logWatchlist, showCommands, showInfo, showLatestEventInfo, watchAndSubscribe, } from "../util/util.js";
//const ora = require("ora");
import * as oraAll from "ora";
const ora = oraAll.default;
const run = (argv, debug) => {
    //step 1-12
    const watchlist = calculateWatchlist(argv);
    linkWatchlist(watchlist, "yarn", debug);
    const status = ora({
        spinner: "dots",
        text: "Watching...",
        discardStdin: false,
        hideCursor: false,
    }).start();
    //step 13: run watchman for the watchlist with the handler to copy every changed file to all its destination
    const client = new watchman.Client({
    //watchmanBinaryPath: "/opt/homebrew/bin/watchman",
    });
    client.capabilityCheck({ optional: [], required: ["relative_root"] }, watchAndSubscribe(client, debug, status, watchlist));
};
export const handler = (argv) => {
    //watch certain keys:
    const args = argv._;
    const debug = Boolean(args[1]);
    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);
    process.stdin.on("keypress", (str, key) => {
        if (key.ctrl && key.name === "c") {
            process.exit();
        }
        else if (key.name === "i") {
            showInfo();
        }
        else if (key.name === "d") {
            showLatestEventInfo();
        }
        else if (key.name === "l") {
            const watchlist = calculateWatchlist(argv);
            logWatchlist(watchlist);
        }
        else if (key.name === "f") {
            const args = argv._;
            const { files, packages } = getPackages(args);
            console.table(files);
        }
        else {
            //any other keypress, show info
            showInfo();
        }
    });
    showCommands();
    run(argv, debug);
    //process.exit(0);
};
//# sourceMappingURL=DEFAULT.js.map