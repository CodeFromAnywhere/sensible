/**
 * Define constants here that need to be available on the backend and frontend.
 */

import { PublicConstantsType } from "sensible-core";

const appName = "example";
const rawDomain = `${appName}.com`;
const domain = `https://${rawDomain}`;

export const PublicConstants: PublicConstantsType = {
  appName,
  domain,
  email: `noreply@${rawDomain}`,
  links: [{ label: "Website", url: domain }],
};
