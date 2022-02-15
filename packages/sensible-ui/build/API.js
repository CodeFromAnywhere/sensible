"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeApi = exports.toQueryString = void 0;
var UIConstants_1 = require("./UIConstants");
var isValidEntry = function (_a) {
    var _ = _a[0], value = _a[1];
    return value !== undefined && value !== "" && value !== null;
};
var toQueryString = function (query) {
    var _a;
    var hasQuery = query && ((_a = Object.entries(query)) === null || _a === void 0 ? void 0 : _a.filter(isValidEntry).length) > 0;
    return hasQuery
        ? "?" +
            Object.entries(query)
                .filter(isValidEntry)
                .map(function (_a) {
                var key = _a[0], value = _a[1];
                return "".concat(key, "=").concat(value);
            })
                .join("&")
        : "";
};
exports.toQueryString = toQueryString;
//NB: doesn't work in node.
var makeApi = function () {
    var api = function (endpoint, method, body, options) {
        var url = "".concat((options === null || options === void 0 ? void 0 : options.isExternal) ? "" : "".concat(UIConstants_1.UIConstants.API_URL, "/")).concat(endpoint);
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