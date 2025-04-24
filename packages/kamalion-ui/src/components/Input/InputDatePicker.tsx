"use client";

import * as React from "react";
import { useFormContext } from "react-hook-form";
import { PropsSingle } from "react-day-picker";
import { FaCalendar } from "react-icons/fa6";

import { cn } from "../../util/cn";
import { Popover } from "../Popover";
import { Button } from "../Button";
import { Calendar } from "../Calendar";
import { Input } from "../..";
import { formatISO, parseISO } from "date-fns";

export interface InputDatePickerProps extends Omit<PropsSingle, "mode" | "required"> {
  triggerClassName?: string;
  name?: string;
  mode?: "single";
  className?: string;
  required?: boolean;
}

const InputDatePicker = React.forwardRef<
  React.ComponentRef<typeof Popover.Root>,
  React.ComponentPropsWithoutRef<typeof Popover.Root> & InputDatePickerProps
>(({ className, triggerClassName, name, required, ...props }: InputDatePickerProps, ref) => {
  const formContext = useFormContext();

  if (!name) return null;

  const value = formContext.watch(name);
  // console.log({value});
  const dateVal = value && value !== "" ? parseISO(value) : undefined;

  return (
    <>
      <div className="flex w-full relative items-center">
        <Input.Mask type="date" className="" name={name} noError />
        
        <Popover.Root>
          <Popover.Trigger asChild ref={ref}>
            <Button.Root
              size="icon"
              className={cn(
                "absolute right-px h-7 bg-transparent border-0 border-l rounded-l-none",
                "focus:ring-0 focus:border-(--input-ring) focus:border focus:rounded-l outline-none",
                triggerClassName
              )}
            >
              <Button.Icon>
                <FaCalendar />
              </Button.Icon>
            </Button.Root>
          </Popover.Trigger>

          <Popover.Content className={className}>
            <Calendar
              {...props}
              mode="single"
              required={required}
              selected={dateVal}
              onSelect={(val) => {
                if (val) {
                  // console.log({val});
                  return formContext.setValue(
                    name,
                    formatISO(val)
                  );
                }
              }}
            />
          </Popover.Content>
        </Popover.Root>
      </div>

      {name && formContext.formState?.errors?.[name] && <div className="text-red-400">{formContext.formState?.errors?.[name]?.message?.toString()}</div>}
    </>
  );
});

InputDatePicker.displayName = "DatePicker";

export { InputDatePicker };
