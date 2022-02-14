<p align="center">
  <img src="./logo.png">
</p>

# Papapackage

This cli watches all your projects and copies changed files to all node_modules folders of dependent projects.

# Installation

`brew install watchman`

`yarn global add papapackage`

# Usage

Run papapackage in the folder you want to watch:

`papapackage`

or

`papapackage ~/Documents`

(or any other folder)

# Let papa do the work

Now you can let papa do the work, and never worry that you have an old version installed!

# Todo

Refactor

- [x] put type in every dest in watchlist instead of keeping 2 arrays. type is link or copy
- [x] Also watch linked ones, just skip the copying for linked destinations
- [x] test if the refactor was successful

Status

- [x] ActivityIndicator + "searching..." --> Checkmark + "X dependencies found for Y packages"
- [x] ActivityIndicator + "linking..." --> Checkmark + "X packages linked into Y destinations"
- [x] ActivityIndicator + "watching..." --> Checkmark + "X packages watched for Y destinations"
- [x] will be shown on startup/restart, but is also saved so it can be shown when hitting i

Copies:

- [x] don't show copies being made for the first round (the first 10 seconds)
- [x] after the first round, for every subscription event, show Checkmark + "X file(s) changed. Copying into to Y destination(s) and linking into Z destination(s)"

Hotkeys:

- [x] When hitting i or ?, you see available commands and the status (l, r, i + status)
- [x] When hitting l, you see all watched and linked directories, together in one array (watched have type watch, linked have type link). It is shown in nice tabular view. It's also copied as JSON
- [x] When hitting r, it restarts
- [x] When hitting q, it shows details of the latest copy/link event (package name, package src, link destinations, copy destinations)

General:

- [ ] Add config option that lets you create some settings that change certain things in the cli
- [ ] Add mode by default (turned off by -y) that asks you if it should start the watcher
- [ ] Add -l that only lists table, but doesn't link or watch anything yet (it can then be started by hitting s)
- [ ] Add -u/unlink that unlinks all the found packages to link
- [ ] Add 'run {command}' that runs that command in all package folders

Downtime management:

- [ ] safe last time papapackage was running and check the last time every dependency has had changes in non-ignored folders
- [ ] remove current dest/node_modules/dependency folder for linking strategy copy
- [ ] copy src folder to dest/node_modules/dependency
- [ ] don't subscribe to every file on startup, only after startup (this is a watchman setting)

Article

- [ ] Write an article about this

Test

- [ ] Confirm it works for expo projects, next projects, and packages.

First, test it in daily usage

Fixes

- [ ] change blue color (unreadable)
- [ ] sometimes it watches twice for some reason
- [ ] never block thread so it shows loading correctly (don't use sync functions)
- [ ] show loader if loading files or any other sub-command
- [ ] status doesn't get replaced properly if you hit the l sub-command (make it an object instead of an array, and replace keys instead of array.push)

Nice to have:

- [ ] make sure to un-link all packages that are going to be linked, because the folders may have changed and it can't overwrite links.
- [ ] Add `papa ls` that only lists table, but doesn't link or watch anything yet (it can then be started by hitting s)
- [ ] Add `papa unlink` that unlinks all the found packages to link
- [ ] Add `papa exec {command}` that runs that command in all package folders
- [ ] Add `papa run {script}` that runs an npm script in each package that contains it
- [ ] Change cli name to `papa`
- [ ] Add mode by default (turned off by -y) that asks you if it should start the watcher
- [ ] CLI should read `papapackage.config.json` for the key `ignoreDirs` which is an array of folder paths (absolute or relative) that will not be watched
- [ ] Also add other keys in the config like `useVoice` and `yarnOrNpm`
- [ ] Add `papa ignore {path}` that will add the path to the `papapackage.config.json` (and creates the configfile if it doesn't exist in the cwd)
- [ ] Add `papa init` that creates the config file in the cwd in an interactive way (like most init cli's do)
- [ ] Add `papa help` with info
- [ ] Add `papa publish`, `papa pull`, `papa ship`, `papa`
- [ ] Add `papa` to `npx` if that name is not taken yet
- [ ] Add `papa clean` to remove all node_modules and lockfiles everywhere
