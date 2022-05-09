"use strict";
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
exports.handleVersionUpdates = void 0;
var path_1 = __importDefault(require("path"));
var child_process_1 = require("child_process");
var fs_1 = __importDefault(require("fs"));
var util_log_1 = require("./util.log");
var util_userinput_1 = require("./util.userinput");
var util_commands_1 = require("./util.commands");
var getVersionParts = function (versionString) {
    var _a = versionString.split(".").map(Number), major = _a[0], minor = _a[1], patch = _a[2];
    return { major: major, minor: minor, patch: patch };
};
var getPackageVersions = function (name) { return __awaiter(void 0, void 0, void 0, function () {
    var latest, packageDir, current;
    return __generator(this, function (_a) {
        latest = (0, child_process_1.spawn)("npm show ".concat(name, " version"), {
            // stdio: "inherit",
            shell: true,
            cwd: process.cwd(),
        });
        packageDir = path_1.default.resolve(__dirname, "..");
        current = JSON.parse(fs_1.default.readFileSync(path_1.default.resolve(packageDir, "package.json"), "utf8")).version;
        return [2 /*return*/, new Promise(function (resolve, reject) {
                // You can also use a variable to save the output
                // for when the script closes later
                var latestVersion = "";
                latest.stdout.setEncoding("utf8");
                latest.stdout.on("data", function (data) {
                    latestVersion += data;
                });
                latest.on("close", function (code) {
                    //Here you can get the exit code of the script
                    if (code === 0) {
                        resolve({ latest: latestVersion, current: current });
                    }
                    else {
                        reject();
                    }
                });
            })];
    });
}); };
var getUpdateSeverity = function (_a) {
    var latest = _a.latest, current = _a.current;
    return __awaiter(void 0, void 0, void 0, function () {
        var latestParts, currentParts;
        return __generator(this, function (_b) {
            latestParts = getVersionParts(latest);
            currentParts = getVersionParts(current);
            if (latestParts.major > currentParts.major)
                return [2 /*return*/, "major"];
            if (latestParts.minor > currentParts.minor)
                return [2 /*return*/, "minor"];
            if (latestParts.patch > currentParts.patch)
                return [2 /*return*/, "patch"];
            return [2 /*return*/, false];
        });
    });
};
var handleVersionUpdates = function (name, targetDir, isDebug) { return __awaiter(void 0, void 0, void 0, function () {
    var versions, updateSeverity, shouldUpdate;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getPackageVersions(name)];
            case 1:
                versions = _a.sent();
                if (!versions) {
                    return [2 /*return*/, (0, util_log_1.log)("Couldn't check your version, be warned", "FgRed")];
                }
                return [4 /*yield*/, getUpdateSeverity(versions)];
            case 2:
                updateSeverity = _a.sent();
                if (!updateSeverity)
                    return [2 /*return*/];
                if (updateSeverity === "patch") {
                    return [2 /*return*/, (0, util_log_1.log)("There's a new version of sensible with version ".concat(versions.latest, ". You are now on version ").concat(versions.current, "."), "FgYellow")];
                }
                return [4 /*yield*/, (0, util_userinput_1.askOk)("Theres a new ".concat(updateSeverity, " version available for ").concat(name, " (").concat(versions.latest, "). You're now on version ").concat(versions.current, ". Shall we update? yes/no"))];
            case 3:
                shouldUpdate = _a.sent();
                if (!shouldUpdate) return [3 /*break*/, 5];
                return [4 /*yield*/, (0, util_commands_1.executeCommand)({
                        description: "Updating ".concat(name),
                        command: "npm install --global ".concat(name, "@latest"),
                    }, targetDir, isDebug)];
            case 4:
                _a.sent();
                return [2 /*return*/, process.exit(0)];
            case 5: return [2 /*return*/, (0, util_log_1.log)("Continuing on an older ".concat(updateSeverity, " version. Probably mostly harmless."), "FgGreen")];
        }
    });
}); };
exports.handleVersionUpdates = handleVersionUpdates;
//# sourceMappingURL=util.versions.js.map