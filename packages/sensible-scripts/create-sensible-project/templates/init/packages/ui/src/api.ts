import { AllEndpoints } from "core";
import { makeApi } from "sensible-ui";
import env from "../env.json";
import { isDev } from "./isDev";
const { localServer, remoteServer, runLocalServer } = env;
const apiUrl = isDev && runLocalServer ? localServer : remoteServer;

export const api = makeApi<AllEndpoints>({ apiUrl });
