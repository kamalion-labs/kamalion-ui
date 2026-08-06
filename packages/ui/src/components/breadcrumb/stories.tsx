import type { Meta, StoryObj } from "@storybook/react";
import { Breadcrumb } from "./index";

const meta: Meta<typeof Breadcrumb> = {
  title: "Display/Breadcrumb",
  component: Breadcrumb,
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

export const Default: Story = {
  render: () => (
    <Breadcrumb>
      <Breadcrumb.Item>
        <Breadcrumb.Link href="#">Home</Breadcrumb.Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <Breadcrumb.Link href="#">Components</Breadcrumb.Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <Breadcrumb.Current>Breadcrumb</Breadcrumb.Current>
      </Breadcrumb.Item>
    </Breadcrumb>
  ),
};
