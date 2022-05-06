# TODO

LEARNING: the end user is not connected to any sensible-server, yet they want to have the sensible-core types. However they don't want the type interfaces they don't have access to. Therefore there MUST be an additional core package that adds the SensibleTypes with the other types that are sensible-backend specific.

LEARNING: Stop thinking about cool far-ahead ideas. Start **doing** what's most important.

**Secondly, improve docs frontend**

- [ ] make docs endpoint to findAllMd again to get menu, but only find the files, not parsing them. Just alter the filename to Camel Case for now. For now, just title it with the title of the md and don't do any recursive stuff.
- [ ] new menu structure: apps, models, docs, errors, examples, recent, ui. once you clicked,
- [ ] new way to select app: selectbox. then, select box to select one of the 7 things above.

- [ ] store core endpoint result in persistent store for every project added
- [ ] create possibility to search through multiple core's at once so they can be compared
- [ ] for every definition, add a link to github to the exact file, and a `code /relative/path` copy button so you can easily open the file
- [ ] publish all packages and deploy docs, server and web of sensible without bugs :-)

**Most effective to do**

- [ ] create function that takes a type definition and generates model, api, and frontend for it.
- [ ] make a good guide on all the specific steps to bring something to production (and try to automate it)
- [ ] improve developer onboarding by integrating cfa-workspace and document, simplify or automate server setup
- [ ] see if github actions are easy to setup and automate so we got auto-deploy on ship. another way would be just inside a sensible cli command, since we're moving away from github in the future anyway.

**demo-time**

Once the above is done, and it should not take more than a few days, sensible is demo-able, and I can create many apps, quickly. The first step would be to create some new apps in demo-videos and meetings and save lots of plugins to `sensible-plugin-*`. From that point onwards, I can create sick stuff, quickly.

## documentations

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

1 minute demo vid showing the command and what you get

### sensible.json

make /sensible.json in root

- docs-config: links, menu
- sensible-config: name, email, domain, api[]
