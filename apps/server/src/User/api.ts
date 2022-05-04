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

  makeEndpoint("me", "GET", async (ctx) => {
    const { loginToken } = ctx.body;

    const user = await User.findOne({ where: { loginToken } });

    if (!user) {
      return { response: "Couldn't find user", success: false };
    }

    const success = false;
    return { response: success ? "Inserted" : "Insertion failed", success };
  }),
];
