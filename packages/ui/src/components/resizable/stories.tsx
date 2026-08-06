import type { Meta, StoryObj } from "@storybook/react";
import { Resizable } from "./index";

const meta: Meta<typeof Resizable> = {
  title: "App Shell/Resizable",
  component: Resizable,
};

export default meta;
type Story = StoryObj<typeof Resizable>;

const panel =
  "flex h-full items-center justify-center bg-(--color-surface-panel-muted) text-sm text-(--color-foreground-muted)";

export const Horizontal: Story = {
  render: () => (
    <div className="h-64 w-full overflow-hidden rounded-(--radius-panel) border border-(--color-surface-panel-border)">
      <Resizable direction="horizontal">
        <Resizable.Panel defaultSize={40} minSize={20}>
          <div className={panel}>Left</div>
        </Resizable.Panel>
        <Resizable.Handle withGrip />
        <Resizable.Panel minSize={20}>
          <div className={panel}>Right</div>
        </Resizable.Panel>
      </Resizable>
    </div>
  ),
};
