import { AllEndpoints } from "core";
import { makeApi } from "sensible-core";
import env from "../env.json";
import { isDev } from "./util/isDev";
const { localServer, remoteServer, runLocalServer } = env;
const apiUrl = isDev && runLocalServer ? localServer : remoteServer;

export const api = makeApi<AllEndpoints>({ apiUrl });
