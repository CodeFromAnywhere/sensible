"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRepo = void 0;
const getRepo = (repository) => (typeof repository === "object" ? repository.url : repository);
exports.getRepo = getRepo;
//# sourceMappingURL=getRepo.js.map