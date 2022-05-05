import { useQuery } from "react-query";
import { DocsResult } from "../util";
import { useSiteParams } from "./useSiteParams";

export const useDocsQuery = () => {
  const { urlUrl } = useSiteParams();

  return useQuery<DocsResult, string>(
    ["docs", urlUrl],

    async () => {
      const url = urlUrl && `${urlUrl}/sensible/docs`;

      if (url) {
        return fetch(url, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((response) => {
            return response;
          })
          .catch((error) => {
            console.warn(error);
            return {
              success: false,
              error: true,
              response: "The API didn't resolve: " + error, //error + error.status +
            };
          });
      } else {
        throw new Error("Couldn't find api string");
      }
    },

    {
      enabled: !!urlUrl,
    }
  );
};
