/**
 * This file was auto-generated using the Sensible Boilerplate Creator (npx create-sensible-app).
 * You can edit it in what ever way you see fit.
 */

import dotenv from "dotenv";
import { importFromFiles,findFiles } from "sensible-files";
dotenv.config();
import { Sequelize } from "sequelize-typescript";

export const getAllModels = () => {
  return importFromFiles({
    files: findFiles("model", __dirname).map((x) => x.path),
    guard: (moduleExports) => typeof moduleExports === "function",
  });
};

export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "db.sqlite",
  models: getAllModels(),
  benchmark: false,
  logQueryParameters: false,
  logging: (sql, timing) => {
    if (timing && timing > 200) {
      console.log(sql, timing);
    }
  },
});

export const syncModels = async () => {
  try {
    const alter = true;
    console.log(`Syncing db (alter: ${alter})`);
    await sequelize.authenticate();
    await sequelize.sync({
      // logging: console.log,
      alter,
    });
    console.log("Synced");
  } catch (e) {
    console.log("e", e);
  }
};
