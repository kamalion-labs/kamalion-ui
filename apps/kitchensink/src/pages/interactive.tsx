import {
  Button,
  Card,
  Modal,
  Popover,
  Text,
  Tooltip,
  useModal,
  useToast,
} from "@kamalion/web-ui";

export function TooltipPage() {
  return (
    <div className="flex flex-col gap-6">
      <Text.H1>Tooltip</Text.H1>
      <div className="flex gap-4">
        <Tooltip>
          <Tooltip.Trigger asChild>
            <Button variant="outline">Hover me</Button>
          </Tooltip.Trigger>
          <Tooltip.Content>Helpful hint</Tooltip.Content>
        </Tooltip>
      </div>
    </div>
  );
}

export function PopoverPage() {
  return (
    <div className="flex flex-col gap-6">
      <Text.H1>Popover</Text.H1>
      <Popover>
        <Popover.Trigger asChild>
          <Button variant="soft">Open popover</Button>
        </Popover.Trigger>
        <Popover.Content>
          <div className="flex flex-col gap-2 p-2">
            <Text.Small>Popover panel</Text.Small>
            <Text.Muted>Floating content anchored to the trigger.</Text.Muted>
          </div>
        </Popover.Content>
      </Popover>

      <div>
        <Button.Dropdown
          variant="solid"
          menu={
            <div className="flex flex-col">
              <button className="rounded-(--radius-card) px-3 py-2 text-left text-sm hover:bg-(--color-surface-panel-muted)">
                Edit
              </button>
              <button className="rounded-(--radius-card) px-3 py-2 text-left text-sm hover:bg-(--color-surface-panel-muted)">
                Duplicate
              </button>
              <button className="rounded-(--radius-card) px-3 py-2 text-left text-sm text-(--color-danger) hover:bg-(--color-danger-soft)">
                Delete
              </button>
            </div>
          }
        >
          Actions
        </Button.Dropdown>
      </div>
    </div>
  );
}

export function CardPage() {
  return (
    <div className="flex flex-col gap-6">
      <Text.H1>Card</Text.H1>
      <Card className="max-w-sm">
        <Card.Header>
          <Text.Large>Project settings</Text.Large>
          <Text.Muted>Manage how your project behaves.</Text.Muted>
        </Card.Header>
        <Card.Body>
          <Text.Paragraph>
            Card body content sits on an elevated surface panel.
          </Text.Paragraph>
        </Card.Body>
        <Card.Footer>
          <Button variant="ghost">Cancel</Button>
          <Button>Save</Button>
        </Card.Footer>
      </Card>
    </div>
  );
}

export function ToastPage() {
  const { toast } = useToast();
  return (
    <div className="flex flex-col gap-6">
      <Text.H1>Toast</Text.H1>
      <div className="flex flex-wrap gap-3">
        <Button
          onClick={() =>
            toast({
              title: "Changes saved",
              description: "Your settings were updated.",
              variant: "success",
            })
          }
        >
          Success toast
        </Button>
        <Button
          variant="danger"
          onClick={() =>
            toast({
              title: "Something went wrong",
              description: "Please try again.",
              variant: "danger",
            })
          }
        >
          Danger toast
        </Button>
      </div>
    </div>
  );
}

export function ModalPage() {
  const { openModal } = useModal();
  return (
    <div className="flex flex-col gap-6">
      <Text.H1>Modal</Text.H1>
      <div className="flex flex-wrap gap-3">
        <Button
          variant="danger"
          onClick={() =>
            openModal({
              title: "Delete item",
              description:
                "Are you sure you want to delete this item? This cannot be undone.",
              confirmLabel: "Delete",
              cancelLabel: "Cancel",
              danger: true,
              onConfirm: async () => {
                await new Promise((r) => setTimeout(r, 600));
              },
            })
          }
        >
          Confirm dialog
        </Button>

        <Modal>
          <Modal.Trigger asChild>
            <Button variant="soft">Declarative modal</Button>
          </Modal.Trigger>
          <Modal.Content>
            <Modal.Header>Declarative modal</Modal.Header>
            <Modal.Body>
              <Text.Paragraph>
                Built from Modal.Root / Trigger / Content / Header / Body /
                Footer.
              </Text.Paragraph>
            </Modal.Body>
            <Modal.Footer>
              <Modal.Close asChild>
                <Button variant="ghost">Close</Button>
              </Modal.Close>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </div>
    </div>
  );
}
