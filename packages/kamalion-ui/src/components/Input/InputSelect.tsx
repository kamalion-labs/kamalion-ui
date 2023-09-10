"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { useFormContext } from "react-hook-form";

import { cn } from "../../util/cn";
import { FaChevronDown } from "react-icons/fa6";
import { Button } from "..";

type InputSelectProps = {
  className?: string;
  triggerClassName?: string;
};

const InputSelect = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root> & InputSelectProps
>(({ className, triggerClassName, children, name, ...props }, ref) => {
  const formContext = useFormContext();

  if (!name) return null;

  const value = formContext.watch(name);

  return (
    <>
      <SelectPrimitive.Root
        value={value || undefined}
        onValueChange={(val) => formContext.setValue(name, val)}
        name={name}
      >
        <SelectPrimitive.Trigger
          ref={ref}
          asChild
          className={cn(
            "flex w-fit min-w-[250px] bg-[--input-background] h-9 transition-colors",
            "border rounded-sm border-[--input-border]",
            "hover:bg-zinc-100 active:bg-zinc-200",
            "placeholder:text-muted-foreground",
            "file:border-0 file:bg-transparent file:text-sm file:font-medium",
            "focus-visible:ring-0 focus-visible:border-[--input-ring] focus-visible:outline-none",
            "disabled:cursor-not-allowed disabled:opacity-50",
            triggerClassName
          )}
          {...props}
        >
          <Button.Root
            size="lg"
            className={cn(
              "border rounded-sm border-[--input-border]",
              triggerClassName
            )}
          >
            <Button.Content className="flex flex-1 justify-start">
              <SelectPrimitive.Value
                className="flex-1"
                placeholder="Selecione um item..."
              />
            </Button.Content>

            <Button.Icon>
              <FaChevronDown />
            </Button.Icon>
          </Button.Root>
        </SelectPrimitive.Trigger>

        <SelectPrimitive.Content
          className={cn(
            "relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-[--popover-background] text-[--popover-foreground]",
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
          {children}
        </SelectPrimitive.Content>
      </SelectPrimitive.Root>

      {name && (
        <div className="text-red-400">
          {formContext.formState?.errors?.[name]?.message?.toString()}
        </div>
      )}
    </>
  );
});

export { InputSelect };
