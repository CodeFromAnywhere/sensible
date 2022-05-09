import { makeEndpoint } from "../makeEndpoint";
import User from "./model";

module.exports = [
  makeEndpoint("signup", "POST", async (ctx) => {
    const { email } = ctx.body;

    const user = await User.create({ email });

    const success = !!user;

    return {
      response: success ? "Signed up" : "Something went wrong",
      success,
    };
  }),
];
