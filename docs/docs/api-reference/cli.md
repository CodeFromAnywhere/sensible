---
sidebar_position: 1
---

# CLI

Before you install the `sensible` cli, make sure you have brew, node, npm and npx. If you don't, this is how to install them:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
brew install node
```

Now, get `sensible`:

```bash
npm install -g sensible
```

This installs the `sensible` command onto your system. We also add the shortcut `s`, which does the same as `sensible`.
If you don't want it globally, just use `npx` instead, that also works.

## Sensible Init

`sensible init` or `yarn create sensible-app` bootstraps a new sensible project for you, with sensible defaults.

There are a couple of flags and arguments to alter the way it works. Everything is optional, and it is recommended to KISS, be sensible, and just live with the defaults:

- `name` as first argument (optional): name of your project
- `repo` as second argument (optional): Where should your app be hosted? Provide an URL or a GitHub slug (either "org/repo" or "username/repo").
- `--debug` turns on logging
- `--non-interactive` will ask some questions before bootstrapping
- `--offline` will get everything from cache, no matter how long it's ago since you last ran sensible
- `--branch=string` will change the default branch name

## Sensible Setup

The Sensible setup script checks and installs everything to get the most out of sensible on your MacOS system.

```bash
sensible setup
```

Use this at your own risk! Check [here](https://github.com/Code-From-Anywhere/sensible/blob/main/packages/sensible/setup-mac/install.sh) for the source.

## Sensible Add

With this command you can easily add an app type to your project. Make sure you're in the root folder of your project.

```bash
sensible add [app type]
```

If you want to choose the apptype, just run `sensible add` without apptype.
