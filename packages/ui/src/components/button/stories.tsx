import type { Meta, StoryObj } from "@storybook/react";
import { Plus } from "lucide-react";
import { Button } from "./index";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  args: {
    children: "Button",
    variant: "solid",
    size: "md",
    loading: false,
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["solid", "soft", "outline", "ghost", "danger"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "icon"],
    },
    loading: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Solid: Story = { args: { variant: "solid" } };
export const Soft: Story = { args: { variant: "soft" } };
export const Outline: Story = { args: { variant: "outline" } };
export const Ghost: Story = { args: { variant: "ghost" } };
export const Danger: Story = { args: { variant: "danger" } };

export const WithIcon: Story = {
  render: (args) => (
    <Button {...args}>
      <Button.Icon>
        <Plus />
      </Button.Icon>
      <Button.Content>New item</Button.Content>
    </Button>
  ),
};

export const Loading: Story = { args: { loading: true } };

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-3">
      <Button {...args} size="sm">
        Small
      </Button>
      <Button {...args} size="md">
        Medium
      </Button>
      <Button {...args} size="lg">
        Large
      </Button>
    </div>
  ),
};
