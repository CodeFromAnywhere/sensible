import { Context } from "./server.types";
import { Endpoint } from "sensible-core";

export type WithDataValues<TModel> = TModel & { dataValues: TModel };

export type ServerEndpoint<TEndpoint extends Endpoint> = (
  ctx: Context & { body: TEndpoint["body"] }
) => Promise<TEndpoint["response"]>;
