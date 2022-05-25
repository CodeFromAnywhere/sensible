/**
 * Interpretable types are all types that metadata is going to built from (if that lib takes export * from syntax
 * We don't put generic types here as they are not supported.
 **/

 export * from "./User/endpoints";
 export * from "./User/types";
 export * from "./Message/endpoints";
 export * from "./Message/types";
 
 import { UserEndpoints } from "./User/endpoints";
 import { MessageEndpoints } from "./Message/endpoints";
 
 export type AllEndpoints = UserEndpoints & MessageEndpoints;
 