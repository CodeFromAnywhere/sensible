/**
 * This file was auto-generated using the Sensible Boilerplate Creator (npx create-sensible-app).
 * You can edit it in what ever way you see fit.
 */

import dotenv from "dotenv";
dotenv.config();
import server from "server";
import { getAllEndpoints } from "./server";
import { syncModels } from "./db";

type SenseConfig = {};

const makeSense = (config?: SenseConfig) => {
  const customPort = Number(process.env.PORT);
  const port = !isNaN(customPort) ? customPort : 4000;

  // /** SYNC ALL MODELS  */
  syncModels();

  const { header } = server.reply; // OR server.reply;

  const cors = [
    (ctx) => header("Access-Control-Allow-Origin", "*"),
    (ctx) =>
      header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      ),
    (ctx) =>
      header(
        "Access-Control-Allow-Methods",
        "GET, PUT, PATCH, POST, DELETE, HEAD"
      ),
    (ctx) => (ctx.method.toLowerCase() === "options" ? 200 : false),
  ];
  // @ts-ignore
  server(
    {
      port,
      public: "public",
      security: {
        csrf: false,
      },
    },
    cors,
    getAllEndpoints()
  ).then((context) => {
    console.log(`Running on port`, port);
  });
};

makeSense();
