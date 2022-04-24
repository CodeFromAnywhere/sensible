<p align="center">
<a href="https://www.sensibleframework.co" target="_blank">
<img src="./assets/icon2.png" width="250" /><br />
www.sensibleframework.co
</a></p>

# The fastest way to build an app

**The Shared Full Stack Typescript Framework** With strict conventions and the newest typescript and code sharing possibilities, we were able to create the most advanced typescript framework ever and boost the productivity of hundreds of development teams, maybe even by a factor of 10 or more if you compare it to the industry standard.

`Insert blurps here`

Sensible's mission is to boost the productivity of 100.000+ Software Developers, making it as easy as possible to build a high-quality full-stack mobile/desktop app/website.

Curious? Just run `yarn create sensible-app APPNAME` and see the magic, or [check out this demo](https://www.youtube.com/watch?v=tL1tcWEgQNo)

This will setup the sensible framework with all node modules installed, a few example models/endpoints and plugable integration. It will also open up VSCode in the correct folder, running the expo packager, next.js site, server, and papapackage, so you can start coding.

<p align="center">
  <img src="./assets/sensible-meme2.png" width="300" />
</p>

## How does it work?

Define endpoints (and other type interfaces) in a central place

![define](./assets/define-gif2.gif)

Write your endpoint with complete typesafety

![makeEndpoint](./assets/makeEndpoint-gif2.gif)

Call your endpoint with complete type-safety and autocompletion (no boilerplate needed!)

![api](./assets/api-gif2.gif)

If you need more help, just look in the auto-generated docs!

![docs](./assets/docs-gif2.gif)

## Future ideas

With sensible, you just need to specify the name of the app, hit enter, and you'll be live within seconds.

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

If you want to create multiple apps at once, just specify `yarn create sensible-app APPNAME1 APPNAME2 APPNAME3`. This will assume you're feeling lucky ;).

- faster sensible scripts: create-sensible-app update with cached node_modules
- more boilerplates: electron, chrome extension, vscode extension
- cli to add certain features to your app/website such as cms, webview, etc.
- sensible examples section on the site fetching all sensible-core-_ and sensible-ui-_ from npm
- migration guide + cli upgrade command to upgrade the framework version
- make it possible not to have to run any command but just click "Create A New Project" from the homepage, so no-coders can get started as well using plugable-cms from the start.
- On creating a sensible app, suggest a logo for you
- On creating a sensible app, suggest, buy, and setup a domain for you
- On creating a sensible app, if not installed, install papapackage, then run it in your new folder
- Option to automatically publish to npm, github, vercel and expo

# The Core Sensible Philosophy

- Codebase introspection
- Documentation generation
- Full-stack code-sharing
- Full-stack auto-completion using Typescript
- KISS
- Maximise learnability

# Useful links

- [docs](/docs)
- [packages](/packages)
