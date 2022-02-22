"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCachedCrons = void 0;
//just generate the schema once every server restart because there can't be any changes without the server restarting.
let cachedCrons = [];
const getCachedCrons = (folderPath) => {
    if (cachedCrons.length > 0) {
        return cachedCrons;
    }
    const Crons = [];
    cachedCrons = Crons;
    return Crons;
};
exports.getCachedCrons = getCachedCrons;
//# sourceMappingURL=getCachedCrons.js.map