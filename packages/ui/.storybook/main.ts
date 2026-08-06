import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/components/**/stories.tsx"],
  addons: ["@storybook/addon-essentials", "@storybook/addon-a11y"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  async viteFinal(baseConfig) {
    // Reuse the exact consumer pipeline (Tailwind v4 + aliases) so stories
    // compile like a real app.
    const { mergeConfig } = await import("vite");
    const { kamalion } = await import("../src/vite/index.mjs");
    return mergeConfig(baseConfig, {
      plugins: [kamalion()],
    });
  },
};

export default config;
