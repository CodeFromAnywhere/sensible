import { MiscEndpoints } from "./Misc/endpoints";
import { UserEndpoints } from "./User/endpoints";

export * from "./InterpretableTypes";
export * from "./CoreConstants";

export type AllEndpoints = UserEndpoints & MiscEndpoints;
