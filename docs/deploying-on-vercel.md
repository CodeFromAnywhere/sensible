Sensible is built on top of a yarn workspace. Your Next.js frontend relies on other packages inside the sensible project, so they also have to be installed and built.

To setup Vercel deployment correctly, select your project, go to `settings`, `general`, `build & development settings`.

There, select the following option:

- output directory: `apps/[your next project app folder]`

Also make sure that you set your root directory to the root folder of the workspace.

PS: It's also possible to do it the other way around, of course: set your root directory to `apps/web` and just `cd ../..` first for installing and building, but the first option is easier to set up.

That's it! It should now build fine. :)
