"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shuffleArray = exports.generatePassword = exports.makeArrayString = exports.isEmail = exports.mergeObjectsArray = exports.slugify2 = exports.earthDistance = exports.uuid = exports.notEmpty = void 0;
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
function earthDistance(lat1, long1, lat2, long2, response) {
    const m = Math.PI / 180;
    lat1 = lat1 * m;
    long1 = long1 * m;
    lat2 = lat2 * m;
    long2 = long2 * m;
    var R = 6371e3; // metres of earth radius
    var x = (long2 - long1) * Math.cos((lat1 + lat2) / 2);
    var y = lat2 - lat1;
    var d = Math.sqrt(x * x + y * y) * R;
    return response === "m" ? Math.round(d / 10) * 10 : Math.round(d / 1000); //in kilometers!
}
exports.earthDistance = earthDistance;
function slugify2(string) {
    const a = "àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìıİłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;";
    const b = "aaaaaaaaaacccddeeeeeeeegghiiiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------";
    const p = new RegExp(a.split("").join("|"), "g");
    return string
        .toString()
        .toLowerCase()
        .replace(/\s+/g, "-") // Replace spaces with -
        .replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special characters
        .replace(/&/g, "-and-") // Replace & with 'and'
        .replace(/[^\w\-]+/g, "") // Remove all non-word characters
        .replace(/\-\-+/g, "-") // Replace multiple - with single -
        .replace(/^-+/, "") // Trim - from start of text
        .replace(/-+$/, ""); // Trim - from end of text
}
exports.slugify2 = slugify2;
const mergeObjectsArray = (objectsArray) => objectsArray.reduce((previous, current) => {
    return { ...previous, ...current };
}, {});
exports.mergeObjectsArray = mergeObjectsArray;
function isEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
exports.isEmail = isEmail;
const makeArrayString = (array) => "," + array.join(",") + ",";
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
