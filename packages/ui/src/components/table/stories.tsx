import type { Meta, StoryObj } from "@storybook/react";
import { Table } from "./index";
import { Badge } from "../badge";

const meta: Meta<typeof Table> = {
  title: "Data/Table",
  component: Table,
};

export default meta;
type Story = StoryObj<typeof Table>;

export const Default: Story = {
  render: () => (
    <Table.Container>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.Head sortable sortDirection="asc">
              Name
            </Table.Head>
            <Table.Head>Role</Table.Head>
            <Table.Head>Status</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {[
            { name: "Ada", role: "Admin", active: true },
            { name: "Linus", role: "Editor", active: false },
          ].map((r) => (
            <Table.Row key={r.name}>
              <Table.Cell>{r.name}</Table.Cell>
              <Table.Cell>{r.role}</Table.Cell>
              <Table.Cell>
                <Badge variant={r.active ? "success" : "default"}>
                  {r.active ? "Active" : "Inactive"}
                </Badge>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Table.Container>
  ),
};
