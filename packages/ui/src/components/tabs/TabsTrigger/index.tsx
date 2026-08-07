import * as RadixTabs from "@radix-ui/react-tabs";
import { cn } from "../../../util";
import { useTabsContext } from "../context";
import type { TabsTriggerProps } from "../types";
import { tabsTriggerVariants } from "../variants";

export function TabsTrigger({
  variant,
  size,
  icon,
  trailing,
  className,
  classNameIcon,
  classNameTrailing,
  children,
  ref,
  ...props
}: TabsTriggerProps) {
  const ctx = useTabsContext();
  const resolvedVariant = variant ?? ctx.variant;
  const resolvedSize = size ?? ctx.size;

  return (
    <RadixTabs.Trigger
      ref={ref}
      className={cn(
        `tabs-trigger-${resolvedVariant}`,
        tabsTriggerVariants({ variant: resolvedVariant, size: resolvedSize }),
        className,
      )}
      {...props}
    >
      {icon ? (
        <span
          aria-hidden="true"
          className={cn("tabs-trigger-icon flex shrink-0", classNameIcon)}
        >
          {icon}
        </span>
      ) : null}
      {children}
      {trailing ? (
        <span
          className={cn(
            "tabs-trigger-trailing",
            // Reads as a count chip rather than more label text.
            "inline-flex h-5 min-w-5 items-center justify-center rounded-(--radius-pill) px-1.5",
            "bg-(--color-surface-panel-muted) text-[0.6875rem] font-medium",
            classNameTrailing,
          )}
        >
          {trailing}
        </span>
      ) : null}
    </RadixTabs.Trigger>
  );
}
