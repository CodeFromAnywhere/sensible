# Frontend Docs

All frontend folders (react in package.json) should be introspected too. Do this:

- render the folder structure in the menu
- for every file, render it’s default export and then other exports in the menu. If only default export is available don’t expand from the file.
- in the content render the params interface and the (inferred) return, and the description/annotations.
- if filename.example.ts or the example export is present, render this too.
- if filename.md(x) is present, render that.
- **LATER**: rendering the components/pages will be hard because they rely on packages, wrappers, state and props, and it’s hard to isolate them. This is a next step, but it’s probably better to just run this in the frontend somehow where everything is installed and we have the context. Then we can use the example files to render stuff to see if it works.
