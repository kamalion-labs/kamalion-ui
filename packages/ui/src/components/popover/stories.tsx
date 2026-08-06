import type { Meta, StoryObj } from "@storybook/react";
import { Popover } from "./index";
import { Button } from "../button";
import { Text } from "../text";

const meta: Meta<typeof Popover> = {
  title: "Interactive/Popover",
  component: Popover,
};

export default meta;
type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  render: () => (
    <Popover>
      <Popover.Trigger asChild>
        <Button variant="soft">Open popover</Button>
      </Popover.Trigger>
      <Popover.Content>
        <div className="flex flex-col gap-2 p-2">
          <Text.Small>Popover panel</Text.Small>
          <Text.Muted>Floating content anchored to the trigger.</Text.Muted>
        </div>
      </Popover.Content>
    </Popover>
  ),
};
