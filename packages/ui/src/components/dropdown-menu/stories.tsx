import type { Meta, StoryObj } from "@storybook/react";
import { Copy, Pencil, Trash2, User } from "lucide-react";
import { Button } from "../button";
import { DropdownMenu } from "./index";

const meta: Meta<typeof DropdownMenu> = {
  title: "Interactive/DropdownMenu",
  component: DropdownMenu,
};

export default meta;
type Story = StoryObj<typeof DropdownMenu>;

export const Default: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenu.Trigger asChild>
        <Button variant="outline">Actions</Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Label>Session</DropdownMenu.Label>
        <DropdownMenu.Item icon={<Pencil />}>Edit</DropdownMenu.Item>
        <DropdownMenu.Item icon={<Copy />} shortcut="⌘D">
          Duplicate
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item variant="danger" icon={<Trash2 />}>
          Delete
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu>
  ),
};

export const WithSubmenu: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenu.Trigger asChild>
        <Button variant="outline">Assign</Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item icon={<User />}>Me</DropdownMenu.Item>
        <DropdownMenu.Sub>
          <DropdownMenu.SubTrigger>Someone else</DropdownMenu.SubTrigger>
          <DropdownMenu.SubContent>
            <DropdownMenu.Item>Ana</DropdownMenu.Item>
            <DropdownMenu.Item>Bruno</DropdownMenu.Item>
          </DropdownMenu.SubContent>
        </DropdownMenu.Sub>
      </DropdownMenu.Content>
    </DropdownMenu>
  ),
};
