import type { Meta, StoryObj } from "@storybook/react";
import { Loading } from "./index";

const meta: Meta<typeof Loading> = {
  title: "Display/Loading",
  component: Loading,
};

export default meta;
type Story = StoryObj<typeof Loading>;

export const Local: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <Loading.Local size="sm" />
      <Loading.Local size="md" label="Loading…" />
      <Loading.Local size="lg" />
    </div>
  ),
};
