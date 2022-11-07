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
exports.makeApi = exports.toQueryString = exports.bodyFromQueryString = exports.shuffleArray = exports.generatePassword = exports.makeArrayString = exports.isEmail = exports.mergeObjectsArray = exports.slugify = exports.earthDistance = exports.createEnum = exports.uuid = exports.notEmpty = exports.objectMap = exports.mapOrRemove = exports.onlyUnique = void 0;
function onlyUnique(value, index, self) {
    return self.findIndex(function (_, i) { return i === index; }) === index;
}
exports.onlyUnique = onlyUnique;
/** general purpose function that maps over an array and only returns it as part of the mapped array if the result is truthy */
var mapOrRemove = function (array, mapFn) {
    var initialReturnArray = [];
    return array.reduce(function (all, item) {
        var mappedItem = mapFn(item);
        if (mappedItem) {
            all.push(mappedItem);
        }
        return all;
    }, initialReturnArray);
};
exports.mapOrRemove = mapOrRemove;
function objectMap(object, mapFn) {
    return Object.keys(object).reduce(function (result, key) {
        result[key] = mapFn(object[key], key);
        return result;
    }, {});
}
exports.objectMap = objectMap;
/**
 * Removes empty values (null or undefined) from your arrays in a type-safe way
 */
function notEmpty(value) {
    return value !== null && value !== undefined;
}
exports.notEmpty = notEmpty;
function uuid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0, v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}
exports.uuid = uuid;
/**
 * creates an enum object from a readonly const array so you don't have to
 * ------
 * const taskNames = ["a","b","c"] as const;
 * type TaskNames = typeof taskNames[number];
 * const enummm = createEnum(taskNames);
 * (value of enummm: { a: "a", b: "b", c: "c" })
 */
var createEnum = function (array) {
    return array.reduce(function (previous, current) {
        var _a;
        return __assign(__assign({}, previous), (_a = {}, _a[current] = current, _a));
    }, {});
};
exports.createEnum = createEnum;
/**
 * returns the distance between two places (not very precise but it's very efficient)
 */
function earthDistance(lat1, long1, lat2, long2, response) {
    var m = Math.PI / 180;
    lat1 = lat1 * m;
    long1 = long1 * m;
    lat2 = lat2 * m;
    long2 = long2 * m;
    var R = 6371e3; // metres of earth radius
    var x = (long2 - long1) * Math.cos((lat1 + lat2) / 2);
    var y = lat2 - lat1;
    var d = Math.sqrt(x * x + y * y) * R;
    return response === "m" ? Math.round(d / 10) * 10 : Math.round(d / 1000);
}
exports.earthDistance = earthDistance;
function slugify(string) {
    var a = "àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìıİłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;";
    var b = "aaaaaaaaaacccddeeeeeeeegghiiiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------";
    var p = new RegExp(a.split("").join("|"), "g");
    return string
        .toString()
        .toLowerCase()
        .replace(/\s+/g, "-") // Replace spaces with -
        .replace(p, function (c) { return b.charAt(a.indexOf(c)); }) // Replace special characters
        .replace(/&/g, "-and-") // Replace & with 'and'
        .replace(/[^\w\-]+/g, "") // Remove all non-word characters
        .replace(/\-\-+/g, "-") // Replace multiple - with single -
        .replace(/^-+/, "") // Trim - from start of text
        .replace(/-+$/, ""); // Trim - from end of text
}
exports.slugify = slugify;
var mergeObjectsArray = function (objectsArray) {
    return objectsArray.reduce(function (previous, current) {
        return __assign(__assign({}, previous), current);
    }, {});
};
exports.mergeObjectsArray = mergeObjectsArray;
function isEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
exports.isEmail = isEmail;
var makeArrayString = function (array) { return "," + array.join(",") + ","; };
exports.makeArrayString = makeArrayString;
function generatePassword(passwordLength) {
    var numberChars = "0123456789";
    var upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var lowerChars = "abcdefghijklmnopqrstuvwxyz";
    var allChars = numberChars + upperChars + lowerChars;
    var randPasswordArray = Array(passwordLength);
    randPasswordArray[0] = numberChars;
    randPasswordArray[1] = upperChars;
    randPasswordArray[2] = lowerChars;
    randPasswordArray = randPasswordArray.fill(allChars, 3);
    return shuffleArray(randPasswordArray.map(function (x) {
        return x[Math.floor(Math.random() * x.length)];
    })).join("");
}
exports.generatePassword = generatePassword;
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}
exports.shuffleArray = shuffleArray;
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
                error: true,
                response: "The API didn't resolve: " + error, //error + error.status +
            };
        });
    };
    return api;
};
exports.makeApi = makeApi;
//# sourceMappingURL=util.js.map