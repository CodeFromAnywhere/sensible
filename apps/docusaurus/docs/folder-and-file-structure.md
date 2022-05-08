# Folder structure

Every Sensible project must adhere the following structure:

- `apps` all applications, including a server, web, and mobile apps
- `packages` all packages that need to be shared between multiple apps
- `third-party` all third-party modules that are being used as dependencies in your project and you are actively working on.
- `docs` markdown files that need to be presented in the Sensible Docs to educate the developer of the project. NB: you can also place markdown files anywhere else.
- `assets` any assets that don't belong to an app or package.
- `schemas` generated folder with the JSON typescript definitions, ignored from git
- `package.json` the Turbo setup. This file makes it possible to install all modules of all apps and packages with a single `yarn` command.
- `README.md` information about the project, instructions, etc.
- `turbo.json` a [turbo-file](https://turborepo.org) to setup code-sharing functionalities and easy installation and building capabilities.

# Reserved Keyword Files

In core and server, the src folder contains all model folders (to keep file structure as flat as possible).

There are some reserved keywords in the filename. In core those reserved keywords are `endpoint` and `type`, while in server those reserved keywords are `api` and `model`. You should only create the files `{word}.ts`, `{word}s.ts`, `filename.{word}.ts` and `filename.{word}s.ts` if those files are actually implementing the convention for that keyword.

The following should be known about those reserved filenames:

* type files should only contain types
* endpoint files should only contain endpoint definitions (that implement the types)
* model files should only contain models (that implement the types)
* api files should only contain apis (that implement the endpoint defenitions)
