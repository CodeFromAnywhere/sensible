import { UIConstants } from "./UIConstants";
import { API } from "sensible-core";

const isValidEntry = ([_, value]: [key: string, value: any]) =>
  value !== undefined && value !== "" && value !== null;

export const toQueryString = (query?: any) => {
  const hasQuery =
    query && Object.entries(query)?.filter(isValidEntry).length > 0;
  return hasQuery
    ? "?" +
        Object.entries(query)
          .filter(isValidEntry)
          .map(([key, value]) => {
            return `${key}=${value}`;
          })
          .join("&")
    : "";
};
//NB: doesn't work in node.

export const makeApi = <TAllEndpoints extends unknown>() => {
  const api: API<TAllEndpoints> = (endpoint, method, body, options) => {
    const url = `${
      options?.isExternal ? "" : `${UIConstants.API_URL}/`
    }${endpoint}`;

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
