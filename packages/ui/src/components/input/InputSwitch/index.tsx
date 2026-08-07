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
          // `p-0.5` + a `size-5` thumb means the travel distance is derived
          // from the track width instead of a magic translate offset, so the
          // geometry survives any future size change.
          "input-switch relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-(--radius-pill) border border-(--color-border) p-0.5",
          "transition-colors duration-(--duration-normal) ease-standard",
          "bg-(--color-surface-panel-muted)",
          "data-[state=checked]:border-(--color-accent) data-[state=checked]:bg-(--color-accent)",
          "outline-none focus-ring",
          "disabled:cursor-not-allowed disabled:opacity-60",
          className,
        )}
      >
        <RadixSwitch.Thumb className="pointer-events-none block size-4.5 rounded-(--radius-pill) bg-(--color-surface-panel) shadow-(--shadow-floating) transition-transform duration-(--duration-normal) ease-standard data-[state=checked]:translate-x-5" />
      </RadixSwitch.Root>
      <FieldError error={field.error} />
    </>
  );
}
