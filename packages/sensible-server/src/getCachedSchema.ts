import { objectMap } from "sensible-core";
import { Path } from "sensible-files";
import path from "path";
import * as TJS from "typescript-json-schema";
import fs from "fs";
import {
  EndpointExample,
  ModelSchemaObject,
  TypeExample,
  InterpretableTypes,
} from "sensible-core";
import { importFromFiles, isArrayGuard } from "sensible-files";

// optionally pass argument to schema generator
const settings: TJS.PartialArgs = {
  required: true,
  noExtraProps: true, //disable this to get composition of interface/type in anyOf. may be better?
  strictNullChecks: true,
};
// optionally pass ts compiler options
const compilerOptions: TJS.CompilerOptions = {
  strictNullChecks: true,
  allowUmdGlobalAccess: false,
  skipDefaultLibCheck: true,
  skipLibCheck: true,
  allowJs: true,
};

/**
 * returns unix timestamp (ms) of the last modificationdate of the last modified file
 **/
export const getLastModification = (files: Path[]): number => {
  return files.reduce((modificationTime, filePath) => {
    if (!fs.existsSync(filePath)) {
      return modificationTime;
    }
    const fileModificationTime = fs.statSync(filePath).mtimeMs;
    return fileModificationTime > modificationTime
      ? fileModificationTime
      : modificationTime;
  }, 0);
};

/**
 * If existing schema is not stale, just require it.
 * Otherwise, generate it for all files (this takes a long time).
 */
export const generateOrRequireSchema = (
  /**
   * can be empty
   */
  {
    typeFiles,
    schemaFilePath,
    type,
    model,
  }: { typeFiles: Path[]; schemaFilePath: Path; type: string; model: string }
): { [key: string]: TJS.DefinitionOrBoolean } | undefined => {
  if (typeFiles.length === 0) return;

  const isStale =
    getLastModification(typeFiles) > getLastModification([schemaFilePath]);

  if (isStale) {
    console.log(`Hot damn! We need to update ${model} ${type}`);
    const typesProgram = TJS.getProgramFromFiles(typeFiles, compilerOptions);
    const schema = TJS.generateSchema(
      typesProgram,
      "*",
      settings,
      typeFiles
    )?.definitions;

    const schemaDirPath = path.dirname(schemaFilePath);

    if (!fs.existsSync(schemaDirPath)) {
      fs.mkdirSync(schemaDirPath, { recursive: true });
    }

    const schemaString = JSON.stringify(schema);
    fs.writeFile(schemaFilePath, schemaString, () => {
      //console.log("written the file", schemaFilePath);
    });

    return schema;
  }

  //TODO: Validate this file as it could be corrupt, resulting in weird errors down the line
  return require(schemaFilePath);
};

export const getCachedSchema = (
  typeFilesObject: InterpretableTypes,
  schemasFolderPath: Path
): ModelSchemaObject => {
  const schema = objectMap(typeFilesObject, (typeFiles, key) => {
    const endpointSchemaFilePath = path.join(
      schemasFolderPath,
      key,
      "endpoints.json"
    );
    const typeSchemaFilePath = path.join(schemasFolderPath, key, "types.json");

    //TODO: if the user makes a mistake in the type definition, crashes will happen down the line now. I think the guard should be improved

    const typeExamples: TypeExample[] = importFromFiles({
      files: typeFiles.typeExamples,
      guard: isArrayGuard,
    }).flat();

    const endpointExamples: EndpointExample[] = importFromFiles({
      files: typeFiles.endpointExamples,
      guard: isArrayGuard,
    }).flat();

    const types = generateOrRequireSchema({
      typeFiles: typeFiles.types,
      schemaFilePath: typeSchemaFilePath,
      model: key,
      type: "types",
    });
    const endpoints = generateOrRequireSchema({
      typeFiles: typeFiles.endpoints,
      schemaFilePath: endpointSchemaFilePath,
      model: key,
      type: "endpoints",
    });

    return {
      endpoints,
      types,
      typeExamples,
      endpointExamples,
    };
  });

  return schema;
};
