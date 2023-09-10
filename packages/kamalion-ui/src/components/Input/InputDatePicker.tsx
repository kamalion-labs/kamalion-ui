import * as React from "react";
import { useFormContext } from "react-hook-form";
import { DayPicker } from "react-day-picker";
import { FaCalendar } from "react-icons/fa6";
import { format } from "date-fns";

import { cn } from "../../util/cn";
import { Popover } from "../Popover";
import { Button } from "../Button";
import { Calendar } from "../Calendar";

type InputDatePickerTriggerProps = {
  triggerClassName?: string;
};

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

export type InputDatePickerProps = React.InputHTMLAttributes<HTMLInputElement> &
  InputDatePickerTriggerProps;

const InputDatePicker = ({
  className,
  triggerClassName,
  name,
}: InputDatePickerProps) => {
  const formContext = useFormContext();

  if (!name) return null;

  const value = formContext.watch(name);

  return (
    <>
      <Popover.Root>
        <Popover.Trigger asChild>
          <Button.Root
            size="lg"
            className={cn(
              "border rounded-sm border-[--input-border]",
              triggerClassName
            )}
          >
            <Button.Content className="flex flex-1 justify-start">
              {value ? format(value, "dd/MM/yyyy") : "Selecione uma data..."}
            </Button.Content>

            <Button.Icon>
              <FaCalendar />
            </Button.Icon>
          </Button.Root>
        </Popover.Trigger>

        <Popover.Content className={cn("bg-[--popover-background]", className)}>
          <Calendar
            mode="single"
            selected={value}
            onSelect={(val) => formContext.setValue(name, val)}
          />
        </Popover.Content>
      </Popover.Root>

      {name && (
        <div className="text-red-400">
          {formContext.formState?.errors?.[name]?.message?.toString()}
        </div>
      )}
    </>
  );
};

InputDatePicker.displayName = "DatePicker";

export { InputDatePicker };
