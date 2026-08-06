import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Calendar } from "./index";

const meta: Meta<typeof Calendar> = {
  title: "Data/Calendar",
  component: Calendar,
};

export default meta;
type Story = StoryObj<typeof Calendar>;

function Demo() {
  const [date, setDate] = useState<Date>();
  return <Calendar mode="single" selected={date} onSelect={setDate} />;
}

export const Single: Story = { render: () => <Demo /> };
