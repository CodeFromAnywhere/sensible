- [ ] Build the next docs web using `next build && next export`
- [ ] publish the `/out` folder into a package `sensible-docs`
- [x] since `sensible-docs` is a dependency of sensible-server, it will be installed in node_modules on your server
- [ ] add public: "node_modules/sensible-docs"
- [ ] make sure the docs work without any paths because that doesn't work. Therefore everything needs to be done using query parameters, which is fine. so instead of `[...url]` just make a `docs.tsx` with a query `domain` that contains `wemote.leckrapi.xyz`, for example.

Disadvantage:

- [ ] limited experience of next.js (but we probably don't need it so it's fine)
- [ ] can't have other public folder (solution could be to use a server.js view instead of a public folder or to somehow make it possible to have multiple public folders)
- [ ] people see an older experience if they have older `sensible-server` installed

For now the current solution is fine, but it's good to know it's possible. This is especially useful because it will make it work on all browsers, also for localhost.
