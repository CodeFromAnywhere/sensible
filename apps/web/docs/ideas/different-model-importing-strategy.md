# Different model importing strategy

We should keep all keyword files in 1 place instead them being spread over server and core.

It should just look in both core and server for api and model files, and they are all loaded, so you can use both places. Initially you can just put all of it in core, and don't care whether or not it ends up in some frontends. It is also likely we can remove those files from the frontends using metro an Webpack, so no biggie. However, if it becomes a problem, or it becomes too vague, people can opt for putting the files in server to make it more clear.

But if we can make the solution perfect, it would be great to be able to put everything in core so you're not switching folders all the time.

Other way to make it perfect: [two typescript build scripts for core](https://stackoverflow.com/questions/68195354/how-to-setup-a-typescript-project-with-multiple-source-dirs-and-separate-compile) so I can have `core-frontend` and `core` importable from the same folder. Don't know if the latter is possible though.

**An even better option**

Optionally, also make it possible to create a [*.]definitions.ts file that contains all definitions in a single file. This would greatly reduce file switching as you are often working on 4 files of a single model, which can be quite annoying.

Instead of splitting it by `type, api, model, endpoints`, you could also just keep it in a big file OR files like `login.definitions.ts` which contains login-specific types, apis, models and endpoints.

Anyway, I also don't know what the correct strategy is, so let's just keep it flexible.

A last option would be to even make it possible to have the definitions outside of the model folder, but I think that would be a mistake unless it's one file per model. If we put multiple models in a file, it will be hard to split them up into templates later.
