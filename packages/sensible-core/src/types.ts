export type Endpoint = {
  method: "GET" | "POST"; //| "POST_MULTIPART", sockets also in the future.
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

export interface DefaultResponse {
  success: boolean;
  response: string;
}

export interface DefaultModelType {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}
