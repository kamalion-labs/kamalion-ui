import { useState } from "react";
import { CalendarDays } from "lucide-react";
import { cn } from "../../../util";
import { Calendar } from "../../calendar";
import { Popover } from "../../popover";
import { useInputField } from "../hooks";
import { controlBase, FieldError } from "../shared";

export interface InputDatePickerProps {
  value?: Date;
  onValueChange?: (value: Date | undefined) => void;
  placeholder?: string;
  className?: string;
}

/** Date selection field showing a Calendar in a popover. */
export function InputDatePicker({
  value,
  onValueChange,
  placeholder = "Pick a date",
  className,
}: InputDatePickerProps) {
  const field = useInputField<Date | undefined>({ value, onValueChange });
  const [open, setOpen] = useState(false);
  const selected = field.value instanceof Date ? field.value : undefined;

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <Popover.Trigger asChild>
          <button
            type="button"
            id={field.id}
            disabled={field.disabled}
            aria-invalid={field.invalid || undefined}
            className={cn(
              controlBase,
              "flex items-center justify-between gap-2 text-left",
              !selected && "text-(--color-foreground-subtle)",
              className,
            )}
          >
            {selected ? selected.toLocaleDateString() : placeholder}
            <CalendarDays className="size-4 opacity-60" />
          </button>
        </Popover.Trigger>
        <Popover.Content align="start" className="w-auto p-0">
          <Calendar
            mode="single"
            selected={selected}
            onSelect={(date) => {
              field.setValue(date);
              setOpen(false);
            }}
          />
        </Popover.Content>
      </Popover>
      <FieldError error={field.error} />
    </>
  );
}
