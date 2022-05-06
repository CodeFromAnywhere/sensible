import { makeEndpoint } from "../makeEndpoint";
import User from "./model";

module.exports = [
  makeEndpoint("requestAccess", "POST", async (ctx) => {
    const { email } = ctx.body;

    const user = await User.create({ email });

    if (!user) {
      return {
        response: "Something went wrong",
        success: false,
      };
    }

    return {
      response: "You can get it for free on GitHub, but thanks for your email!",
      success: true,
    };
  }),
];
