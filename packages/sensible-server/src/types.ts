import { Context } from "./server.types";
import { Endpoint, InterpretableTypes } from "sensible-core";
import { Middleware } from "server/typings/common";
import { Path } from "sensible-files";

export type Keys<TObject> = Extract<keyof TObject, string>;

export type WithDataValues<TModel> = TModel & { dataValues: TModel };

export type ServerEndpoint<TEndpoint extends Endpoint> = (
  ctx: Context & { body: TEndpoint["body"] }
) => Promise<TEndpoint["response"]>;

export interface ExtendedContext<TBody extends object> extends Context {
  body: TBody;
}

export type CreateMakeEndpointType = <
  TAllEndpoints extends { [key in Keys<TAllEndpoints>]: Endpoint }
>(
  interpretableTypes: InterpretableTypes,
  schemasFolderPath: Path
) => MakeEndpointType<TAllEndpoints>;

export type MakeEndpointType<
  TAllEndpoints extends { [key in Keys<TAllEndpoints>]: Endpoint }
> = <TEndpoint extends Keys<TAllEndpoints>>(
  path: TEndpoint,
  method: TAllEndpoints[TEndpoint]["method"],
  endpoint: EndpointFunctionType<TEndpoint, TAllEndpoints>
) => Middleware;

export type EndpointFunctionType<
  TEndpoint extends Keys<TAllEndpoints>,
  TAllEndpoints extends { [key in Keys<TAllEndpoints>]: Endpoint }
> = (
  ctx: ExtendedContext<TAllEndpoints[TEndpoint]["body"]>
) => Promise<TAllEndpoints[TEndpoint]["response"]>;
