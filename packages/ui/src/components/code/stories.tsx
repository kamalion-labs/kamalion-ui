import type { Meta, StoryObj } from "@storybook/react";
import { Code } from "./index";

const meta: Meta<typeof Code> = {
  title: "Display/Code",
  component: Code,
};

export default meta;
type Story = StoryObj<typeof Code>;

export const Inline: Story = {
  render: () => <Code.Inline>npm install @kamalion/web-ui</Code.Inline>,
};

export const Block: Story = {
  render: () => (
    <Code.Block>{`import { Button } from "@kamalion/web-ui";

export const App = () => <Button>Click</Button>;`}</Code.Block>
  ),
};
