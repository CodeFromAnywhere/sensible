# TODO

**Firstly, improve endpoints within sensible-server:**

- [ ] Create these endpoints but don't spend too much time on new stuff

/sensible/core[/$model/type/endpoint-definition]
/sensible/ui[/$app]
/sensible/apps[/$app]
/sensible/recent[/$endpoint]
/sensible/errors[/$app/$endpoint] --> app can be any frontend app or the server. for server, endpoint can be specified.
/sensible/examples[/$model/type/endpoint]
/sensible/docs/[framework/package/app]/path/to/doc --> returns markdown
/sensible/docs/[framework/package/app]/menu --> returns menu.json

- [ ] Put all type interfaces in `core`

**Secondly, improve docs frontend**

- [ ] setup new page structure based on new endpoints
- [ ] fetch data in the right places and way
- [ ] use definitions from core
- [ ] fix all errors because of the new type definition

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
