import type { Meta, StoryObj } from "@storybook/react";
import { ToastProvider, useToast } from "./index";
import { Button } from "../button";

const meta: Meta<typeof ToastProvider> = {
  title: "Interactive/Toast",
  component: ToastProvider,
};

export default meta;
type Story = StoryObj<typeof ToastProvider>;

function Demo() {
  const { toast } = useToast();
  return (
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
  );
}

export const Default: Story = {
  render: () => <Demo />,
};
