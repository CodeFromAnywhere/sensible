#!/usr/bin/env node
"use strict";
//this should run the whole script as a cli
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var readline_1 = __importDefault(require("readline"));
var path_1 = __importDefault(require("path"));
var child_process_1 = require("child_process");
var fs_1 = __importDefault(require("fs"));
var os_1 = require("os");
var util_templates_1 = require("./util.templates");
var DEBUG_COMMANDS = false;
var defaultAppName = "makes-sense";
//test environment should be optional and easy to set up, live should be the default, since we want people to immedeately ship
var initialCommitMessage = "🧠 This Makes Sense";
// currently, this results in a couple of invalid hook calls due to mismatching react* versions
var includedRepoSlugs = [
    "Code-From-Anywhere/react-with-native",
    "Code-From-Anywhere/sensible",
];
var settingsLocation = path_1.default.join((0, os_1.homedir)(), ".sensible/settings.txt");
var settingsString = fs_1.default.existsSync(settingsLocation)
    ? fs_1.default.readFileSync(settingsLocation, "utf8")
    : "";
var settingsArray = settingsString.split(" ");
var findArgument = function (flag) { return function (arg) {
    return arg.startsWith("--".concat(flag));
}; };
var getFlagValue = function (flag) {
    return flag ? flag.split("=")[1] || true : false;
};
var getFlag = function (flag) {
    var foundFlagSettings = settingsArray.find(findArgument(flag));
    var foundFlag = process.argv.find(findArgument(flag));
    var flagValue = getFlagValue(foundFlagSettings) || getFlagValue(foundFlag);
    return flagValue;
};
var isDebug = getFlag("debug");
var isInteractive = getFlag("interactive");
var isOffline = getFlag("offline");
var isNoCache = getFlag("no-cache");
var isNoThirdParty = getFlag("no-third-party");
var mainBranch = getFlag("branch");
var cacheDays = getFlag("cache-days");
var isNewDefaults = getFlag("new-defaults");
var cacheDaysNumber = typeof cacheDays === "string" && !isNaN(Number(cacheDays))
    ? Number(cacheDays)
    : 1;
var cacheUpdatedAtLocation = path_1.default.join((0, os_1.homedir)(), ".sensible/updatedAt.txt");
var updatedAt = fs_1.default.existsSync(cacheUpdatedAtLocation)
    ? fs_1.default.readFileSync(cacheUpdatedAtLocation, "utf8")
    : "0";
var difference = Date.now() - Number(updatedAt);
var shouldGetCache = (difference < 86400 * 1000 * cacheDaysNumber || isOffline) && !isNoCache;
var mainBranchName = typeof mainBranch === "string" && mainBranch.length > 0 ? mainBranch : "live";
function slugify(string) {
    var a = "àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìıİłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;";
    var b = "aaaaaaaaaacccddeeeeeeeegghiiiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------";
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
var ask = function (question) {
    var rl = readline_1.default.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false,
    });
    return new Promise(function (resolve) {
        rl.question(question, function (input) {
            resolve(input);
            rl.close();
        });
    });
};
var flagArgumentsString = process.argv
    .filter(function (a) { return a.startsWith("--"); })
    .join(" ");
