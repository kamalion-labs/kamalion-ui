import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import { themes as prismThemes } from "prism-react-renderer";

// NOTE: Static docs for now. Live in-Docusaurus rendering of @kamalion/web-ui
// components (webpack + @tailwindcss/postcss + aliases) is intentionally
// deferred — apps/kitchensink (Vite) is the canonical live playground.
const config: Config = {
  title: "Kamalion UI",
  tagline: "React UI library for the Kamalion ecosystem",
  favicon: "img/favicon.ico",

  future: {
    v4: true,
  },

  url: "https://kamalion.dev",
  baseUrl: "/",

  organizationName: "kamalion",
  projectName: "kamalion-ui",

  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          routeBasePath: "/",
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    navbar: {
      title: "Kamalion UI",
      items: [
        { type: "docSidebar", sidebarId: "docsSidebar", position: "left", label: "Docs" },
      ],
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
