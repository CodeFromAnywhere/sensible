import { publicUserFields } from "core";
import { makeEndpoint } from "../makeEndpoint";
import User from "../User/model";
import Message from "./model";

module.exports = [
  makeEndpoint("message", "POST", async (ctx) => {
    const { loginToken, message } = ctx.body;

    const user = await User.findOne({ where: { loginToken } });

    if (!user) {
      return { success: false, response: "Unauthorized" };
    }

    const created = await Message.create({ message, userId: user.id });

    const success = !!created;

    return {
      success,
      response: success ? "Message created" : "Something went wrong",
    };
  }),

  makeEndpoint("messages", "GET", async (ctx) => {
    const messages = await Message.findAll({
      where: {},
      include: { model: User, attributes: publicUserFields },
    });

    const success = true;

    return {
      success,
      messages,
    };
  }),
];
