import { resolve } from "path";
import { onlyUnique, InterpretableTypes } from "sensible-core";
import { findFiles } from "sensible-server";

// the next line resolves the address of the core folder. We know this is there because of the sensible convention
const basePath = resolve("../../packages/core/src");
const sensibleServerBasePath = resolve("../../node_modules/sensible-core/src");
export const endpoints = findFiles("endpoint", basePath).concat(
  findFiles("endpoint", sensibleServerBasePath)
);

export const types = findFiles("type", basePath).concat(
  findFiles("type", sensibleServerBasePath)
);
export const endpointExamples = findFiles("endpoint.example", basePath);
export const typeExamples = findFiles("type.example", basePath);

const relativeFolders = endpoints
  .concat(types)
  .concat(endpointExamples)
  .concat(typeExamples)
  .map((folderPath) => folderPath.relativeFolder || "other");
const uniqueRelativeFolders = relativeFolders.filter(onlyUnique);

const initialInterpretableTypes: InterpretableTypes = {};

export const interpretableTypes = uniqueRelativeFolders.reduce((all, key) => {
  return {
    ...all,
    [key]: {
      endpoints: endpoints
        .filter((folderPath) => folderPath.relativeFolder === key)
        .map((x) => x.path),
      types: types
        .filter((folderPath) => folderPath.relativeFolder === key)
        .map((x) => x.path),
      endpointExamples: endpointExamples
        .filter((folderPath) => folderPath.relativeFolder === key)
        .map((x) => x.path),
      typeExamples: typeExamples
        .filter((folderPath) => folderPath.relativeFolder === key)
        .map((x) => x.path),
    },
  };
}, initialInterpretableTypes);
