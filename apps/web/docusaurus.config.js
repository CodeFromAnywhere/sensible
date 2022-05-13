// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Sensible",
  tagline: "The Typescript Framework for Effective Teams",
  url: "https://doc.sensible.to",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  // organizationName: 'Code-From-Anywhere', // Usually your GitHub org/user name.
  // projectName: 'sensible', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },
  plugins: [
    async function myPlugin(context, options) {
      return {
        name: "docusaurus-tailwindcss",
        configurePostCss(postcssOptions) {
          // Appends TailwindCSS and AutoPrefixer.
          postcssOptions.plugins.push(require("tailwindcss"));
          postcssOptions.plugins.push(require("autoprefixer"));
          return postcssOptions;
        },
      };
    },
  ],
  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: "../../docs",
          routeBasePath: "/",
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/Code-From-Anywhere/sensible/tree/main/apps/web/",
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/Code-From-Anywhere/sensible/tree/main/apps/web/",
        },

        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "Sensible",
        logo: {
          alt: "Sensible logo",
          src: "img/icon.png",
        },
        items: [
          {
            type: "doc",
            docId: "docs/about/about",
            position: "left",
            label: "Documentation",
          },
          {
            type: "doc",
            docId: "jobs/coworksurf",
            position: "left",
            label: "Jobs",
          },
          {
            type: "doc",
            docId: "ideas/ideas",
            position: "left",
            label: "Ideas",
          },
          // { to: "/blog", label: "Blog", position: "left" },

          {
            href: "https://join.slack.com/t/codefromanywhere/shared_invite/zt-18r6mfudt-Zhb7FaZ70WlWVI1a_ZxgPw",
            position: "right",
            label: "Community",
          },
          {
            href: "https://github.com/Code-From-Anywhere/sensible",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Documentation",
            items: [
              {
                label: "Documentation",
                to: "/docs/docs/about",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Twitter",
                href: "https://twitter.com/cfa_company",
              },
            ],
          },
          {
            title: "More",
            items: [
              // {
              //   label: "Blog",
              //   to: "/blog",
              // },
              {
                label: "GitHub",
                href: "https://github.com/Code-From-Anywhere/sensible",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Sensible`,
      },
      // prism: {
      //   theme: lightCodeTheme,
      //   darkTheme: darkCodeTheme,
      // },
    }),
};

module.exports = config;
