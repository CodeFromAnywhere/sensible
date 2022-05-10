---
sidebar_position: 1
---

# 🦅 A Birdseye View

## Philosophy

Sensible was built with a couple of things in mind. This is what we care about:

- Codebase introspection (Documentation generation)
- Full-stack code-sharing (full-stack auto-completion using Typescript)
- Maximise learnability, minimise tech debt, simplify onboarding
- Decentralised, Open Source, Automatic

## The stack

In the following image you can see how a typical sensible project is structured.

![sensible stack](./sensible-stack.png)

Sensible lets you define the core, the backbone, of your app in a single place. There is also a big shared code layer, where you define your server and UI. The app layer is where it usually becomes complex, but the above two layers let you remove as much complexity as possible from here.

Sensible brings different frameworks together that are needed in creating a full-stack app to production. It is recommended to have some experience with react, react-native, node.js and databases.

- For Web applications, [React](https://reactjs.org/) with [Next.js](https://nextjs.org) is used
- For Android and iOS applications, [React Native](https://reactnative.dev/) with [Expo](https://expo.dev) is used
- For MacOS, Windows and Linux applications, we use React with Electron
- For VSCode Extensions we use bare React!
- For Chrome Extensions we use React with [MV3](https://developer.chrome.com/docs/extensions/mv3/intro/)
- For REST APIs we use Server.js on Node JS
- For CLI’s and Scripts we use raw Node JS

All Frontend apps can use your shared `ui` package and have react-with-native and tailwind support.

All apps (front and backend) and packages can use the `core` package.

Together, this creates a very powerful setup. Sensible isn’t a single framework trying to build on multiple places. This would be very hard. Sensible tries to keep all the good stuff and use the best framework for every location, and make it easy to share code.

### Used libraries

We use the following libraries in the Sensible app.

#### React with Native

react-with-native is a framework that lets us render HTML-like components inside react-native. By replacing all html with the react-with-native counterparts (for example, using `<Div>` over `<div>`), we are able to share code between `react-native` and `react` and can share all UI between any app using our `ui` package.

#### Server.js

This Node.js server lets us define endpoints in a simpler way which made it possible to get type safety for the endpoints.

#### Tailwind

This layer on top of CSS is used within react-with-native and makes it possible to have the same styling in react and react-native apps.

## Folder structure

Every Sensible project must adhere the following structure:

- `apps` all applications, including a server, web, and mobile apps
- `packages` all packages that need to be shared between multiple apps
- `third-party` all third-party modules that are being used as dependencies in your project and you are actively working on.
<!-- - `docs` markdown files that need to be presented in the Sensible Docs to educate the developer of the project. NB: you can also place markdown files anywhere else. -->
- `assets` any assets that don't belong to an app or package.
- `schemas` generated folder with the JSON typescript definitions, ignored from git
