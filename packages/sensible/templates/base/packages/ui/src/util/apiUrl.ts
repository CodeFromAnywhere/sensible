import env from "../../env.json";
import { isDev } from "./isDev";
const { localhostServer, remoteServer, runLocalServer } = env;
export const apiUrl = isDev && runLocalServer ? localhostServer : remoteServer;
