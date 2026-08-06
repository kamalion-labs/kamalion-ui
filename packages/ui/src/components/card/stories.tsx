import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "./index";
import { Button } from "../button";
import { Text } from "../text";

const meta: Meta<typeof Card> = {
  title: "Interactive/Card",
  component: Card,
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card className="max-w-sm">
      <Card.Header>
        <Text.Large>Project settings</Text.Large>
        <Text.Muted>Manage how your project behaves.</Text.Muted>
      </Card.Header>
      <Card.Body>
        <Text.Paragraph>Card body content on an elevated surface.</Text.Paragraph>
      </Card.Body>
      <Card.Footer>
        <Button variant="ghost">Cancel</Button>
        <Button>Save</Button>
      </Card.Footer>
    </Card>
  ),
};
