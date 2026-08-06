import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "./index";

const meta: Meta<typeof Text> = {
  title: "Primitives/Text",
  component: Text,
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Typography: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Text.H1>Heading 1</Text.H1>
      <Text.H2>Heading 2</Text.H2>
      <Text.H3>Heading 3</Text.H3>
      <Text.Lead>A lead paragraph with emphasis.</Text.Lead>
      <Text.Paragraph>A standard body paragraph.</Text.Paragraph>
      <Text.Muted>Muted secondary text.</Text.Muted>
      <Text.Caption>Caption text.</Text.Caption>
      <Text.Blockquote>“A well-designed system is quiet.”</Text.Blockquote>
      <Text.Paragraph>
        Inline <Text.Code>code()</Text.Code> sample.
      </Text.Paragraph>
    </div>
  ),
};
