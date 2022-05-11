# Templates cli

**cli**
In order to make it as easy as possible to work with templates, we should create a couple of cli commands:

- `sensible add [plugin]` will look up `sensible-plugin-[plugin]` on npm and install that into your project.
- `sensible init-plugin [folder]` will get you started creating a new plugin from one of your models.
- `sensible watch-template [folderpath]` will watch the template folder in `third-party/sensible/packages/create-sensible-app/templates/[folderpath]` (relative to your git root folder) for changes and copy them to your codebase.
