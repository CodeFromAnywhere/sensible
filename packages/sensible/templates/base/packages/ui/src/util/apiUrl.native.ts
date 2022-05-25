import env from "../../env.json";
import { isDev } from "./isDev";
const { localIpServer, remoteServer, runLocalServer } = env;
export const apiUrl = isDev && runLocalServer ? localIpServer : remoteServer;
