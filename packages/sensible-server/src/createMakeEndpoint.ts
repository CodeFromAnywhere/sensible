import { Endpoint } from "sensible-core";
import server from "server";
import { ServerEndpoint } from "./types";

export const typeIsValid = (
  body: any,
  type: any
): true | { invalidParams: string[]; invalidBody: string[] } => {
  return true;
};

export const createMakeEndpoint = <TAllEndpoints extends unknown>() => {
  return <TEndpoint extends keyof TAllEndpoints>(
    path: TEndpoint,
    method: TAllEndpoints[TEndpoint] extends Endpoint
      ? TAllEndpoints[TEndpoint]["method"]
      : never,
    endpoint: ServerEndpoint<
      TAllEndpoints[TEndpoint] extends Endpoint
        ? TAllEndpoints[TEndpoint]
        : never
    >
  ) => {
    const callMethod = method === "GET" ? "get" : "post";

    return server.router[callMethod](`/${path}`, (ctx) => {
      const body: TAllEndpoints[TEndpoint] extends Endpoint
        ? TAllEndpoints[TEndpoint]["body"]
        : never = method === "POST" ? ctx.data : ctx.query;
      const extendedCtx = { ...ctx, body };

      if (!typeIsValid(body, null)) {
        return {
          response: "Body is invalid",
          success: false,
        };
      }

      return endpoint(extendedCtx);
    });
  };
};
