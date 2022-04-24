/**
 * This file was auto-generated using the Sensible Boilerplate Creator (npx create-sensible-app).
 * You can edit it in what ever way you see fit.
 */
import path from "path";
import { createMakeEndpoint } from "sensible-server";
import { AllEndpoints } from "core";
import { interpretableTypes } from "./typeFiles";

const schemasFolderPath = path.join(__dirname, "..", "schemas");
export const makeEndpoint = createMakeEndpoint<AllEndpoints>(
  interpretableTypes,
  schemasFolderPath
);
