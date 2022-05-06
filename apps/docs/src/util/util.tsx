import * as TJS from "typescript-json-schema";
import TypeDefinition from "../components/TypeDefinition";
import {
  DefinitionObject,
  DocsEndpoint,
  getDefinition,
  objectMap,
} from "sensible-core";
import { NextRouter } from "next/router";
export type Method = "GET" | "POST";

export type EndpointDefinition = TJS.Definition & {
  properties: {
    method: TJS.Definition;
    path: TJS.Definition;
    body: TJS.Definition;
    reponse: TJS.Definition;
  };
};

export const shallowPush = (
  { push, query }: NextRouter,
  queryKey: string,
  queryValue: string
) => {
  push({ query: { ...query, [queryKey]: queryValue } }, undefined, {
    shallow: true,
  });
};

export const getQueryStrings = (query: NextRouter["query"]) => {
  const queryStrings = objectMap(query, (arrayOrStringOrUndefined) =>
    Array.isArray(arrayOrStringOrUndefined)
      ? arrayOrStringOrUndefined[0]
      : arrayOrStringOrUndefined
  );

  return queryStrings;
};

export const isEndpoint = (
  definition: TJS.Definition | null
): definition is EndpointDefinition => {
  return definition?.properties?.method &&
    definition?.properties?.path &&
    definition?.properties?.body &&
    definition?.properties?.response
    ? true
    : false;
};

const isValidEntry = ([_, value]: [key: string, value: any]) =>
  value !== undefined && value !== "" && value !== null;

export const toQueryString = (query?: any) => {
  const hasQuery =
    query && Object.entries(query)?.filter(isValidEntry).length > 0;
  return hasQuery
    ? "?" +
        Object.entries(query)
          .filter(isValidEntry)
          .map(([key, value]) => {
            const encodedValue = encodeURIComponent(String(value));
            return `${key}=${encodedValue}`;
          })
          .join("&")
    : "";
};

export function notEmpty<TValue>(
  value: TValue | null | undefined
): value is TValue {
  return value !== null && value !== undefined;
}

export const getFirstEnum = (
  definition: TJS.Definition | null,
  key: string
): string | undefined =>
  getDefinition(definition?.properties?.[key])?.enum?.[0] as string | undefined;

export const getRefLink = (ref?: string) => {
  return ref?.split("/").pop();
};

type ArrayType = {
  definitionOrBoolean: TJS.DefinitionOrBoolean;
  allDefinitions: DefinitionObject;
  model: string;
  isElement: boolean;
};

type MultipleArraysType = {
  items: TJS.DefinitionOrBoolean | TJS.DefinitionOrBoolean[] | undefined;
  allDefinitions: DefinitionObject;
  model: string;
};

export const getOneArrayType = ({
  allDefinitions,
  definitionOrBoolean,
  isElement,
  model,
}: ArrayType) => {
  const definition = getDefinition(definitionOrBoolean);
  return isElement ? (
    <TypeDefinition
      model={model}
      allDefinitions={allDefinitions}
      definition={definition}
    />
  ) : (
    getTypeDefinitionString({ name: "", definition, allDefinitions, model })
  );
};
export const getArrayType = ({
  items,
  allDefinitions,
  model,
}: MultipleArraysType) => {
  return `${
    items && Array.isArray(items)
      ? items.map((item) =>
          getOneArrayType({
            allDefinitions,
            definitionOrBoolean: item,
            isElement: false,
            model,
          })
        )
      : items
      ? getOneArrayType({
          allDefinitions,
          definitionOrBoolean: items,
          isElement: false,
          model,
        })
      : ""
  }[]`;
};

export const getType = (
  definition: TJS.Definition | null,
  allDefinitions: DefinitionObject,
  model: string
) => {
  const items = definition?.items;
  if (!definition?.type) {
    return "";
  }

  const type = definition.enum?.length
    ? definition.enum.map((x) => `"${x}"`).join(" | ")
    : definition.type === "array"
    ? getArrayType({ allDefinitions, items, model })
    : Array.isArray(definition.type)
    ? definition.type.join(",")
    : definition.type;
  return type;
};

export const getTypeDefinitionString = ({
  name,
  definition,
  allDefinitions,
  model,
}: {
  name: string;
  definition: TJS.Definition | null;
  allDefinitions: DefinitionObject;
  model: string;
}): string => {
  const propertyKeys = definition?.properties
    ? Object.keys(definition.properties)
    : [];

  return definition?.type === "object"
    ? `interface ${name} {\n\t${propertyKeys
        .map((key) => {
          const propertyDefinition = getDefinition(
            definition?.properties?.[key]
          );
          return `${key}: ${getType(
            propertyDefinition,
            allDefinitions,
            model
          )}`;
        })
        .join(`\n\t`)}\n}`
    : getType(definition, allDefinitions, model);
};
