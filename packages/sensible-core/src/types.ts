import { SensibleEndpoints } from "./Sensible/endpoints";
export * from "./Sensible/types";
export * from "./Sensible/endpoints";
export interface Link {
  label: string;
  url: string;
}

export interface PublicConstantsType {
  appName: string;
  email: string;
  /**
   * can probably remove this and declare this in the homepage of package.json of the actual frontend
   */
  domain: string;
  links?: Link[];
}

export type Endpoint = {
  /**
   * api path to endpoint (can contain '/')
   */
  path: string;
  /**
   * SOCKET and SUB aren't supported yet
   */
  method: "GET" | "POST" | "DELETE" | "SOCKET" | "SUB";
  body: object;
  response: object;
};

export type API<TAllEndpoints extends unknown> = <
  TEndpoint extends keyof TAllEndpoints
>(
  endpoint: TEndpoint,
  method: TAllEndpoints[TEndpoint] extends Endpoint
    ? TAllEndpoints[TEndpoint]["method"]
    : never,
  body?: TAllEndpoints[TEndpoint] extends Endpoint
    ? TAllEndpoints[TEndpoint]["body"]
    : never,
  options?: {
    isExternal?: boolean;
  }
) => Promise<
  TAllEndpoints[TEndpoint] extends Endpoint
    ? TAllEndpoints[TEndpoint]["response"]
    : never
>;

/**
 * whenever something fails, this is the recommended response.
 * Whenever something succeeds, you can either return this or success:true + some data
 */
export interface DefaultResponse {
  /**
   * a boolean indicating whether the intended action succeeded
   */
  success: boolean;
  /**
   * a boolean indicating there's an error and something is wrong, either on the server or on the frontend.
   */
  error?: boolean;
  /**
   * A message indicating the reason of failure (optionally this can be shown to the user)
   */
  response: string;
}

export interface DefaultModelType {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface AllSensibleEndpoints extends SensibleEndpoints {}
