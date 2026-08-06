import type { Meta, StoryObj } from "@storybook/react";
import { ThemeSelector } from "./index";
import { ThemeProvider } from "../theme";

const meta: Meta<typeof ThemeSelector> = {
  title: "App Shell/ThemeSelector",
  component: ThemeSelector,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ThemeSelector>;

export const Default: Story = { render: () => <ThemeSelector /> };
