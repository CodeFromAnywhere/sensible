import * as TJS from "typescript-json-schema";
import TypeDefinition from "./components/TypeDefinition";

export type Method = "GET" | "POST";

export type EndpointExample = {
  type: "endpoint";
  path: `${Method}:${string}`;
  id: number;
  body: object;
  response: object;
};

export type TypeExample = {
  type: "type";
  typeInterfaceName: string;
  value: any;
};

export type DefinitionObject = {
  [key: string]: TJS.DefinitionOrBoolean;
};

export type RootModel = "root";

export type ModelSchemaObject = {
  [key: string | RootModel]: {
    endpoints?: DefinitionObject;
    types?: DefinitionObject;
    examples: (EndpointExample | TypeExample)[];
  };
};

export type Docs = {
  constants: { [key: string]: any };
  schema?: ModelSchemaObject;
  success: boolean;
  response: string;
};

export type EndpointDefinition = TJS.Definition & {
  properties: {
    method: TJS.Definition;
    path: TJS.Definition;
    body: TJS.Definition;
    reponse: TJS.Definition;
  };
};

export type DocsResult =
  | Docs
  | {
      success: false;
      error: boolean;
      response: string;
    }
  | undefined;
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
export const isDocs = (docs: any): docs is Docs => {
  return docs?.schema && !!docs?.response && docs?.success ? true : false;
};

export const getDocs = (docsQuery: any): Docs | null => {
  return isDocs(docsQuery?.data) ? docsQuery.data : null;
};

export const getDefinition = (
  definitionOrBooleanOrUndefined: TJS.DefinitionOrBoolean | undefined
) => {
  return typeof definitionOrBooleanOrUndefined === "object"
    ? definitionOrBooleanOrUndefined
    : null;
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
