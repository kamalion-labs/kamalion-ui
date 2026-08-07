import type { Preview } from "@storybook/react";
import { useEffect } from "react";
// Keep in sync with `apps/kitchensink/src/main.tsx` — without these Storybook
// renders in the platform UI font while the kitchensink renders in Inter, and
// the discrepancy looks like a bug in the library.
import "@fontsource-variable/inter";
import "@fontsource-variable/jetbrains-mono";
import "../src/styles/index.css";
import { Tooltip } from "../src/components/tooltip";
import { ToastProvider } from "../src/components/toast";
import { ModalProvider } from "../src/components/modal";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: { color: /(background|color)$/i, date: /Date$/i },
    },
    a11y: { test: "todo" },
  },
  globalTypes: {
    theme: {
      description: "Kamalion theme mode",
      defaultValue: "light",
      toolbar: {
        title: "Theme",
        icon: "contrast",
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = (context.globals.theme as string) ?? "light";

      // Apply the theme to <html> so portaled content (toasts/modals/popovers)
      // inherits tokens — mirrors how a real app wires the theme.
      useEffect(() => {
        const root = document.documentElement;
        root.classList.remove("theme-light", "theme-dark");
        root.classList.add(`theme-${theme}`);
      }, [theme]);

      const background =
        theme === "dark"
          ? "linear-gradient(135deg, #1e293b, #0f172a)"
          : "linear-gradient(135deg, #fed7aa, #e0f2fe)";

      return (
        <Tooltip.Provider>
          <ToastProvider>
            <ModalProvider>
              <div style={{ padding: "3rem", minHeight: "100vh", background }}>
                <Story />
              </div>
            </ModalProvider>
          </ToastProvider>
        </Tooltip.Provider>
      );
    },
  ],
};

export default preview;
