import * as ts from "typescript";
import { Project } from "ts-morph";
import path from "path";
import colors from "colors";

function foo(param: string) {
  console.log("foo");
}

const oldStuff = () => {
  const filepath = process.argv[2];

  const program = ts.createProgram([path.resolve(`./` + filepath)], {
    target: ts.ScriptTarget.ES2015,
  });
  const file = program.getSourceFile(filepath);
  console.log(file);

  const node = file?.statements[0] as ts.FunctionDeclaration;
  const checker = program.getTypeChecker();

  // var type = checker.getTypeAtLocation(node.arguments[0]);

  // checker.getAliasedSymbol;
  // const config = {depth:999}
  // console.dir(type, config);
};

const mergeObjectArray = (objectArray: any[]) => {
  return objectArray.reduce(
    (previous, current) => ({ ...previous, ...current }),
    {}
  );
};

const logLengthObject = (object: { [key: string]: any[] }) => {
  const lengths = mergeObjectArray(
    Object.keys(object).map((key) => ({ [key]: object[key].length }))
  );

  console.log(lengths);
};

export const parseStuff = async () => {
  const dir = process.argv[2];
  const normalizedDir = path.join(dir);

  const project = new Project();
  project.addSourceFilesAtPaths([`${normalizedDir}/**/*.ts`]);

  const sourceFiles = project
    .getSourceFiles()
    .filter((file) => !file.getFilePath().includes("/node_modules/"));

  console.log(sourceFiles.map((s) => s.getBaseName()));

  sourceFiles.map((file) => {
    console.log("looking into", file.getBaseName());

    file.getImportDeclarations().map((importDeclaration) => {
      console.log(colors.red("Import"), importDeclaration.getFullText());
    });

    const functions = file.getFunctions();
    const interfaces = file.getInterfaces();
    const children = file.getChildren();
    const classes = file.getClasses();
    const consts = file.getVariableDeclarations();
    const exports = file.getExportSymbols();

    functions.map((func) => {
      console.log(func.getTypeParameters().map((p) => p.getFullText()));
    });

    interfaces.map((interfaceDeclaration) => {
      //console.log("type".green, interfaceDeclaration.getType().getBaseTypes());//
    });
  });
};
parseStuff();
