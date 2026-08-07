import * as RadixCheckbox from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "../../../util";
import { useInputField } from "../hooks";
import { FieldError } from "../shared";

export interface InputCheckboxProps {
  checked?: boolean;
  onValueChange?: (checked: boolean) => void;
  /** Optional inline label rendered next to the box. */
  label?: ReactNode;
  className?: string;
  classNameLabel?: string;
  ref?: React.Ref<HTMLButtonElement>;
}

/** Checkbox control for binary or multi-select choices. */
export function InputCheckbox({
  checked,
  onValueChange,
  label,
  className,
  classNameLabel,
  ref,
}: InputCheckboxProps) {
  const field = useInputField<boolean>({ value: checked, onValueChange });

  return (
    <>
      <div className="flex items-center gap-2">
        <RadixCheckbox.Root
          ref={ref}
          id={field.id}
          name={field.name}
          checked={Boolean(field.value)}
          onCheckedChange={(c) => field.setValue(c === true)}
          disabled={field.disabled}
          aria-invalid={field.invalid || undefined}
          className={cn(
            "input-checkbox flex size-5 shrink-0 items-center justify-center rounded-(--radius-inline) border border-(--color-border) bg-(--color-surface-panel)",
            "transition-[background-color,border-color,box-shadow] ease-standard",
            "hover:border-(--color-border-hover)",
            "data-[state=checked]:border-(--color-accent) data-[state=checked]:bg-(--color-accent) data-[state=checked]:text-(--color-accent-foreground)",
            "data-[state=checked]:hover:border-(--color-accent)",
            "outline-none focus-ring",
            "disabled:cursor-not-allowed disabled:opacity-60",
            className,
          )}
        >
          <RadixCheckbox.Indicator className="animate-in zoom-in-50 duration-(--duration-instant) ease-standard">
            <Check className="size-3.5" strokeWidth={3} />
          </RadixCheckbox.Indicator>
        </RadixCheckbox.Root>
        {label ? (
          <label
            htmlFor={field.id}
            className={cn(
              "cursor-pointer text-sm text-(--color-foreground) select-none",
              classNameLabel,
            )}
          >
            {label}
          </label>
        ) : null}
      </div>
      <FieldError error={field.error} />
    </>
  );
}