var argumentsWithoutFlags = process.argv.filter(function (a) { return !a.startsWith("--"); });
var getArgumentOrAsk = function (argumentPosition, question) { return __awaiter(void 0, void 0, void 0, function () {
    var argument;
    return __generator(this, function (_a) {
        argument = argumentsWithoutFlags[argumentPosition + 1];
        if (argument && argument.length > 0)
            return [2 /*return*/, argument];
        if (!isInteractive) {
            return [2 /*return*/, ""];
        }
        return [2 /*return*/, ask(question)];
    });
}); };
var getName = function () { return __awaiter(void 0, void 0, void 0, function () {
    var name, appName, n, fullAppName;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getArgumentOrAsk(1, "What should your sensible app be called? (default: ".concat(defaultAppName, ")\n"))];
            case 1:
                name = _a.sent();
                appName = name.length > 0 ? slugify(name) : defaultAppName;
                n = 0;
                fullAppName = appName;
                while (fs_1.default.existsSync(fullAppName)) {
                    n++;
                    fullAppName = "".concat(appName).concat(n);
                }
                if (fullAppName !== appName) {
                    console.log("Using name ".concat(fullAppName, " because ").concat(appName, " folder already exists."));
                }
                return [2 /*return*/, fullAppName];
        }
    });
}); };
var getRemote = function (name) { return __awaiter(void 0, void 0, void 0, function () {
    var remote;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getArgumentOrAsk(2, "Where should ".concat(name, " be hosted? Provide an URL or a GitHub slug (either \"org/repo\" or \"username/repo\")\n"))];
            case 1:
                remote = _a.sent();
                return [2 /*return*/, remote.length > 0
                        ? remote.includes("https://")
                            ? remote
                            : "https://github.com/".concat(remote, ".git")
                        : null];
        }
    });
}); };
var getSpawnCommandsReducer = function (dir, debug) {
    return function (previous, command) { return __awaiter(void 0, void 0, void 0, function () {
        var interval;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, previous];
                case 1:
                    _a.sent();
                    // if command is disabled, immediately resolve so it is skippped.
                    if (command.isDisabled) {
                        return [2 /*return*/, new Promise(function (resolve) {
                                resolve();
                            })];
                    }
                    //tell the user what is happening, with a dot every second
                    process.stdout.write(command.description);
                    interval = setInterval(function () { return process.stdout.write("."); }, 1000);
                    return [2 /*return*/, new Promise(function (resolve) {
                            var messages = [];
                            var onFinish = function (_a) {
                                var success = _a.success;
                                //once done, clear the console
                                console.clear();
                                clearInterval(interval);
                                if (success) {
                                    resolve();
                                }
                            };
                            if (DEBUG_COMMANDS) {
                                console.log("".concat(Date.toString(), ": extecuted ").concat(command, " in ").concat(dir));
                                resolve();
                            }
                            else if (command.command) {
                                (0, child_process_1.spawn)(command.command, {
                                    stdio: debug ? "inherit" : "ignore",
                                    shell: true,
                                    cwd: dir,
                                })
                                    .on("exit", function (code) {
                                    var CODE_SUCCESSFUL = 0;
                                    if (code === CODE_SUCCESSFUL) {
                                        onFinish({ success: true });
                                    }
                                    else {
                                        onFinish({ success: false });
                                        console.log(messages.join("\n"));
                                        console.log("The following command failed: \"".concat(command.command, "\""));
                                        process.exit(1);
                                    }
                                })
                                    //save all output so it can be printed on an error
                                    .on("message", function (message) {
                                    messages.push(message.toString());
                                })
                                    .on("error", function (err) {
                                    onFinish({ success: false });
                                    console.log(messages.join("\n"));
                                    console.log("The following command failed: \"".concat(command.command, "\": \"").concat(err, "\""));
                                    process.exit(1);
                                });
                            }
                            else if (command.nodeFunction) {
                                command.nodeFunction(function () {
                                    onFinish({ success: true });
                                });
                            }
                            else {
                                onFinish({ success: true });
                            }
                        })];
            }
        });
    }); };
};
var askEnvironmentSetup = function () { return __awaiter(void 0, void 0, void 0, function () {
    var envIsSetup;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, ask("Do you have the following environment setup and tools installed? Continuing with a different setup could cause bugs. \n\n- macos\n- node 18, npm, yarn\n- vscode with code cli\n- jq\n- git\n- watchman\n\nSee https://github.com/Code-From-Anywhere/sensible/blob/main/docs/cli.md for more info.\n\nYes (y, yes, enter) or no?\n\n")];
            case 1:
                envIsSetup = _a.sent();
                if (["y", "", "yes"].includes(envIsSetup)) {
                    return [2 /*return*/, true];
                }
                else {
                    return [2 /*return*/, false];
                }
                return [2 /*return*/];
        }
    });
}); };
/**
 * replace all variables in a command string with the actual value
 */
