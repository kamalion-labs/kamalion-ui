import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./index";

const meta: Meta<typeof Badge> = {
  title: "Display/Badge",
  component: Badge,
  args: { children: "Badge", variant: "default" },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "accent",
        "success",
        "warning",
        "danger",
        "info",
        "outline",
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {};

export const All: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {(
        [
          "default",
          "accent",
          "success",
          "warning",
          "danger",
          "info",
          "outline",
        ] as const
      ).map((v) => (
        <Badge key={v} variant={v}>
          {v}
        </Badge>
      ))}
    </div>
  ),
};
