import * as RadixSelect from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "../../../util";
import { useControlGeometry } from "../context";
import { useInputField } from "../hooks";
import { FieldError } from "../shared";
import { controlVariants, type ControlShape, type ControlSize } from "../variants";

export interface InputSelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  /** Overrides the size inherited from the surrounding `<Input>`. */
  size?: ControlSize;
  /** Overrides the shape inherited from the surrounding `<Input>`. */
  shape?: ControlShape;
  className?: string;
  children?: ReactNode;
}

function InputSelectRoot({
  value,
  onValueChange,
  placeholder,
  size,
  shape,
  className,
  children,
}: InputSelectProps) {
  const field = useInputField<string>({ value, onValueChange });
  const geometry = useControlGeometry({ size, shape });

  return (
    <>
      <RadixSelect.Root
        value={field.value ?? undefined}
        onValueChange={(v) => field.setValue(v)}
        disabled={field.disabled}
        name={field.name}
      >
        <RadixSelect.Trigger
          id={field.id}
          aria-invalid={field.invalid || undefined}
          className={cn(
            controlVariants(geometry),
            "group flex items-center justify-between gap-2 text-left",
            // Radix keeps the trigger in `data-state=open` while the menu is
            // up, so the field stays visibly active under the popup.
            "data-[state=open]:border-(--color-accent)",
            "data-[placeholder]:text-(--color-foreground-subtle)",
            className,
          )}
        >
          <RadixSelect.Value placeholder={placeholder} />
          <RadixSelect.Icon asChild>
            <ChevronDown className="size-4 shrink-0 text-(--color-foreground-subtle) transition-transform duration-(--duration-fast) group-data-[state=open]:rotate-180" />
          </RadixSelect.Icon>
        </RadixSelect.Trigger>
        <RadixSelect.Portal>
          <RadixSelect.Content
            position="popper"
            sideOffset={6}
            className={cn(
              "z-50 max-h-72 min-w-[var(--radix-select-trigger-width)] overflow-hidden",
              "rounded-(--radius-card) border border-(--color-surface-panel-border) bg-(--color-surface-panel)",
              "text-(--color-foreground) shadow-(--shadow-overlay)",
              // Scale out of the edge the menu is anchored to, not the centre.
              "origin-(--radix-select-content-transform-origin)",
              "duration-(--duration-fast) ease-standard",
              "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
              "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
              "data-[side=bottom]:slide-in-from-top-1 data-[side=top]:slide-in-from-bottom-1",
            )}
          >
            <RadixSelect.Viewport className="p-1.5">
              {children}
            </RadixSelect.Viewport>
          </RadixSelect.Content>
        </RadixSelect.Portal>
      </RadixSelect.Root>
      <FieldError error={field.error} />
    </>
  );
}

export interface InputSelectItemProps
  extends React.ComponentPropsWithoutRef<typeof RadixSelect.Item> {
  className?: string;
}

function InputSelectItem({
  className,
  children,
  ...props
}: InputSelectItemProps) {
  return (
    <RadixSelect.Item
      className={cn(
        "relative flex cursor-pointer items-center rounded-(--radius-inline) py-1.5 pr-2 pl-8 text-sm outline-none select-none",
        "transition-colors",
        "data-[highlighted]:bg-(--color-accent-soft) data-[highlighted]:text-(--color-accent)",
        "data-[state=checked]:font-medium",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className,
      )}
      {...props}
    >
      <span className="absolute left-2 flex items-center">
        <RadixSelect.ItemIndicator>
          <Check className="size-4" />
        </RadixSelect.ItemIndicator>
      </span>
      <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
    </RadixSelect.Item>
  );
}

function InputSelectLabel({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof RadixSelect.Label>) {
  return (
    <RadixSelect.Label
      className={cn(
        "px-2 py-1.5 text-caption font-medium tracking-wider text-(--color-foreground-subtle) uppercase",
        className,
      )}
      {...props}
    />
  );
}

function InputSelectSeparator({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof RadixSelect.Separator>) {
  return (
    <RadixSelect.Separator
      className={cn("my-1 h-px bg-(--color-border)", className)}
      {...props}
    />
  );
}

export const InputSelect = Object.assign(InputSelectRoot, {
  Item: InputSelectItem,
  Group: RadixSelect.Group,
  Label: InputSelectLabel,
  Separator: InputSelectSeparator,
});
