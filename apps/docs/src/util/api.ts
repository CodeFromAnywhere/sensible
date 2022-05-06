import { AllEndpoints } from "core";
import { makeApi } from "sensible-core";
import { NO_API_SELECTED } from "../constants";

/**
 * we need a different way to get the api here,
 * since we are using the URL to get the endpoint instead of the env files.
 *
 * possibilities queryUrl: localhost:4xxx, sensible, apidomain.com
 *
 * NB: if localhost ever changes their protocol or there will be a successor of https,
 * we need to make sure that we don't hardcode the protocols!
 */
export const api = (queryUrl: string) => {
  const isSensibleOnly = NO_API_SELECTED.slug === queryUrl;
  const isLocalhost = queryUrl.startsWith("localhost:");

  const apiUrl = isSensibleOnly
    ? undefined
    : isLocalhost
    ? `http://${queryUrl}`
    : `https://${queryUrl}`;

  console.log({ apiUrl });
  return apiUrl ? makeApi<AllEndpoints>({ apiUrl }) : undefined;
};
