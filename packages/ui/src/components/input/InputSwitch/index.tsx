import * as RadixSwitch from "@radix-ui/react-switch";
import { cn } from "../../../util";
import { useInputField } from "../hooks";
import { FieldError } from "../shared";

export interface InputSwitchProps {
  checked?: boolean;
  onValueChange?: (checked: boolean) => void;
  className?: string;
  ref?: React.Ref<HTMLButtonElement>;
}

/** Toggle switch for boolean options. */
export function InputSwitch({
  checked,
  onValueChange,
  className,
  ref,
}: InputSwitchProps) {
  const field = useInputField<boolean>({ value: checked, onValueChange });

  return (
    <>
      <RadixSwitch.Root
        ref={ref}
        id={field.id}
        name={field.name}
        checked={Boolean(field.value)}
        onCheckedChange={(c) => field.setValue(c)}
        disabled={field.disabled}
        aria-invalid={field.invalid || undefined}
        className={cn(
          "input-switch relative inline-flex h-6 w-10 shrink-0 cursor-pointer items-center rounded-(--radius-pill) border border-transparent transition-colors outline-none",
          "bg-(--color-surface-panel-muted) data-[state=checked]:bg-(--color-accent)",
          "focus-visible:ring-2 focus-visible:ring-(--color-accent-soft)",
          "disabled:cursor-not-allowed disabled:opacity-60",
          className,
        )}
      >
        <RadixSwitch.Thumb className="pointer-events-none block size-5 translate-x-0.5 rounded-(--radius-pill) bg-(--color-surface-panel) shadow-(--shadow-sm) transition-transform data-[state=checked]:translate-x-[1.125rem]" />
      </RadixSwitch.Root>
      <FieldError error={field.error} />
    </>
  );
}
