import { getEnv } from "react-with-native";

/**
 * put an .env in your root folder of your frontend project that looks like this:

API_ENV=PROD_API
PROD_AP=https://yourapi.yourdomain.com
STAGING_API=https://yourapi2.yourdomain.com
LOCAL_API=http://localhost:4000

 */
export const UIConstants = {
  API_URL: getEnv(getEnv("API_ENV")),
};
