import { Markdown } from "sensible-files";

import { DefaultResponse, Endpoint, PublicConstantsType } from "../types";
import {
  App,
  CoreResponse,
  Cron,
  EndpointExample,
  ErrorResponse,
  FrontendFile,
  Menu,
  RecentType,
  TypeExample,
} from "./types";

export interface RecentEndpoint extends Endpoint {
  method: "GET";
  body: {
    /**
     * path to the endpoint
     */
    endpoint: string;
  };
  response: {
    success: boolean;
    response: string;
    recent?: RecentType[];
  };
}

export interface CoreEndpoint extends Endpoint {
  method: "GET";
  body: {
    /**
     * definition identifier (type interface name) of model, type or endpoint (optional)
     */
    definition?: string;
  };
  response: CoreResponse;
}

/**
 * returns 1 document in md
 */
export interface DocEndpoint extends Endpoint {
  method: "GET";
  body: {
    /**
     * framework, package, or app slug that you want to get the docs from
     */
    slug: string;
    pathToDoc?: string;
  };
  response: DefaultResponse & {
    doc?: Markdown;
  };
}

/**
 * returns menu for documents
 */
export interface DocsEndpoint extends Endpoint {
  method: "GET";
  body: {
    /**
     * framework, package, or app slug that you want to get the docs from
     */
    slug: string;
  };
  response: Menu;
}

export interface ExamplesEndpoint extends Endpoint {
  method: "GET";
  body: {
    /**
     * model,type,endpoint definition identifier (type interface name) that you want to get the examples
     */
    slug: string;
  };
  response: DefaultResponse & {
    typeExamples: TypeExample[];
    endpointExamples: EndpointExample[];
  };
}

export interface ErrorsEndpoint extends Endpoint {
  method: "GET";
  body: {
    /**
     * frontend app or server
     */
    app: string;
    /**
     * only does something on server (yet, also optional there, just if you want only errors of a specific endpoint)
     */
    endpoint?: string;
  };
  response: ErrorResponse;
}

/**
 * gets info about apps or packages
 */
export interface AppsEndpoint extends Endpoint {
  method: "GET";
  body: {
    /**
     * folder name of the app. if not provided, resturns all apps
     */
    app?: string;
  };
  response: DefaultResponse & {
    apps: {
      [key: string]: App;
    };
  };
}

export interface UiEndpoint extends Endpoint {
  method: "GET";
  body: {
    /**
     * folder name of the app or shared ui package. if not provided, resturns all apps
     */
    appFolderPath?: string;
  };
  response: DefaultResponse & {
    frontendFiles: {
      [path: string]: FrontendFile;
    };
  };
}

export interface OtherEndpoint extends Endpoint {
  method: "GET";
  body: {};
  response: DefaultResponse & {
    constants?: PublicConstantsType;
    crons: Cron[];
  };
}

export interface SensibleEndpoints {
  "sensible/core": CoreEndpoint;
  "sensible/other": OtherEndpoint;
  "sensible/ui": UiEndpoint;
  "sensible/apps": AppsEndpoint;
  "sensible/recent": RecentEndpoint;
  "sensible/errors": ErrorsEndpoint;
  "sensible/examples": ExamplesEndpoint;
  "sensible/doc": DocEndpoint;
  "sensible/docs": DocsEndpoint;
}
