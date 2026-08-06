import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip } from "./index";
import { Button } from "../button";

const meta: Meta<typeof Tooltip> = {
  title: "Interactive/Tooltip",
  component: Tooltip,
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: () => (
    <Tooltip>
      <Tooltip.Trigger asChild>
        <Button variant="outline">Hover me</Button>
      </Tooltip.Trigger>
      <Tooltip.Content>Helpful hint</Tooltip.Content>
    </Tooltip>
  ),
};
