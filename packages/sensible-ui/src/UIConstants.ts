import { getEnv } from "react-with-native-env";

/**
 * put an .env in your root folder of your frontend project that looks like this:

API_ENV=PROD_API
PROD_AP=https://yourapi.yourdomain.com
STAGING_API=https://yourapi2.yourdomain.com
LOCAL_API=http://localhost:4000

 */

const apiEnv = getEnv("API_ENV");

if (!apiEnv) {
  console.warn("No API_ENV given");
}
export const UIConstants = {
  API_URL: apiEnv ? getEnv(apiEnv) : undefined,
};
