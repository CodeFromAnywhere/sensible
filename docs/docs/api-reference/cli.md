---
sidebar_position: 1
---

# CLI

`npx sensible init` or `yarn create sensible-app` bootstraps a new sensible project for you, with sensible defaults.

### Environment setup

You need to have the following environment setup and tools installed. The cli will walk you through setting this up, so don't fear running it.

- node, npm, npx, yarn
- vscode with code cli
- git
- watchman

### Arguments

There are a couple of flags and arguments to alter the way it works. Everything is optional, and it is recommended to KISS, be sensible, and just live with the defaults:

- `name` as first argument (optional): name of your project
- `repo` as second argument (optional): Where should your app be hosted? Provide an URL or a GitHub slug (either "org/repo" or "username/repo").
- `--debug` turns on logging
- `--non-interactive` will ask some questions before bootstrapping
- `--offline` will get everything from cache, no matter how long it's ago since you last ran sensible
- `--branch=string` will change the default branch name
