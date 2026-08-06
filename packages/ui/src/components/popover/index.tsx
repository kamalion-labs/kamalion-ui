import * as RadixPopover from "@radix-ui/react-popover";
import type React from "react";
import { cn } from "../../util";

export interface PopoverContentProps
  extends React.ComponentPropsWithoutRef<typeof RadixPopover.Content> {
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
}

function PopoverContent({
  className,
  align = "center",
  sideOffset = 8,
  children,
  ref,
  ...props
}: PopoverContentProps) {
  return (
    <RadixPopover.Portal>
      <RadixPopover.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "popover-content z-50 min-w-[12rem] rounded-(--radius-panel) border border-(--color-surface-panel-border) bg-(--color-surface-panel) p-2 text-(--color-foreground) shadow-(--shadow-panel) outline-none",
          className,
        )}
        {...props}
      >
        {children}
      </RadixPopover.Content>
    </RadixPopover.Portal>
  );
}

/**
 * Floating content container anchored to a trigger element.
 */
export const Popover = Object.assign(RadixPopover.Root, {
  Root: RadixPopover.Root,
  Trigger: RadixPopover.Trigger,
  Anchor: RadixPopover.Anchor,
  Close: RadixPopover.Close,
  Content: PopoverContent,
});
