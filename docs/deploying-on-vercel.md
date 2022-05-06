Sensible is built on top of a yarn workspace. Your Next.js frontend relies on other packages inside the sensible project, so they also have to be installed and built.

To setup Vercel deployment correctly, select your project, go to `settings`, `general`, `build & development settings`.

There, select the following option:

- output directory: `apps/[your next project app folder]`

That's it! It should now build fine. :)
