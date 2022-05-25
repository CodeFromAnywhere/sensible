import { publicUserFields } from "core";
import { makeEndpoint } from "../makeEndpoint";
import User from "./model";

module.exports = [
  makeEndpoint("signup", "POST", async (ctx) => {
    const { email, subscribeToNewsletter } = ctx.body;

    const user = await User.create({
      email,
      password: "hello",
      loginToken: String(Math.round(Math.random() * 99999999999999)),
    });

    //todo: create and send password to the users email

    const success = !!user;

    return {
      response: success ? "Signed up" : "Something went wrong",
      success,
    };
  }),

  makeEndpoint("login", "POST", async (ctx) => {
    const { email, password } = ctx.body;

    const user = await User.findOne({ where: { email, password } });

    const success = !!user;

    return {
      response: success ? "Logged in" : "Email/password incorrect",
      success,
      loginToken: user?.loginToken,
    };
  }),

  makeEndpoint("users", "GET", async (ctx) => {
    const users = await User.findAll({
      where: {},
      attributes: publicUserFields,
    });

    return {
      success: true,
      users,
    };
  }),
];
