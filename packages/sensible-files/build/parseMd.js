"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseMd = void 0;
var fs_1 = __importDefault(require("fs"));
var gray_matter_1 = __importDefault(require("gray-matter"));
/**
 * parse a md file to all the needed info
 * @param mdFilePath path to a md file
 * @returns Md
 */
var parseMd = function (mdFilePath) {
    var fileContents = fs_1.default.readFileSync(mdFilePath, "utf8");
    var fileStats = fs_1.default.statSync(mdFilePath);
    var config = undefined;
    var matterResult = (0, gray_matter_1.default)(fileContents, config);
    var fileName = mdFilePath.split("/").pop().replace(/\.md$/, "");
    return {
        content: matterResult.content,
        createdAt: fileStats.birthtimeMs,
        fileName: fileName,
        openedAt: fileStats.atimeMs,
        params: matterResult.data,
        updatedAt: fileStats.ctimeMs,
        modifiedAt: fileStats.mtimeMs,
    };
};
exports.parseMd = parseMd;
//# sourceMappingURL=parseMd.js.map