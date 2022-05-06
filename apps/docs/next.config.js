const withPlugins = require("next-compose-plugins");
const withTM = require("next-transpile-modules")(["ui"]);

module.exports = withPlugins([withTM], {
  reactStrictMode: true,
  webpack: (config, options) => {
    //this is to be able to import svg files in this project (also in any dependencies)
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
});
