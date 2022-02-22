"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseMd = void 0;
const fs_1 = __importDefault(require("fs"));
const gray_matter_1 = __importDefault(require("gray-matter"));
const parseMd = (mdFilePath) => {
    const fileContents = fs_1.default.readFileSync(mdFilePath, "utf8");
    const fileStats = fs_1.default.statSync(mdFilePath);
    const config = undefined;
    const matterResult = (0, gray_matter_1.default)(fileContents, config);
    const fileName = mdFilePath.split("/").pop().replace(/\.md$/, "");
    return {
        content: matterResult.content,
        createdAt: fileStats.birthtimeMs,
        fileName,
        openedAt: fileStats.atimeMs,
        params: matterResult.data,
        updatedAt: fileStats.ctimeMs,
        modifiedAt: fileStats.mtimeMs,
    };
};
exports.parseMd = parseMd;
//# sourceMappingURL=parseMd.js.map