const path = require("path");

const withLinksCreator = (linkableModules, settings) => (nextConfig) => {
  const debug = settings && settings.debug;
  const projectDirectory = settings && settings.projectDirectory;
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      if (typeof nextConfig.webpack === "function") {
        config = Object.assign({}, nextConfig.webpack(config, options));
      }

      if (process.env.NEED_TRANSPILE_LINK_MODULES) {
        if (options.isServer) {
          config.externals = ["react", ...config.externals];
        }

        if (process.env.NODE_ENV === "development") {
          console.log("NO POLLING, THAT's EVIL ");
          // config.watchOptions = {
          //   poll: 2500,
          // };
        }

        const aliases = [...linkableModules, "react", "react-dom"].reduce(
          (previous, module) => {
            return {
              ...previous,
              [module]: path.resolve(
                projectDirectory || __dirname,
                projectDirectory ? "." : "../..",
                "node_modules",
                module
              ),
            };
          },
          {}
        );

        config.resolve.alias = {
          ...config.resolve.alias,
          ...aliases,
        };

        if (debug) {
          console.log({ allAliases: config.resolve.alias });
        }
      } else {
        if (debug) {
          console.log(`Env parameter NEED_TRANSPILE_LINK_MODULES not found`);
        }
      }

      return config;
    },
  });
};

module.exports = withLinksCreator;
