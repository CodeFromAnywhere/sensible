---
sidebar_position: 1
---

# Create sensible app

`npx sensible init` or `yarn create sensible-app` bootstraps a new sensible project for you, with sensible defaults.

### Environment setup

You need to have the following environment setup and tools installed. Continuing with a different setup could cause bugs...

- macos
- node 18, npm, yarn
- vscode with code cli
- git
- watchman

### Arguments

There are a couple of flags and arguments to alter the way it works. Everything is optional, and it is recommended to KISS, be sensible, and just live with the defaults:

- `name` as first argument (optional): name of your project
- `repo` as second argument (optional): Where should your app be hosted? Provide an URL or a GitHub slug (either "org/repo" or "username/repo").
- `--debug` turns on logging
- `--interactive` will ask some questions before bootstrapping
- `--offline` will get everything from cache, no matter how long it's ago since you last ran sensible
- `--no-cache` will get everything without cache
- `--no-third-party` will skip cloning the third party apps
- `--branch=string` will change the default branch name
- `--cache-days=number` will change the amount of days before cache is not used anymore (has on effect if you also use `--offline` or `--no-cache`)
- `--new-defaults` will set the flags you set as new defaults

### Coming up

We're still working on these settings. You can guess what they could do:

- `--git.user=string`
- `--git.site=string`
- `--domain=string`
- `--vercel-token=string`
- `--cloudflare-token=string`
- `--namecheap-token=string`
- `--expo-token=string`
- `--ios-token=string`
- `--play-token=string`
- `--server-ip=string`
- `--server-user=string`
- `--server-password=string`
- `--server-token=string`
- `--king-token=string`
- `--logo=string`

Do you have any other ideas to improve the CLI? Please think about [contributing](https://github.com/Code-From-Anywhere/sensible/blob/main/contributing.md) or start a [discussion](https://github.com/Code-From-Anywhere/sensible/discussions).
