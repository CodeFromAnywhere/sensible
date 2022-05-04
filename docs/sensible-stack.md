# The stack

Sensible brings different frameworks together that are needed in creating a full-stack app to production.

* For Web applications, React with Next.js is used
* For Android and iOS applications, React Native with Expo is used
* For MacOS, Windows and Linux applications, we use React with Electron
* For VSCode Extensions we use bare React!
* For Chrome Extensions we use React with MV3
* For REST APIs we use Server.js on Node JS
* For CLI’s and Scripts we use raw Node JS

All Frontend apps can use your shared `ui` package and have react-with-native and tailwind support.

All apps (front and backend) and packages can use the `core` package.

Together, this creates a very powerful framework. Sensible isn’t a single framework trying to build on multiple places. This would be very hard. Sensible tries to keep all the good stuff and use the best framework for every location, and make it easy to share code.
