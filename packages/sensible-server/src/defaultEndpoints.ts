import { Endpoint } from "sensible-core";
import { createMakeEndpoint } from "./createMakeEndpoint";

interface DocsEndpoint extends Endpoint {
  method: "GET";
  body: {};
  response: {
    endpoints: Endpoint[];
    models: object[];
    success: boolean;
    response: string;
  };
}

interface RecentEndpoint extends Endpoint {
  method: "GET";
  body: {};
  response: {
    success: boolean;
    response: string;
    recent?: (Endpoint & {
      endpoint: string;
    })[];
  };
}

interface DefaultEndpoints {
  docs: DocsEndpoint;
  recent: RecentEndpoint;
}

const makeEndpoint = createMakeEndpoint<DefaultEndpoints>();

export const defaultEndpoints = [
  makeEndpoint("docs", "GET", async (ctx) => {
    const endpoints: Endpoint[] = [];
    const models: object[] = [];

    return {
      endpoints,
      models,
      success: false,
      response: "Not implemented yet",
    };
  }),

  makeEndpoint("recent", "GET", async (ctx) => {
    return { success: false, response: "Not implemented yet", recent: [] };
  }),
];
