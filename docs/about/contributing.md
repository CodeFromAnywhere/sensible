# 👷‍♂️ Contributing

Please go ahead! Just let me know

## CLI

When developing the CLI, make sure you run `yarn dev` in the package folder.
Besides, it can also be handy to add something like this to your `~/.zshrc`:

```
nonsense () { node ~/path/to/sensible/packages/sensible/build/index.js $@ }
```

This will make it easy to test the cli from anywhere while making changes.

## Creating an app template

Also, please note you can't add `package.json` and `.gitignore` files to templates! Call them `package.template.json` and `gitignore` (without dot) repectively in order for everything to function as expected (they will be renamed on installation)

There are multiple types of templates

- `base` is the base template that any sensible-app starts with. Among other things, it includes the base setup for `core`, `ui` and `server`.
- `apps` are simple boilerplates for different front-ends. Apps are generated using an initial install script, and then copying some files.
- `plugins` make it possible to add certain features into your codebase with ease. For now, a plugin can only add stuff into your codebase inside the scope of its own folder, so if the plugin is called `blog` it can add a `blog`-folder in `ui`, `core` and `server`. Via an exported object it can also alter things such as the store. Please note that it's not possible to alter files outside of its own folder, so if that is needed, it should be done by the user manually using provided instructions (and, possibly, meta-coding scripts)

### Working with templates

**.template sub-extension**
When you are working on a template for a sensible boilerplate, some files like `package.json` and `.gitignore` need to be renamed to prevent problems with `yarn` and `npm`. Make sure you add `.template` to those files before the extension (if there is no extension, .template becomes the extension). For example, `package.json` should be named `package.template.json` and `.gitignore` should be named `.template.gitignore`.

## Creating a plugin

This is fairly new, so please ask us, and we'll get you started.
