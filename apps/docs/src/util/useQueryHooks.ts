import { useQuery } from "react-query";
import { useRouter } from "react-with-native-router";
import { CoreResponse, OtherEndpoint } from "sensible-core";
import { api } from "./api";
import { getQueryStrings } from "./util";

export const useCoreQuery = () => {
  const router = useRouter();
  const { url } = getQueryStrings(router.query);

  return useQuery<CoreResponse | undefined, string>(
    ["core", url],

    async () => {
      if (url) {
        return api(url)?.("sensible/core", "GET");
      } else {
        throw new Error("Couldn't find api string");
      }
    },

    {
      enabled: !!url,
    }
  );
};

export const useOtherQuery = () => {
  const router = useRouter();
  const { url } = getQueryStrings(router.query);

  return useQuery<OtherEndpoint["response"] | undefined, string>(
    ["other", url],

    async () => {
      if (url) {
        const result = await api(url)?.("sensible/other", "GET");

        if (result?.error) {
          throw new Error(result.response);
        }
        return result;
      } else {
        throw new Error("Couldn't find api string");
      }
    },

    {
      enabled: !!url,
    }
  );
};
