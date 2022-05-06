import { useQuery } from "react-query";
import { CoreResponse, OtherEndpoint } from "sensible-core";
import { api } from "ui";
import { useSiteParams } from "./useSiteParams";

export const useCoreQuery = () => {
  const { urlUrl } = useSiteParams();

  return useQuery<CoreResponse, string>(
    ["core", urlUrl],

    async () => {
      const url = urlUrl && `${urlUrl}/sensible/core`;

      if (url) {
        return api("sensible/core", "GET");
      } else {
        throw new Error("Couldn't find api string");
      }
    },

    {
      enabled: !!urlUrl,
    }
  );
};

export const useOtherQuery = () => {
  const { urlUrl } = useSiteParams();

  return useQuery<OtherEndpoint["response"], string>(
    ["other", urlUrl],

    async () => {
      const endpoint = "sensible/other";
      const url = urlUrl && `${urlUrl}${endpoint}`;

      if (url) {
        return api(endpoint, "GET");
      } else {
        throw new Error("Couldn't find api string");
      }
    },

    {
      enabled: !!urlUrl,
    }
  );
};
