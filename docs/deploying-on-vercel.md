Sensible is built on top of a yarn workspace. Your Next.js frontend relies on other packages inside the sensible project, so they also have to be installed and built.

To setup Vercel deployment correctly, select your project, go to `settings`, `general`, `build & development settings`.

There, select the following options:

- build command: `yarn`
- output directory: `apps/web` (or whatever your next.js project is called)
- install command: `yarn`

That's it! It should now build fine.
