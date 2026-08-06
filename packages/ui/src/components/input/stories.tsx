import { useState } from "react";
import { z } from "zod";
import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./index";
import { Form, useForm } from "../form";
import { Button } from "../button";

const meta: Meta<typeof Input> = {
  title: "Forms/Input",
  component: Input,
};

export default meta;
type Story = StoryObj<typeof Input>;

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.string().min(1, "Select a role"),
});
type Values = z.infer<typeof schema>;

function FormDemo() {
  const form = useForm<Values>(schema, {
    defaultValues: { name: "", role: "" },
  });
  return (
    <Form
      {...form}
      onSubmit={() => undefined}
      className="max-w-sm"
    >
      <Input<Values> name="name" required>
        <Input.Label>Name</Input.Label>
        <Input.Text placeholder="Jane Doe" />
      </Input>
      <Input<Values> name="role" required>
        <Input.Label>Role</Input.Label>
        <Input.Select placeholder="Choose…">
          <Input.Select.Item value="admin">Admin</Input.Select.Item>
          <Input.Select.Item value="viewer">Viewer</Input.Select.Item>
        </Input.Select>
      </Input>
      <Button type="submit">Submit</Button>
    </Form>
  );
}

export const FormBound: Story = { render: () => <FormDemo /> };

function StandaloneDemo() {
  const [name, setName] = useState("");
  const [on, setOn] = useState(false);
  return (
    <div className="flex max-w-sm flex-col gap-4">
      <Input>
        <Input.Label>Name</Input.Label>
        <Input.Text value={name} onValueChange={setName} placeholder="Type…" />
      </Input>
      <Input>
        <Input.Label>Notifications</Input.Label>
        <Input.Switch checked={on} onValueChange={setOn} />
      </Input>
    </div>
  );
}

export const Standalone: Story = { render: () => <StandaloneDemo /> };
