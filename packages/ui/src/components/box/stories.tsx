import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "./index";

const meta: Meta<typeof Box> = {
  title: "Primitives/Box",
  component: Box,
};

export default meta;
type Story = StoryObj<typeof Box>;

export const Default: Story = {
  render: () => (
    <Box className="flex gap-3">
      <Box className="rounded-(--radius-card) bg-(--color-accent-soft) p-4 text-(--color-accent)">
        div (default)
      </Box>
      <Box
        as="section"
        className="rounded-(--radius-card) bg-(--color-surface-panel-muted) p-4 text-(--color-foreground)"
      >
        as="section"
      </Box>
    </Box>
  ),
};