var commandReplaceVariables = function (variables) {
    return function (command) {
        return {
            description: command.description,
            command: Object.keys(variables).reduce(function (command, key) {
                return command === null || command === void 0 ? void 0 : command.replaceAll("{".concat(key, "}"), variables[key]);
            }, command.command),
        };
    };
};
var main = function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a, appName, remote, sensibleDir, targetDir, pushToGit, openVSCode, setNewDefaults, selectedApps, commandsWithoutCache, cacheCommands, commandsFromFolders;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = updatedAt === "0";
                if (!_a) return [3 /*break*/, 2];
                return [4 /*yield*/, askEnvironmentSetup()];
            case 1:
                _a = !(_b.sent());
                _b.label = 2;
            case 2:
                if (_a) {
                    console.log("Please set up your environment first.");
                    process.exit(1);
                }
                return [4 /*yield*/, getName()];
            case 3:
                appName = _b.sent();
                return [4 /*yield*/, getRemote(appName)];
            case 4:
                remote = _b.sent();
                sensibleDir = path_1.default.resolve(__dirname, "..");
                targetDir = process.cwd();
                pushToGit = {
                    dir: "".concat(targetDir, "/").concat(appName),
                    commands: [
                        {
                            command: "rm -rf .git",
                            description: "Remove previous git",
                        },
                        {
                            command: "git init",
                            description: "Initialising a git repo",
                        },
                        {
                            command: "git branch -M ".concat(mainBranchName),
                            description: "Move to '".concat(mainBranchName, "' branch"),
                        },
                        {
                            command: "git add . && git commit -m \"".concat(initialCommitMessage, "\""),
                            description: "Creating commit",
                        },
                        {
                            command: "git remote add origin ".concat(remote),
                            description: "Adding remote",
                            isDisabled: !remote,
                        },
                        {
                            command: "git push -u origin ".concat(mainBranchName),
                            description: "Push",
                            isDisabled: !remote,
                        },
                    ],
                };
                openVSCode = {
                    command: "code ".concat(targetDir, "/").concat(appName, " --goto README.md:1:1"),
                    description: "Opening your project in VSCode",
                };
                setNewDefaults = {
                    command: "echo ".concat(flagArgumentsString, " > ").concat(settingsLocation),
                    description: "Save new setttings",
                    isDisabled: !isNewDefaults,
                };
                selectedApps = ["app", "web"];
                commandsWithoutCache = __spreadArray(__spreadArray([
                    {
                        dir: targetDir,
                        commands: [
                            {
                                command: "mkdir ".concat(appName),
                                description: "Making folder for your app",
                            },
                            {
                                //NB: "*" doesn't match hidden files, so we use "." here
                                command: "cp -R ".concat(sensibleDir, "/templates/base/. ").concat(targetDir, "/").concat(appName),
                                description: "Copying sensible base",
                            },
                            {
                                nodeFunction: (0, util_templates_1.findAndRenameTemplateFiles)("".concat(targetDir, "/").concat(appName)),
                                description: "Rename template files to normal files",
                            },
                        ],
                    },
                    {
                        dir: "".concat(targetDir, "/").concat(appName, "/apps/server"),
                        commands: [
                            {
                                command: "yarn add cors dotenv md5 reflect-metadata sequelize sequelize-typescript server sqlite3 typescript",
                                description: "Installing server dependencies",
                            },
                            {
                                command: "yarn add -D @types/node @types/server @types/validator babel-cli eslint ts-node ts-node-dev",
                                description: "Installing server devDependencies",
                            },
                        ],
                    },
                    {
                        // download all third-party dependencies that are tightly integrated and probably still require some bugfixing in v1
                        dir: "".concat(targetDir, "/").concat(appName, "/third-party"),
                        commands: isNoThirdParty
                            ? []
                            : includedRepoSlugs.map(function (slug) { return ({
                                command: "git clone https://github.com/".concat(slug, ".git"),
                                description: "Adding third-party repo: ".concat(slug),
                            }); }),
                    }
                ], selectedApps.map(function (app) {
                    var appsCommands = JSON.parse(fs_1.default.readFileSync(path_1.default.join(sensibleDir, "templates/apps/".concat(app, ".install.json")), { encoding: "utf8" }));
                    var filledInAppCommands = appsCommands.commands.map(commandReplaceVariables({}));
                    return {
                        dir: "".concat(targetDir, "/").concat(appName, "/apps"),
                        commands: filledInAppCommands.concat([
                            {
                                command: "cp -R ".concat(sensibleDir, "/templates/apps/").concat(app, "/. ").concat(targetDir, "/").concat(appName, "/apps/").concat(app),
                                description: "Copying ".concat(app, " template"),
                            },
                        ]),
                    };
                }), true), [
                    {
                        dir: "".concat(targetDir, "/").concat(appName),
                        commands: [openVSCode],
                    },
                    pushToGit,
                    {
                        dir: (0, os_1.homedir)(),
                        commands: [
                            {
                                // NB: -p stands for parents and makes directories recursively
                                command: "rm -rf .sensible/cache && mkdir -p .sensible/cache",
                                description: "Creating sensible cache folder",
                            },
                            {
                                command: "cp -R ".concat(targetDir, "/").concat(appName, "/. .sensible/cache"),
                                description: "Creating cache",
                            },
                            {
                                command: "echo $(node -e 'console.log(Date.now())') > .sensible/updatedAt.txt",
                                description: "Add current timestamp to cached files",
                            },
                            setNewDefaults,
                        ],
                    },
                ], false);
                cacheCommands = [
                    {
                        dir: targetDir,
                        commands: [
                            {
                                command: "mkdir ".concat(appName),
                                description: "Creating your app folder",
                            },
                            {
                                command: "cp -R $HOME/.sensible/cache/. ".concat(targetDir, "/").concat(appName),
                                description: "Copying sensible from cache",
                            },
                            openVSCode,
                            setNewDefaults,
                        ],
                    },
                    pushToGit,
                ];
                commandsFromFolders = shouldGetCache
                    ? cacheCommands
                    : commandsWithoutCache;
                return [4 /*yield*/, commandsFromFolders.reduce(function (previous, commandsObject) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, previous];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/, commandsObject.commands.reduce(getSpawnCommandsReducer(commandsObject.dir, !!isDebug), Promise.resolve())];
                            }
                        });
                    }); }, Promise.resolve())];
            case 5:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); };
main();
//# sourceMappingURL=index.js.map