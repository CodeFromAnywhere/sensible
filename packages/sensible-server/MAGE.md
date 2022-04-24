# What if:

- A program (cli tool) could automatically recursively go over all your functions, hooks, classes and components in your codebase (all exported things), see their types (typescript) and documentation (jsdoc) and generate a storybook for them, without any added boilerplate?
- All you need to write a unit test is write expects, as the mocks are inferred from the types (but can be edited using a UI that saves different, better, custom mocks to a json file). The default would be to expect it to render/execute without warnings.
- Monkey testing is also turned on by default. An overview of all your runnable functions/components is very valuable. Testing can be done by QA instead of the developer.
- You could get an overview of how often every component/function occurs in the codebase, and with that, the component/function "productivity"?
- You could see performance information for every component/function, out of the box?
- You could easily see the component hierarchy and interplay and, based on that, decide on how to restructure your code in the best possible way?
- Machine learning could detect repetition patterns in code and detect mistakes?
- You could generate, maintain and spin up a website with all these things for everyone to view, open source?

This is a huge idea, and it would take quite some effort to set this (or part of this) up. However, it could be well worth the effort as I think the current way of testing, documentation, and analysing things is very inefficient. It could basically increase the developer productivity of all React, React Native and Node.js developers (100s of thousands) by a couple dozen percentage points, easily. More programming languages could be added later, too.

This is certainly something I would wanna look into and experiment with.

- [ ] find mage key `mage.config.json` in root folder with configuration: which folders are public API? which folders are to be searched at all? works on frontend, backend, and any other shared packages.
- [ ] create a script that finds all exports and export defaults, their function name, their type interface (also infered), the comment above it, `.doc.md` files with the same name as the component (in same or separate folder). This script should be able to be ran for all files (to build and deploy the site), or it can be ran at runtime, locally, from a Next.js api.
- [ ] Put all gathered info in big json blob in `.mage` folder in root folder; generate next.js project in that same folder that reads this json from pages/index, generates the navigation menu, generates the page, imports and generates example components on the fly (babel codegen or lazy dynamic imports).
- [ ] Types/interfaces should be able to be extended with comments to know which values are sensible: ["sensible types"](https://github.com/Code-From-Anywhere/opportunities/issues/20)
- [ ] All pages should be wrapped in \_document and \_app. All other things should not be wrapped. All props should be applied based on type interface with sensible types
- [ ] Create next.js api that edits any file to add custom mocks for functions, components, and api's. This api can be called from the frontend and uses sensible type notation
- [ ] Create next.js api that is able to crud presets for the local state of the app so it can be changed (this might require some setup, e.g. to hook into redux so you can use the available dispatch events as well).
- [ ] Create github action (or any other CI, maybe even a vercel plugin) preset that creates the mage folder, runs/renders all sensible typed functions/components/api's, places comment of results in PR message (like vercel does) and deploys site with test results.
- [ ] Generate examples based on real usage in the codebase
- [ ] create bot that crawls git repo's, tries to apply mage on them, and automatically create PR that adds mage.config.json in root, with link to deployed results.

See if https://typedoc.org/guides/doccomments/ can be used
