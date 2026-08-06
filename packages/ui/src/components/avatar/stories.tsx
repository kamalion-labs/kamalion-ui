import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "./index";

const meta: Meta<typeof Avatar> = {
  title: "Display/Avatar",
  component: Avatar,
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      {(["sm", "md", "lg", "xl"] as const).map((size) => (
        <Avatar key={size} size={size}>
          <Avatar.Fallback>{size.toUpperCase()}</Avatar.Fallback>
        </Avatar>
      ))}
    </div>
  ),
};

export const WithImageAndStatus: Story = {
  render: () => (
    <Avatar size="lg">
      <Avatar.Image src="https://i.pravatar.cc/100?img=12" alt="User" />
      <Avatar.Fallback>US</Avatar.Fallback>
      <Avatar.Overlay />
    </Avatar>
  ),
};
