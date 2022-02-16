"use strict";
// "typescript-json-schema": "^0.53.0"
// import { Endpoint } from "sensible-core";
// import { createMakeEndpoint } from "./createMakeEndpoint";
// import * as TJS from "typescript-json-schema";
// interface DocsEndpoint extends Endpoint {
//   method: "GET";
//   body: {};
//   response: {
//     endpoints?: Endpoint[];
//     models?: object[];
//     success: boolean;
//     response: string;
//   };
// }
// interface RecentEndpoint extends Endpoint {
//   method: "GET";
//   body: {};
//   response: {
//     success: boolean;
//     response: string;
//     recent?: (Endpoint & {
//       endpoint: string;
//     })[];
//   };
// }
// interface DefaultEndpoints {
//   docs: DocsEndpoint;
//   recent: RecentEndpoint;
// }
// const makeEndpoint = createMakeEndpoint<DefaultEndpoints>();
// export const makeDocsEndpoints = (files: string[]) => {
//   return [
//     makeEndpoint("docs", "GET", async (ctx) => {
//       // optionally pass argument to schema generator
//       const settings: TJS.PartialArgs = {
//         required: true,
//       };
//       // optionally pass ts compiler options
//       const compilerOptions: TJS.CompilerOptions = {
//         strictNullChecks: true,
//       };
//       const program = TJS.getProgramFromFiles(
//         // this should be given so the endpoint should be created in a function (makeDocsEndpoints(types):Middleware[])
//         files,
//         compilerOptions
//       );
//       // We can either get the schema for one file and one type...
//       const schema = TJS.generateSchema(program, "*", settings);
//       // ... or a generator that lets us incrementally get more schemas
//       const generator = TJS.buildGenerator(program, settings);
//       if (!generator) {
//         return {
//           response: "Couldn't make generator",
//           success: false,
//         };
//       }
//       // // generator can be also reused to speed up generating the schema if usecase allows:
//       // const schemaWithReusedGenerator = TJS.generateSchema(
//       //   program,
//       //   "MyType",
//       //   settings,
//       //   [],
//       //   generator
//       // );
//       // all symbols
//       const schemas = generator
//         .getUserSymbols()
//         .map((symbol) => generator.getSchemaForSymbol(symbol));
//       // Get symbols for different types from generator.
//       // generator.getSchemaForSymbol("MyType");
//       // generator.getSchemaForSymbol("AnotherType");
//       const endpoints = schemas as Endpoint[];
//       const models: object[] = [];
//       return {
//         endpoints,
//         models,
//         success: true,
//         response: "Wow",
//       };
//     }),
//     makeEndpoint("recent", "GET", async (ctx) => {
//       return { success: false, response: "Not implemented yet", recent: [] };
//     }),
//   ];
// };
// export const makeDefaultEndpoints = (files: string[]) => {
//   return [...makeDocsEndpoints(files)];
// };
//# sourceMappingURL=defaultEndpoints.js.map