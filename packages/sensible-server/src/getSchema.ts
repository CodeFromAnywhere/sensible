import * as TJS from "typescript-json-schema";

let cachedSchema: TJS.Definition | null = null;
export const getSchema = (files: string[]) => {
  if (cachedSchema) {
    return cachedSchema;
  }
  // optionally pass argument to schema generator
  const settings: TJS.PartialArgs = {
    required: true,
    noExtraProps: true,
    strictNullChecks: true,
  };
  //
  // optionally pass ts compiler options
  const compilerOptions: TJS.CompilerOptions = {
    strictNullChecks: true,
    allowUmdGlobalAccess: false,
    skipDefaultLibCheck: true,
    skipLibCheck: true,
  };

  const program = TJS.getProgramFromFiles(files, compilerOptions);

  // We can either get the schema for one file and one type...
  const schema = TJS.generateSchema(program, "*", settings);
  cachedSchema = schema;
  return schema;
};
