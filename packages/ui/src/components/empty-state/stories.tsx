import type { Meta, StoryObj } from "@storybook/react";
import { Plus, Users } from "lucide-react";
import { Button } from "../button";
import { EmptyState } from "./index";

const meta: Meta<typeof EmptyState> = {
  title: "Display/EmptyState",
  component: EmptyState,
  args: {
    title: "No clients yet",
    description: "Add your first client to start booking sessions.",
    size: "md",
  },
  argTypes: {
    size: { control: "select", options: ["sm", "md"] },
  },
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {};

export const WithAction: Story = {
  args: {
    icon: <Users />,
    action: (
      <Button>
        <Button.Icon>
          <Plus />
        </Button.Icon>
        <Button.Content>New client</Button.Content>
      </Button>
    ),
  },
};

/** `sm` is the inline size, for an empty Card body or table. */
export const Small: Story = {
  args: { size: "sm", description: undefined },
};
