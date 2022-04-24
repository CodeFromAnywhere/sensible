/**
 * This file was auto-generated using the Sensible Boilerplate Creator (npx create-sensible-app).
 * You can edit it in what ever way you see fit.
 */

import { PublicConstants } from "core";

const env = process.env as { [key: string]: string };

const { DOMAIN, NODE_ENV, ADMIN_PASSWORD } = env;

const Constants = {
  ...PublicConstants,
  DOMAIN,
  NODE_ENV,
  ADMIN_PASSWORD,
};

export default Constants;
