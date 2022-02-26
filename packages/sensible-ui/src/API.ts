import { API } from "sensible-core";

const isValidEntry = ([_, value]: [key: string, value: any]) =>
  value !== undefined && value !== "" && value !== null;

export const bodyFromQueryString = (
  /**
   * format: x=x&y=y&z=z
   */
  query?: string
): { [key: string]: string } | undefined => {
  const kv = query
    ?.split("&")
    ?.map((x) => ({ [x.split("=")[0]]: x.split("=")[1] }));

  const all = kv?.reduce((object, current) => {
    return { ...object, ...current };
  }, {});

  return all;
};

export const toQueryString = (query?: any) => {
  const hasQuery =
    query && Object.entries(query)?.filter(isValidEntry).length > 0;
  return hasQuery
    ? "?" +
        Object.entries(query)
          .filter(isValidEntry)
          .map(([key, value]) => {
            const encodedValue = encodeURIComponent(String(value));
            return `${key}=${encodedValue}`;
          })
          .join("&")
    : "";
};
//NB: doesn't work in node.

type Config = {
  apiUrl: string;
};

export const makeApi = <TAllEndpoints extends unknown>(config: Config) => {
  const api: API<TAllEndpoints> = (endpoint, method, body, options) => {
    const url = `${options?.isExternal ? "" : `${config.apiUrl}/`}${endpoint}`;

    const fullUrl = method === "GET" ? url + toQueryString(body) : url;
    // console.log({ fullUrl });
    return fetch(fullUrl, {
      method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: method === "POST" ? JSON.stringify(body) : undefined,
    })
      .then((response) => response.json())
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.warn(error);
        return {
          success: false,
          response: "The API didn't resolve: " + error, //error + error.status +
        };
      });
  };
  return api;
};
