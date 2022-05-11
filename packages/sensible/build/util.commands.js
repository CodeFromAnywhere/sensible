"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeCommand = exports.getCommand = exports.isCommandPerOs = void 0;
var util_log_1 = require("./util.log");
var child_process_1 = require("child_process");
var os = process.platform;
var DEBUG_COMMANDS = false;
var isCommandPerOs = function (command) {
    if (typeof command === "object") {
        return true;
    }
    return false;
};
exports.isCommandPerOs = isCommandPerOs;
var getCommand = function (command) {
    if (!command.command) {
        return false;
    }
    if ((0, exports.isCommandPerOs)(command.command)) {
        var cmd = command.command[os] || command.command.default;
        return cmd;
    }
    return command.command;
};
exports.getCommand = getCommand;
var executeCommand = function (command, dir, debug) {
    // if command is disabled, immediately resolve so it is skippped.
    if (command.isDisabled) {
        return new Promise(function (resolve) {
            resolve();
        });
    }
    //tell the user what is happening, with a dot every second
    process.stdout.write(command.description);
    var interval = setInterval(function () { return process.stdout.write("."); }, 1000);
    return new Promise(function (resolve) {
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
        var getAllowed = function () {
            var _a, _b;
            command.allowedErrors = [];
            switch (os) {
                case "darwin":
                    command.allowedErrors = [];
                    break;
                case "linux":
                    command.allowedErrors = [];
                    break;
                case "win32":
                    if (typeof command.command === "string" &&
                        command.command.includes("robocopy")) {
                        //with robocopy,
                        //An Exit Code of 0-7 is success and any value >= 8 indicates that there
                        // was at least one failure during the copy operation.
                        (_a = command.allowedErrors) === null || _a === void 0 ? void 0 : _a.push(0, 1, 2, 3, 4, 5, 6, 7);
                    }
                    if (typeof command.command === "string" &&
                        command.command.includes("rmdir")) {
                        //rmdir outputs 2 when it doesn't find the folder to delete
                        (_b = command.allowedErrors) === null || _b === void 0 ? void 0 : _b.push(2);
                    }
                    break;
                default:
                    command.allowedErrors = [];
                    break;
            }
        };
        command.getAllowedErrors = getAllowed;
        command.getAllowedErrors();
        if (DEBUG_COMMANDS) {
            (0, util_log_1.log)("".concat(Date.toString(), ": extecuted ").concat(command, " in ").concat(dir));
            resolve();
        }
        else if (command.command) {
            var commandString = (0, exports.getCommand)(command);
            if (!commandString) {
                onFinish({ success: true });
                return;
            }
            (0, child_process_1.spawn)(commandString, {
                stdio: debug ? "inherit" : "ignore",
                shell: true,
                cwd: dir,
            })
                .on("exit", function (code) {
                var _a;
                var CODE_SUCCESSFUL = 0;
                if (code === CODE_SUCCESSFUL ||
                    (code && ((_a = command.allowedErrors) === null || _a === void 0 ? void 0 : _a.includes(code)))) {
                    onFinish({ success: true });
                }
                else {
                    onFinish({ success: false });
                    (0, util_log_1.log)(messages.join("\n"));
                    (0, util_log_1.log)("The following command failed (code ".concat(code, "): \"").concat(command.command, "\""));
                    process.exit(1);
                }
            })
                //save all output so it can be printed on an error
                .on("message", function (message) {
                messages.push(message.toString());
            })
                .on("error", function (err) {
                onFinish({ success: false });
                (0, util_log_1.log)(messages.join("\n"));
                (0, util_log_1.log)("The following command failed: \"".concat(command.command, "\": \"").concat(err, "\""));
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
    });
};
exports.executeCommand = executeCommand;
//# sourceMappingURL=util.commands.js.map