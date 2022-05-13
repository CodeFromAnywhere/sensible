---
sidebar_position: 7
---

# ➡️ Migrating to Sensible

There's a lot of steps involved in migrating an existing codebase to start using Sensible. It can be divided into two parts: getting your old codebase to run, and refactoring it to make good use of all sensible features.

## Getting it to run

1. The easiest way is to just run `sensible init` to create a new project.
2. You can get your old codebase to run by simply copying your server and frontend(s) to the `apps` folder. It is advisable to use different folder-names and leave `app`, `web` and `server` in there, so you still have the examples of how to do it properly, for later.
3. Fix package versioning problems (you can just have one version per package, or you need to use [nohoist](https://classic.yarnpkg.com/blog/2018/02/15/nohoist/])
4. Deploy it all with this new monorepo.

## Refactoring it sensibly

Easy enough, but you're not done! To use sensible in a sensible way, you need to:

1. Put all type interfaces that need to be used in multiple apps, frontend and backend, inside `core` so they can be used everywhere. Remove type interfaces everywhere else, and use the `core` ones.
2. Create endpoint definitions in core for all your endppoints
3. Use the `core` definitions in the frontend: start using the `api` function everywhere.
4. Refactor all your endpoints to use `makeEndpoint`.
5. Put all your UI (screens, components, hooks, storage) in the `ui` package so they can be reused across different frontends.
6. If you also want to reuse `ui` between `react` and `react-native`, you need to start using `react-with-native`.

This may seem like a daunting task, and it probably is. If you need help, don't hestitate to [contact us](mailto:info@codefromanywhere.com). We would love to learn more about making migrations to Sensible easier. We'll even help you for free to a certain point!
