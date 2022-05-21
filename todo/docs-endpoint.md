# Documentations

- Fetch all markdown files from `/docs` at build-time and create static pages from them.
- make docs endpoint to findAllMd again to get menu, but only find the files, not parsing them. Just alter the filename to Camel Case for now. For now, just title it with the title of the md and don't do any recursive stuff.

Once you have selected a project and it connects to a different api, sensible docs should still be found (but should not be on top). md files from any github source can be included. There needs to be a script looking at all your dependencies in all package.json in all apps/packages. For every package in your project, include one of the following, depending on what's available on the sensible backend.

- navigatable docs from a github markdown soure
- a link to their docs
- a link to the package you included

The order of documentations is as follows:

- first your own
- then sensible and react-with-native
- then expo, nextjs, and other apptype framework docs
- then other packages (you define the ones that should be shown by default in your sensible.json, and the user can edit that locally as well)

When clicking docs of a package/repo, the navigation menu "navigates" to the menu defined for those docs. The navigation menu is built up based on folder structure by default, but you can edit it by specifying a menu.json file in your docs folder. For expo/next.js docs (and other popular docs occuring a lot) we can specify those menu.json files ourselves for them (by specifying a different location for it) and make a PR later to refactor their docs code in that way.

Fix docs, also add "tweet about sensible" and links to share on other socials
