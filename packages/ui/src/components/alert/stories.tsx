import type { Meta, StoryObj } from "@storybook/react";
import { Alert } from "./index";

const meta: Meta<typeof Alert> = {
  title: "Display/Alert",
  component: Alert,
  args: { variant: "info" },
  argTypes: {
    variant: {
      control: "select",
      options: ["info", "success", "warning", "danger"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  render: (args) => (
    <Alert {...args}>
      <Alert.Icon />
      <Alert.Content>
        <Alert.Title>Heads up</Alert.Title>
        <Alert.Description>
          This is an alert describing what happened.
        </Alert.Description>
      </Alert.Content>
    </Alert>
  ),
};

export const All: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      {(["info", "success", "warning", "danger"] as const).map((v) => (
        <Alert key={v} variant={v}>
          <Alert.Icon />
          <Alert.Content>
            <Alert.Title>{v}</Alert.Title>
            <Alert.Description>A {v} message.</Alert.Description>
          </Alert.Content>
        </Alert>
      ))}
    </div>
  ),
};
