# next-transpile-linked-modules

This package can be used on top of [next-transpile-modules](https://github.com/martpie/next-transpile-modules).
It adds a few webpack configurations so that you can automatically make linked modules be transpiled in the correct way as well. On top of that, it fixes Fast Refresh too for linked modules.

It's a bit of a hack and should be used with caution.

## Installation

First make sure to have [next-transpile-modules](https://github.com/martpie/next-transpile-modules) working.

Then, install this:

`yarn add next-transpile-linked-modules`

In `.env.local` (only if you have stuff linked):

`NEED_TRANSPILE_LINK_MODULES=true`

In your `next.config.js`:

```
const withLinks = require("next-transpile-linked-modules")(transpilables, {
  // put on true if you want to see the exact paths that are resolved and more debug info
  debug: false,
  // needed if you link it so we know the location of the project and its node_modules folder
  projectDirectory: __dirname,
});

module.exports = withTM(withLinks({ ... }));
```
