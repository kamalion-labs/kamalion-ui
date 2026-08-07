import type { Meta, StoryObj } from "@storybook/react";
import { FileText } from "lucide-react";
import { Badge } from "../badge";
import { Accordion } from "./index";

const meta: Meta<typeof Accordion> = {
  title: "Interactive/Accordion",
  component: Accordion,
  args: { type: "single", collapsible: true },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  render: (args) => (
    <Accordion {...args} className="w-96">
      <Accordion.Item value="parties">
        <Accordion.Trigger>Parties</Accordion.Trigger>
        <Accordion.Content>Who is signing this contract.</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="scope">
        <Accordion.Trigger>Scope</Accordion.Trigger>
        <Accordion.Content>
          What is being delivered, and when.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="payment">
        <Accordion.Trigger>Payment</Accordion.Trigger>
        <Accordion.Content>
          Amounts, instalments and due dates.
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  ),
};

export const WithIconAndTrailing: Story = {
  render: (args) => (
    <Accordion {...args} className="w-96">
      <Accordion.Item value="clauses">
        <Accordion.Trigger
          icon={<FileText />}
          trailing={<Badge size="sm">12</Badge>}
        >
          Clauses
        </Accordion.Trigger>
        <Accordion.Content>Twelve clauses in this template.</Accordion.Content>
      </Accordion.Item>
    </Accordion>
  ),
};

/** `type="multiple"` lets several sections stay open — the shape a long form
 *  editor wants. */
export const Multiple: Story = {
  // `collapsible` belongs to the single-type union only, so it is absent here.
  args: { type: "multiple" },
  render: (args) => (
    <Accordion {...args} className="w-96">
      <Accordion.Item value="a">
        <Accordion.Trigger>First</Accordion.Trigger>
        <Accordion.Content>
          Open me and the next one together.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="b">
        <Accordion.Trigger>Second</Accordion.Trigger>
        <Accordion.Content>Both stay open.</Accordion.Content>
      </Accordion.Item>
    </Accordion>
  ),
};
