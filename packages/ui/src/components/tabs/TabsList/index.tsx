import * as RadixTabs from "@radix-ui/react-tabs";
import { cn } from "../../../util";
import { useTabsContext } from "../context";
import type { TabsListProps } from "../types";
import { tabsListVariants } from "../variants";

export function TabsList({
  variant,
  size,
  className,
  children,
  ref,
  ...props
}: TabsListProps) {
  const ctx = useTabsContext();
  const resolvedVariant = variant ?? ctx.variant;
  const resolvedSize = size ?? ctx.size;

  return (
    <RadixTabs.List
      ref={ref}
      className={cn(
        `tabs-list-${resolvedVariant}`,
        tabsListVariants({ variant: resolvedVariant, size: resolvedSize }),
        className,
      )}
      {...props}
    >
      {children}
    </RadixTabs.List>
  );
}
