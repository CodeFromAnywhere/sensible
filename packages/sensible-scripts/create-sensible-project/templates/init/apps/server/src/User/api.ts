import { makeEndpoint } from "../makeEndpoint";
import User from "./model";

module.exports = [
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
