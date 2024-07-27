import * as React from "react";
import { useFormContext } from "react-hook-form";
import { DayPickerSingleProps } from "react-day-picker";
import { FaCalendar } from "react-icons/fa6";
import { format, formatISO, parseISO } from "date-fns";

import { cn } from "../../util/cn";
import { Popover } from "../Popover";
import { Button } from "../Button";
import { Calendar } from "../Calendar";

export interface InputDatePickerProps
  extends Omit<DayPickerSingleProps, "mode"> {
  triggerClassName?: string;
  name?: string;
  mode?: "single";
}

const InputDatePicker = React.forwardRef<
  React.ElementRef<typeof Popover.Root>,
  React.ComponentPropsWithoutRef<typeof Popover.Root> & InputDatePickerProps
>(
  (
    { className, triggerClassName, name, ...props }: InputDatePickerProps,
    ref
  ) => {
    const formContext = useFormContext();

    if (!name) return null;

    const value = formContext.watch(name);

    return (
      <>
        <Popover.Root>
          <Popover.Trigger asChild ref={ref}>
            <Button.Root
              size="lg"
              className={cn(
                "border rounded-sm min-w-[250px] h-9 w-fit border-[--input-border]",
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

          <Popover.Content
            className={cn("bg-[--popover-background]", className)}
          >
            <Calendar
              {...props}
              mode="single"
              selected={value ?? undefined}
              onSelect={(val) => {
                if (val) {
                  return formContext.setValue(name, parseISO(formatISO(val)));
                }
              }}
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
  }
);

InputDatePicker.displayName = "DatePicker";

export { InputDatePicker };
