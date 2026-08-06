import type { Meta, StoryObj } from "@storybook/react";
import { Modal, useModal } from "./index";
import { Button } from "../button";
import { Text } from "../text";

const meta: Meta<typeof Modal> = {
  title: "Interactive/Modal",
  component: Modal,
};

export default meta;
type Story = StoryObj<typeof Modal>;

function ImperativeDemo() {
  const { openModal } = useModal();
  return (
    <Button
      variant="danger"
      onClick={() =>
        openModal({
          title: "Delete item",
          description: "Are you sure? This cannot be undone.",
          confirmLabel: "Delete",
          cancelLabel: "Cancel",
          danger: true,
          onConfirm: async () => {
            await new Promise((r) => setTimeout(r, 500));
          },
        })
      }
    >
      Confirm dialog (useModal)
    </Button>
  );
}

export const Imperative: Story = { render: () => <ImperativeDemo /> };

export const Declarative: Story = {
  render: () => (
    <Modal>
      <Modal.Trigger asChild>
        <Button variant="soft">Open modal</Button>
      </Modal.Trigger>
      <Modal.Content>
        <Modal.Header>Declarative modal</Modal.Header>
        <Modal.Body>
          <Text.Paragraph>Composed from Modal subcomponents.</Text.Paragraph>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Close asChild>
            <Button variant="ghost">Close</Button>
          </Modal.Close>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  ),
};
