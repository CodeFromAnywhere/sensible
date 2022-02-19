import * as TJS from "typescript-json-schema";

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

export const isDocs = (docs: Docs | null): docs is Docs => {
  return !!docs?.schema && !!docs?.response && docs?.success;
};

export const getDocs = (docsQuery: any): Docs | null => {
  return isDocs(docsQuery.data) ? docsQuery.data : null;
};

export const getDefinition = (
  definitionOrBooleanOrUndefined: TJS.DefinitionOrBoolean | undefined
) => {
  const type = typeof definitionOrBooleanOrUndefined;
  return typeof definitionOrBooleanOrUndefined === "object"
    ? definitionOrBooleanOrUndefined
    : null;
};
