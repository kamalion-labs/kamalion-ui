import * as RadixTabs from "@radix-ui/react-tabs";
import { cn } from "../../../util";
import { TabsContext } from "../context";
import type { TabsProps } from "../types";

export function TabsRoot({
  variant = "line",
  size = "md",
  className,
  children,
  ref,
  ...props
}: TabsProps) {
  return (
    <TabsContext.Provider value={{ variant, size }}>
      <RadixTabs.Root
        ref={ref}
        className={cn("tabs flex flex-col gap-4", className)}
        {...props}
      >
        {children}
      </RadixTabs.Root>
    </TabsContext.Provider>
  );
}
