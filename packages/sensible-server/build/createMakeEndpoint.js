"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMakeEndpoint = exports.typeIsValid = void 0;
var server_1 = __importDefault(require("server"));
var typeIsValid = function (body, type) {
    return true;
};
exports.typeIsValid = typeIsValid;
var createMakeEndpoint = function () {
    return function (path, method, endpoint) {
        var callMethod = method === "GET" ? "get" : "post";
        return server_1.default.router[callMethod]("/".concat(path), function (ctx) {
            var body = method === "POST" ? ctx.data : ctx.query;
            var extendedCtx = __assign(__assign({}, ctx), { body: body });
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
//# sourceMappingURL=createMakeEndpoint.js.map