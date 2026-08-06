import { Home, Settings } from "lucide-react";
import type { Meta, StoryObj } from "@storybook/react";
import { Navbar } from "./index";

const meta: Meta<typeof Navbar> = {
  title: "App Shell/Navbar",
  component: Navbar,
};

export default meta;
type Story = StoryObj<typeof Navbar>;

export const Default: Story = {
  render: () => (
    <div className="h-80 overflow-hidden rounded-(--radius-panel) border border-(--color-surface-panel-border) bg-(--color-surface-panel-muted)">
      <Navbar className="h-full">
        <Navbar.Header>
          <span className="text-sm font-semibold">Acme Inc.</span>
          <Navbar.Trigger />
        </Navbar.Header>
        <Navbar.Content>
          <Navbar.Menu>
            <Navbar.Menu.Item active>
              <Home />
              Home
            </Navbar.Menu.Item>
            <Navbar.Menu.Item defaultOpen>
              <Navbar.Menu.Item.Trigger>
                <Settings />
                Reports
              </Navbar.Menu.Item.Trigger>
              <Navbar.Menu.Item.Content>
                <Navbar.Menu.Item>Monthly</Navbar.Menu.Item>
                <Navbar.Menu.Item>Yearly</Navbar.Menu.Item>
              </Navbar.Menu.Item.Content>
            </Navbar.Menu.Item>
          </Navbar.Menu>
        </Navbar.Content>
      </Navbar>
    </div>
  ),
};
