// all modules i'm using that use custom tailwind classes without converting them to css should be added here.
const transpileModules = ["react-with-native", "react-with-native-form"];

const TAILWIND_CONTENT_MODULE_DIR_1 = "./node_modules/[module]/**/*.tsx";
const TAILWIND_CONTENT_MODULE_DIR_2 = "../../node_modules/[module]/**/*.tsx";

const transpileModulesContent = transpileModules
  .map((module) => {
    return [
      // it needs to search both node_modules and the node_modules of my workspace
      TAILWIND_CONTENT_MODULE_DIR_1 || TAILWIND_CONTENT_MODULE_DIR_2
        ? null
        : `./node_modules/${module}/**/*.tsx`,
      TAILWIND_CONTENT_MODULE_DIR_1
        ? TAILWIND_CONTENT_MODULE_DIR_1.replace("[module]", module)
        : null,
      TAILWIND_CONTENT_MODULE_DIR_2
        ? TAILWIND_CONTENT_MODULE_DIR_2.replace("[module]", module)
        : null,
    ].filter(Boolean);
  })
  .reduce((previous, current) => [...previous, ...current], []);

module.exports = {
  mode: "jit",
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}",
    ...transpileModulesContent,
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: require("tailwind-rn/unsupported-core-plugins"),
};
