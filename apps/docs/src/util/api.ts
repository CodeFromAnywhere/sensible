import { AllEndpoints } from "core";
import { makeApi } from "sensible-core";
import { NO_API_SELECTED } from "../constants";

/**
 * we need a different way to get the api here,
 * since we are using the URL to get the endpoint instead of the env files.
 */
export const api = (apiUrl: string) =>
  NO_API_SELECTED.slug !== apiUrl
    ? makeApi<AllEndpoints>({ apiUrl })
    : undefined;
