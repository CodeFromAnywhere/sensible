"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBetweenSequelize = void 0;
var operators_1 = require("sequelize/types/operators");
var isBetweenSequelize = function (lower, higher) {
    var _a, _b, _c;
    var isBetween = (_a = {},
        _a[operators_1.Op.and] = [(_b = {}, _b[operators_1.Op.gte] = lower, _b), (_c = {}, _c[operators_1.Op.lte] = higher, _c)],
        _a);
    return isBetween;
};
exports.isBetweenSequelize = isBetweenSequelize;
//# sourceMappingURL=util.js.map