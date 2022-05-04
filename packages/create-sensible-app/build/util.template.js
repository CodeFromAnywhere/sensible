"use strict";
/*
As long as there are no .template files present in the template folder that DONT need to be changed, it is fine.
If there are, we should warn people.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.renameTemplateToNormalFile = exports.renameToTemplateFile = exports.findTemplateFiles = void 0;
var templateExtension = ".template";
/**
 * finds all template files recursively and returns the paths in an array
 */
var findTemplateFiles = function () {
    return [];
};
exports.findTemplateFiles = findTemplateFiles;
var renameToTemplateFile = function (fileName) {
    var extensionStartsAt = fileName.lastIndexOf(".");
    var insertPosition = extensionStartsAt === -1 ? fileName.length : extensionStartsAt;
    var beforeExtension = fileName.substring(0, insertPosition);
    var afterExtension = fileName.substring(insertPosition);
    return "".concat(beforeExtension).concat(templateExtension).concat(afterExtension);
};
exports.renameToTemplateFile = renameToTemplateFile;
var renameTemplateToNormalFile = function (fileName) {
    return fileName.replace(".template", "");
};
exports.renameTemplateToNormalFile = renameTemplateToNormalFile;
var test = function () {
    var fileNames = [".gitignore", "package.json", "Podfile"];
    var changedFileNames = fileNames
        .map(exports.renameToTemplateFile)
        .map(exports.renameTemplateToNormalFile);
    return (fileNames.length === changedFileNames.length &&
        fileNames.every(function (value, index) { return value === changedFileNames[index]; }));
};
//console.log(test());
//# sourceMappingURL=util.template.js.map