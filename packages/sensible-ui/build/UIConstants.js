"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UIConstants = void 0;
var react_with_native_env_1 = require("react-with-native-env");
/**
 * put an .env in your root folder of your frontend project that looks like this:

API_ENV=PROD_API
PROD_AP=https://yourapi.yourdomain.com
STAGING_API=https://yourapi2.yourdomain.com
LOCAL_API=http://localhost:4000

 */
var apiEnv = (0, react_with_native_env_1.getEnv)("API_ENV");
if (!apiEnv) {
    console.warn("No API_ENV given");
}
exports.UIConstants = {
    API_URL: apiEnv ? (0, react_with_native_env_1.getEnv)(apiEnv) : undefined,
};
//# sourceMappingURL=UIConstants.js.map