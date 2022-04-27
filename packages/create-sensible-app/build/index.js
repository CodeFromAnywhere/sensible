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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var readline_1 = __importDefault(require("readline"));
var path_1 = __importDefault(require("path"));
var child_process_1 = require("child_process");
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
var getName = function () { return __awaiter(void 0, void 0, void 0, function () {
    var firstArgument, rl;
    return __generator(this, function (_a) {
        firstArgument = process.argv[2];
        if (firstArgument && firstArgument.length > 0)
            return [2 /*return*/, firstArgument];
        rl = readline_1.default.createInterface({
            input: process.stdin,
            output: process.stdout,
            terminal: false,
        });
        return [2 /*return*/, new Promise(function (resolve) {
                rl.question("What should your sensible app be called?\n", function (name) {
                    resolve(slugify(name));
                    rl.close();
                });
            })];
    });
}); };
var isDebug = function () {
    return process.argv.includes("--debug");
};
var getSpawnCommandsReducer = function (dir, debug) {
    return function (previous, command) { return __awaiter(void 0, void 0, void 0, function () {
        var interval;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, previous];
                case 1:
                    _a.sent();
                    // this can be used to test if the commands really are excecuted sequentially with the right parameters.
                    // return new Promise<void>((resolve) => {
                    //   setTimeout(() => {
                    //     resolve(console.log(`extecuted ${command} in ${dir}`));
                    //   }, 1000);
                    // });
                    process.stdout.write(command.description);
                    interval = setInterval(function () { return process.stdout.write("."); }, 1000);
                    return [2 /*return*/, new Promise(function (resolve) {
                            var messages = [];
                            (0, child_process_1.spawn)(command.command, {
                                stdio: debug ? "inherit" : "ignore",
                                shell: true,
                                cwd: dir,
                            })
                                .addListener("exit", function (code) {
                                console.clear();
                                clearInterval(interval);
                                resolve();
                            })
                                //save all output so it can be printed on an error
                                .on("message", function (message) {
                                messages.push(message.toString());
                            })
                                .on("error", function (err) {
                                console.log(messages.join("\n"));
                                throw "The following command failed: \"".concat(command, "\": \"").concat(err, "\"");
                            });
                        })];
            }
        });
    }); };
};
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var appName, debug, assetsDir, targetDir, commandsFromFolders;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getName()];
            case 1:
                appName = _a.sent();
                debug = isDebug();
                assetsDir = path_1.default.resolve(__dirname, "..", "assets");
                targetDir = process.cwd();
                commandsFromFolders = [
                    {
                        dir: targetDir,
                        commands: [
                            {
                                command: "mkdir ".concat(appName),
                                description: "Making folder for your app",
                            },
                            {
                                command: "cp -R ".concat(assetsDir, "/templates/init/* ").concat(targetDir, "/").concat(appName),
                                description: "Copying sensible template",
                            },
                        ],
                    },
                    {
                        dir: "".concat(targetDir, "/").concat(appName, "/apps"),
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
                                command: "cp -R ".concat(assetsDir, "/templates/web/* ").concat(targetDir, "/").concat(appName, "/apps/web"),
                                description: "Copying web template",
                            },
                            {
                                command: "cp -R ".concat(assetsDir, "/templates/app/* ").concat(targetDir, "/").concat(appName, "/apps/app"),
                                description: "Copying app template",
                            },
                        ],
                    },
                    {
                        dir: "".concat(targetDir, "/").concat(appName, "/apps/web"),
                        commands: [
                            {
                                command: "yarn add react-query react-with-native react-with-native-date-input react-with-native-form react-with-native-number-input react-with-native-password-input react-with-native-phone-input react-with-native-select-input react-with-native-store react-with-native-text-input react-with-native-textarea-input react-with-native-toggle-input react-with-native-notification react-with-native-router next-transpile-linked-modules next-transpile-modules @badrap/bar-of-progress",
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
                        dir: "".concat(targetDir, "/").concat(appName, "/apps/app"),
                        commands: [
                            {
                                command: "yarn add react-query react-with-native react-with-native-date-input react-with-native-form react-with-native-number-input react-with-native-password-input react-with-native-phone-input react-with-native-select-input react-with-native-store react-with-native-text-input react-with-native-textarea-input react-with-native-toggle-input react-with-native-notification react-with-native-router",
                                description: "Installing app dependencies",
                            },
                            // open vscode
                            {
                                command: "code ".concat(targetDir, "/").concat(appName),
                                description: "Opening your project",
                            },
                        ],
                    },
                ];
                commandsFromFolders.reduce(function (previous, commandsObject) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, previous];
                            case 1:
                                _a.sent();
                                return [2 /*return*/, commandsObject.commands.reduce(getSpawnCommandsReducer(commandsObject.dir, debug), Promise.resolve())];
                        }
                    });
                }); }, Promise.resolve());
                return [2 /*return*/];
        }
    });
}); })();
//# sourceMappingURL=index.js.map