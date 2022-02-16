<p align="center">
<a href="https://www.sensibleframework.co" target="_blank">
<img src="./assets/icon.png" width="250" /><br />
www.sensibleframework.co
</a>
</p>

# The Shared Full Stack Typescript Framework

With strict conventions and the newest typescript and code sharing possibilities, we were able to create the most advanced typescript framework ever and boost the productivity of hundreds of development teams, maybe even by a factor of 10 or more if you compare it to the industry standard.

`Insert blurps here`

Sensible's mission is to boost the productivity of 100.000+ Software Developers, making it as easy as possible to build a high-quality full-stack mobile/desktop app/website.

Wanna try? Just enter `yarn create sensible-app APPNAME` and see the magic, or [check out this demo](https://www.sensibleframework.co/demo)

## Documentation

To create a Sensible project, run:

`yarn create sensible-app APPNAME`

or

`npx create-sensible-app@latest APPNAME`

Optionally, you can add these flags:

To specify a logo:
`--logo /path/to/logo.png`

To specify a domain:
`--domain domainname.tld`

To also fetch all sensible open source packages and core dependencies (mainly react-with-native-\*) and add them to your workspace:
`--dev`

To specify a packagenames for your common packages:
`--packages @orgname` or `--packages your-common-package-name your-frontend-package-name`

If you're feeling lucky and want sensible AI to pick you a nice logo and domain, add:
`--lucky`

This will do the following (or, if not possible, give you the proper instructions):

1. Setup sensible boilerplate with all node modules, a few example models/endpoints and plugable integration
2. Suggest a logo for you (if unspecified)
3. Suggest a domain for you (if unspecified)
4. If not installed, install papapackage, then run it in your new folder
5. publish to npm, github, vercel and expo
6. Open up VSCode in the correct folder, running expo packager, next.js site, server, and papapackage, so you can start coding.

<p align="center">
  <img src="./assets/sensible-meme.png" width="300" />
</p>

With sensible, you just need to specify the name of the app, hit enter, and you'll be live within seconds.

If you want to create multiple apps at once, just specify `yarn create sensible-app APPNAME1 APPNAME2 APPNAME3`. This will assume you're feeling lucky ;).

Future:

- faster sensible scripts: create-sensible-app update with cached node_modules
- more boilerplates: electron, chrome extension, vscode extension
- cli to add certain features to your app/website such as cms, webview, etc.
- sensible examples section on the site fetching all sensible-core-_ and sensible-ui-_ from npm
- migration guide + cli upgrade command to upgrade the framework version
