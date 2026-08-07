import type { Meta, StoryObj } from "@storybook/react";
import { Tabs } from "./index";

const meta: Meta<typeof Tabs> = {
  title: "Navigation/Tabs",
  component: Tabs,
  args: { defaultValue: "all", variant: "line", size: "md" },
  argTypes: {
    variant: { control: "select", options: ["line", "pill", "segmented"] },
    size: { control: "select", options: ["sm", "md"] },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

const panels = (
  <>
    <Tabs.Content value="all">Every review.</Tabs.Content>
    <Tabs.Content value="pending">Waiting on you.</Tabs.Content>
    <Tabs.Content value="approved">Published.</Tabs.Content>
  </>
);

export const Default: Story = {
  render: (args) => (
    <Tabs {...args}>
      <Tabs.List>
        <Tabs.Trigger value="all">All</Tabs.Trigger>
        <Tabs.Trigger value="pending">Pending</Tabs.Trigger>
        <Tabs.Trigger value="approved">Approved</Tabs.Trigger>
      </Tabs.List>
      {panels}
    </Tabs>
  ),
};

/** Counts in the trailing slot — the shape a filter bar actually needs. */
export const WithCounts: Story = {
  render: (args) => (
    <Tabs {...args}>
      <Tabs.List>
        <Tabs.Trigger value="all" trailing="128">
          All
        </Tabs.Trigger>
        <Tabs.Trigger value="pending" trailing="4">
          Pending
        </Tabs.Trigger>
        <Tabs.Trigger value="approved" trailing="124">
          Approved
        </Tabs.Trigger>
      </Tabs.List>
      {panels}
    </Tabs>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      {(["line", "pill", "segmented"] as const).map((variant) => (
        <Tabs key={variant} defaultValue="all" variant={variant}>
          <Tabs.List>
            <Tabs.Trigger value="all">All</Tabs.Trigger>
            <Tabs.Trigger value="pending">Pending</Tabs.Trigger>
            <Tabs.Trigger value="approved">Approved</Tabs.Trigger>
          </Tabs.List>
          {panels}
        </Tabs>
      ))}
    </div>
  ),
};
