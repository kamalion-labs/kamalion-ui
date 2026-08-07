import * as RadixTooltip from "@radix-ui/react-tooltip";
import type React from "react";
import { cn } from "../../util";

export interface TooltipContentProps
  extends React.ComponentPropsWithoutRef<typeof RadixTooltip.Content> {
  className?: string;
  /** Show the little arrow pointing at the trigger. Defaults to true. */
  withArrow?: boolean;
  ref?: React.Ref<HTMLDivElement>;
}

function TooltipContent({
  className,
  children,
  withArrow = true,
  sideOffset = 6,
  ref,
  ...props
}: TooltipContentProps) {
  return (
    <RadixTooltip.Portal>
      <RadixTooltip.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn(
          "tooltip-content z-50 max-w-64 rounded-(--radius-inline) px-2 py-1",
          // Inverted surface, on purpose — a tooltip is transient annotation,
          // not a panel. Tokenised rather than borrowing `--color-foreground`
          // so the intent is explicit and themeable.
          "bg-(--color-tooltip-bg) text-xs font-medium text-(--color-tooltip-fg)",
          "shadow-(--shadow-overlay)",
          "origin-(--radix-tooltip-content-transform-origin)",
          "duration-(--duration-fast) ease-standard",
          // Radix Tooltip emits `instant-open` / `delayed-open` / `closed` —
          // it NEVER emits `data-state=open`, so a recipe copied from Popover
          // silently does nothing here.
          "data-[state=instant-open]:animate-in data-[state=delayed-open]:animate-in",
          "data-[state=closed]:animate-out",
          "fade-in-0 fade-out-0 zoom-in-95 zoom-out-95",
          "data-[side=bottom]:slide-in-from-top-1 data-[side=top]:slide-in-from-bottom-1",
          "data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1",
          className,
        )}
        {...props}
      >
        {children}
        {withArrow && (
          <RadixTooltip.Arrow className="fill-(--color-tooltip-bg)" />
        )}
      </RadixTooltip.Content>
    </RadixTooltip.Portal>
  );
}

/**
 * Informational popover snippet anchored to a target on hover/focus.
 * Wrap your app (or a section) in `Tooltip.Provider` once.
 */
export const Tooltip = Object.assign(RadixTooltip.Root, {
  Provider: RadixTooltip.Provider,
  Root: RadixTooltip.Root,
  Trigger: RadixTooltip.Trigger,
  Content: TooltipContent,
});
