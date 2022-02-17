"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMakeEndpoint = exports.typeIsValid = void 0;
const server_1 = __importDefault(require("server"));
const typeIsValid = (body, type) => {
    return true;
};
exports.typeIsValid = typeIsValid;
const createMakeEndpoint = () => {
    return (path, method, endpoint) => {
        const callMethod = method === "GET" ? "get" : "post";
        return server_1.default.router[callMethod](`/${path}`, (ctx) => {
            const body = method === "POST" ? ctx.data : ctx.query;
            const extendedCtx = { ...ctx, body };
            if (!(0, exports.typeIsValid)(body, null)) {
                return {
                    response: "Body is invalid",
                    success: false,
                };
            }
            return endpoint(extendedCtx);
        });
    };
};
exports.createMakeEndpoint = createMakeEndpoint;
