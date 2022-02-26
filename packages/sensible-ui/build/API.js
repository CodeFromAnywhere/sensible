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
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeApi = exports.toQueryString = exports.bodyFromQueryString = void 0;
var isValidEntry = function (_a) {
    var _ = _a[0], value = _a[1];
    return value !== undefined && value !== "" && value !== null;
};
var bodyFromQueryString = function (
/**
 * format: x=x&y=y&z=z
 */
query) {
    var _a;
    var kv = (_a = query === null || query === void 0 ? void 0 : query.split("&")) === null || _a === void 0 ? void 0 : _a.map(function (x) {
        var _a;
        return (_a = {}, _a[x.split("=")[0]] = x.split("=")[1], _a);
    });
    var all = kv === null || kv === void 0 ? void 0 : kv.reduce(function (object, current) {
        return __assign(__assign({}, object), current);
    }, {});
    return all;
};
exports.bodyFromQueryString = bodyFromQueryString;
var toQueryString = function (query) {
    var _a;
    var hasQuery = query && ((_a = Object.entries(query)) === null || _a === void 0 ? void 0 : _a.filter(isValidEntry).length) > 0;
    return hasQuery
        ? "?" +
            Object.entries(query)
                .filter(isValidEntry)
                .map(function (_a) {
                var key = _a[0], value = _a[1];
                var encodedValue = encodeURIComponent(String(value));
                return "".concat(key, "=").concat(encodedValue);
            })
                .join("&")
        : "";
};
exports.toQueryString = toQueryString;
var makeApi = function (config) {
    var api = function (endpoint, method, body, options) {
        var url = "".concat((options === null || options === void 0 ? void 0 : options.isExternal) ? "" : "".concat(config.apiUrl, "/")).concat(endpoint);
        var fullUrl = method === "GET" ? url + (0, exports.toQueryString)(body) : url;
        // console.log({ fullUrl });
        return fetch(fullUrl, {
            method: method,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: method === "POST" ? JSON.stringify(body) : undefined,
        })
            .then(function (response) { return response.json(); })
            .then(function (response) {
            return response;
        })
            .catch(function (error) {
            console.warn(error);
            return {
                success: false,
                response: "The API didn't resolve: " + error, //error + error.status +
            };
        });
    };
    return api;
};
exports.makeApi = makeApi;
//# sourceMappingURL=API.js.map