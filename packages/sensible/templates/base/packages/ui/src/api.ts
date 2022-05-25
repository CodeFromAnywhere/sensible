import { AllEndpoints } from "core";
import { makeApi } from "sensible-core";
import { apiUrl } from "./util/apiUrl";
export const api = makeApi<AllEndpoints>({ apiUrl });
