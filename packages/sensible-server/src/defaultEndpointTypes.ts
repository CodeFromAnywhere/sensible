import { Endpoint } from "sensible-core";
import * as TJS from "typescript-json-schema";

export interface DocsEndpoint extends Endpoint {
  method: "GET";
  body: {};
  response: {
    endpoints?: {
      name: string;
      definition: TJS.DefinitionOrBoolean;
    }[];
    models?: {
      name: string;
      definition: TJS.DefinitionOrBoolean;
    }[];
    other?: {
      name: string;
      definition: TJS.DefinitionOrBoolean;
    }[];
    success: boolean;
    response: string;
  };
}

export interface RecentEndpoint extends Endpoint {
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

export interface AnyEndpoint extends Endpoint {
  method: "GET";
  body: {};
  response: {
    success: boolean;
    response: string;
  };
}

export interface DefaultEndpoints {
  "sensible/docs": DocsEndpoint;
  "sensible/recent": RecentEndpoint;
  //"*": AnyEndpoint;
}

export interface AllEndpoints extends DefaultEndpoints {}
