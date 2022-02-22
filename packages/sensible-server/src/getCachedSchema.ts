import { objectMap } from "sensible-core";
import * as TJS from "typescript-json-schema";
import {
  EndpointExample,
  isArrayGuard,
  ModelSchemaObject,
  TypeExample,
  InterpretableTypes,
  importFromFiles,
} from ".";

//just generate the schema once every server restart because there can't be any changes without the server restarting.
let cachedSchema: ModelSchemaObject | null = null;

export const getCachedSchema = (
  typeFilesObject: InterpretableTypes
): ModelSchemaObject => {
  if (cachedSchema) {
    return cachedSchema;
  }

  // optionally pass argument to schema generator
  const settings: TJS.PartialArgs = {
    required: true,
    noExtraProps: true, //disable this to get composition of interface/type in anyOf (so I can divide endpoints into model sections)
    strictNullChecks: true,
  };
  //
  // optionally pass ts compiler options
  const compilerOptions: TJS.CompilerOptions = {
    strictNullChecks: true,
    allowUmdGlobalAccess: false,
    skipDefaultLibCheck: true,
    skipLibCheck: true,
    allowJs: true,
  };

  const schema = objectMap(typeFilesObject, (typeFiles) => {
    const endpointsProgram = TJS.getProgramFromFiles(
      typeFiles.endpoints,
      compilerOptions
    );
    const typesProgram = TJS.getProgramFromFiles(
      typeFiles.types,
      compilerOptions
    );
    const typeExamples: TypeExample[] = importFromFiles({
      files: typeFiles.typeExamples,
      guard: isArrayGuard,
    }).flat();

    const endpointExamples: EndpointExample[] = importFromFiles({
      files: typeFiles.endpointExamples,
      guard: isArrayGuard,
    }).flat();

    const endpoints = TJS.generateSchema(
      endpointsProgram,
      "*",
      settings,
      typeFiles.endpoints
    )?.definitions;
    const types = TJS.generateSchema(
      typesProgram,
      "*",
      settings,
      typeFiles.types
    )?.definitions;

    return {
      endpoints,
      types,
      typeExamples,
      endpointExamples,
    };
  });

  cachedSchema = schema;
  return schema;
};
