"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBetweenSequelize = void 0;
const sequelize_1 = require("sequelize");
const isBetweenSequelize = (lower, higher) => {
    const isBetween = {
        [sequelize_1.Op.and]: [{ [sequelize_1.Op.gte]: lower }, { [sequelize_1.Op.lte]: higher }],
    };
    return isBetween;
};
exports.isBetweenSequelize = isBetweenSequelize;
//# sourceMappingURL=sequelize.js.map