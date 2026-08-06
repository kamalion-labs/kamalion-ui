import type { Meta, StoryObj } from "@storybook/react";
import { Page } from "./index";
import { Text } from "../text";

const meta: Meta<typeof Page> = {
  title: "App Shell/Page",
  component: Page,
};

export default meta;
type Story = StoryObj<typeof Page>;

export const Default: Story = {
  render: () => (
    <div className="h-96 overflow-hidden rounded-(--radius-panel) border border-(--color-surface-panel-border) bg-(--color-surface-panel)">
      <Page>
        <div className="flex h-full flex-1 flex-col">
          <Page.Header>
            <Page.Header.Title>Dashboard</Page.Header.Title>
            <Page.Header.Subtitle>Overview of your workspace</Page.Header.Subtitle>
          </Page.Header>
          <Page.Content className="p-6">
            <Text.Paragraph>Main content area.</Text.Paragraph>
          </Page.Content>
        </div>
        <Page.Sidebar>
          <Page.Sidebar.Header>Details</Page.Sidebar.Header>
          <Page.Sidebar.Content>
            <Text.Muted>Auxiliary panel.</Text.Muted>
          </Page.Sidebar.Content>
        </Page.Sidebar>
      </Page>
    </div>
  ),
};
