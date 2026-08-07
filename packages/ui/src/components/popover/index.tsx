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
          "popover-content z-50 min-w-48 rounded-(--radius-card) p-1.5",
          "border border-(--color-surface-panel-border) bg-(--color-surface-panel)",
          "text-(--color-foreground) shadow-(--shadow-overlay) outline-none",
          // Scale out of the edge the popover is anchored to, so it reads as
          // emerging from the trigger rather than inflating in place.
          "origin-(--radix-popover-content-transform-origin)",
          "duration-(--duration-fast) ease-standard",
          "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
          "data-[side=bottom]:slide-in-from-top-1 data-[side=top]:slide-in-from-bottom-1",
          "data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1",
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
