# Outdated / update / depcheck script

Outdated script:
Use `npm/yarn/pnpm outdated --no-table` to get any outdated dependencies and cache those, so it can be added to the api. Make sure this doesn't block server endpoint speed and is only done lazily.

Update script:
Make sure there is an endpoint so you can update packages to the newest version using the docs ui.

Depcheck script:
Make it possible to check for unused dependencies in any app using something like [depcheck](https://www.npmjs.com/package/depcheck)
