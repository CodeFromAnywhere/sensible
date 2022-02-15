"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBetweenSequelize = void 0;
var sequelize_1 = require("sequelize");
var operators_1 = require("sequelize/types/operators"); //not exported from main place, found through looking in their code
//
var isBetweenSequelize = function (lower, higher) {
    var _a, _b, _c;
    var isBetween = (_a = {},
        _a[sequelize_1.Op.and] = [(_b = {}, _b[sequelize_1.Op.gte] = lower, _b), (_c = {}, _c[sequelize_1.Op.lte] = higher, _c)],
        _a);
    return isBetween;
};
exports.isBetweenSequelize = isBetweenSequelize;
//# sourceMappingURL=util.js.map