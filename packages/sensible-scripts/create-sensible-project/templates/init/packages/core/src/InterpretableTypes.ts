/**
 * Interpretable types are all types that metadata is going to built from (if that lib takes export * from syntax
 * We don't put generic types here as they are not supported.
 **/

export * from "./User/endpoints";
export * from "./User/types";

import { UserEndpoints } from "./User/endpoints";

export type AllEndpoints = UserEndpoints;
