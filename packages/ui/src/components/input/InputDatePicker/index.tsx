import { useState } from "react";
import { CalendarDays } from "lucide-react";
import { cn } from "../../../util";
import { Calendar } from "../../calendar";
import { Popover } from "../../popover";
import { useControlGeometry } from "../context";
import { useInputField } from "../hooks";
import { FieldError } from "../shared";
import { controlVariants, type ControlShape, type ControlSize } from "../variants";

export interface InputDatePickerProps {
  value?: Date;
  onValueChange?: (value: Date | undefined) => void;
  placeholder?: string;
  /** Overrides the size inherited from the surrounding `<Input>`. */
  size?: ControlSize;
  /** Overrides the shape inherited from the surrounding `<Input>`. */
  shape?: ControlShape;
  className?: string;
  classNameCalendar?: string;
}

/** Date selection field showing a Calendar in a popover. */
export function InputDatePicker({
  value,
  onValueChange,
  placeholder = "Pick a date",
  size,
  shape,
  className,
  classNameCalendar,
}: InputDatePickerProps) {
  const field = useInputField<Date | undefined>({ value, onValueChange });
  const geometry = useControlGeometry({ size, shape });
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
              controlVariants(geometry),
              "flex items-center justify-between gap-2 text-left",
              "data-[state=open]:border-(--color-accent)",
              !selected && "text-(--color-foreground-subtle)",
              className,
            )}
          >
            {selected ? selected.toLocaleDateString() : placeholder}
            <CalendarDays className="size-4 shrink-0 text-(--color-foreground-subtle)" />
          </button>
        </Popover.Trigger>
        <Popover.Content align="start" className="w-auto p-0">
          {/* The popover already draws the border, radius and elevation —
              without this the calendar's own chrome doubles it up. */}
          <Calendar
            mode="single"
            selected={selected}
            onSelect={(date) => {
              field.setValue(date);
              setOpen(false);
            }}
            classNameWrapper={cn("border-0 bg-transparent shadow-none", classNameCalendar)}
          />
        </Popover.Content>
      </Popover>
      <FieldError error={field.error} />
    </>
  );
}
