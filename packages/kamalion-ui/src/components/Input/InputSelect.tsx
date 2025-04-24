"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { useFormContext } from "react-hook-form";

import { cn } from "../../util/cn";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { Button } from "..";

type InputSelectProps = {
  className?: string;
  triggerClassName?: string;
  position?: "popper" | "item-aligned" | undefined;
  noControl?: boolean;
};

const InputSelect = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root> & InputSelectProps
>(
  (
    { className, triggerClassName, position = "popper", children, name, onValueChange, noControl, value, ...props },
    ref
  ) => {
    const formContext = useFormContext();

    if (!name) return null;

    const uncontrolled = !formContext || !formContext.control || noControl;

    value = uncontrolled ? value : formContext.watch(name);

    return (
      <>
        <SelectPrimitive.Root
          value={value || undefined}
          name={name}
          onValueChange={(val) => {
            if(uncontrolled && onValueChange) {
              onValueChange(val);
              return;
            }

            if (!uncontrolled && formContext) {
              formContext.setValue(name, val);
              return;
            }
          }}
        >
          <SelectPrimitive.Trigger
            ref={ref}
            asChild
            className={cn(
              "flex w-fit min-w-[250px] transition-colors",
              // "border rounded-sm border-(--input-border)",
              // "hover:bg-zinc-100 active:bg-zinc-200",
              // "placeholder:text-muted-foreground",
              // "file:border-0 file:bg-transparent file:text-sm file:font-medium",
              // "focus:ring-0 focus:border-[--input-ring] focus:outline-none",
              // "disabled:cursor-not-allowed disabled:opacity-50",
              //InputBaseClassNames,
              triggerClassName
            )}
            {...props}
          >
            <Button.Root
              className={cn(
                "border bg-(--input-background) text-(--input-foreground) rounded border-(--input-border)",
                triggerClassName
              )}
            >
              <Button.Content className="flex flex-1 justify-start">
                <SelectPrimitive.Value className="flex-1" placeholder="Selecione um item..." />
              </Button.Content>

              <Button.Icon>
                <FaChevronDown />
              </Button.Icon>
            </Button.Root>
          </SelectPrimitive.Trigger>

          <SelectPrimitive.Portal>
            <SelectPrimitive.Content
              position={position}
              className={cn(
                "relative z-50 min-w-[8rem] max-h-[200px] overflow-hidden rounded border border-(--input-border) bg-(--popover-background) text-(--popover-foreground)",
                "shadow-md",
                "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
                "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
                "data-[side=bottom]:slide-in-from-top-2",
                "data-[side=left]:slide-in-from-right-2",
                "data-[side=right]:slide-in-from-left-2",
                "data-[side=top]:slide-in-from-bottom-2",
                className
              )}
            >
              <SelectPrimitive.ScrollUpButton className="flex items-center justify-center h-[25px] text-slate-900">
                <FaChevronUp />
              </SelectPrimitive.ScrollUpButton>

              <SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport>

              <SelectPrimitive.ScrollDownButton className="flex items-center justify-center h-[25px] text-slate-900">
                <FaChevronDown />
              </SelectPrimitive.ScrollDownButton>
            </SelectPrimitive.Content>
          </SelectPrimitive.Portal>
        </SelectPrimitive.Root>

        {!uncontrolled && name && formContext.formState?.errors?.[name] && (
          <div className="text-red-400">{formContext.formState?.errors?.[name]?.message?.toString()}</div>
        )}
      </>
    );
  }
);

InputSelect.displayName = "InputSelect";

export { InputSelect };
