import { Context } from "./server.types";
import { Endpoint } from "sensible-core";
export declare type WithDataValues<TModel> = TModel & {
    dataValues: TModel;
};
export declare type ServerEndpoint<TEndpoint extends Endpoint> = (ctx: Context & {
    body: TEndpoint["body"];
}) => Promise<TEndpoint["response"]>;
//# sourceMappingURL=types.d.ts.map