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
          "tooltip-content z-50 max-w-xs rounded-(--radius-card) bg-(--color-foreground) px-2.5 py-1.5 text-xs font-medium text-(--color-surface-panel) shadow-(--shadow-panel)",
          className,
        )}
        {...props}
      >
        {children}
        {withArrow && <RadixTooltip.Arrow className="fill-(--color-foreground)" />}
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
