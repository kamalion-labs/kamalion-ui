import * as RadixSelect from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "../../../util";
import { useInputField } from "../hooks";
import { controlBase, FieldError } from "../shared";

export interface InputSelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  children?: ReactNode;
}

function InputSelectRoot({
  value,
  onValueChange,
  placeholder,
  className,
  children,
}: InputSelectProps) {
  const field = useInputField<string>({ value, onValueChange });

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
            controlBase,
            "flex items-center justify-between gap-2 text-left",
            className,
          )}
        >
          <RadixSelect.Value placeholder={placeholder} />
          <RadixSelect.Icon>
            <ChevronDown className="size-4 opacity-60" />
          </RadixSelect.Icon>
        </RadixSelect.Trigger>
        <RadixSelect.Portal>
          <RadixSelect.Content
            position="popper"
            sideOffset={6}
            className="z-50 max-h-72 min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-(--radius-panel) border border-(--color-surface-panel-border) bg-(--color-surface-panel) text-(--color-foreground) shadow-(--shadow-panel)"
          >
            <RadixSelect.Viewport className="p-1">
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
        "relative flex cursor-pointer items-center rounded-(--radius-card) py-1.5 pr-2 pl-8 text-sm outline-none select-none",
        "data-[highlighted]:bg-(--color-accent-soft) data-[highlighted]:text-(--color-accent)",
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
        "px-2 py-1.5 text-xs font-medium text-(--color-foreground-muted)",
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
