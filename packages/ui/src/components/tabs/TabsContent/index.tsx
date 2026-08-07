import * as RadixTabs from "@radix-ui/react-tabs";
import { cn } from "../../../util";
import type { TabsContentProps } from "../types";

export function TabsContent({
  className,
  children,
  ref,
  ...props
}: TabsContentProps) {
  return (
    <RadixTabs.Content
      ref={ref}
      className={cn("tabs-content focus-ring-inset outline-none", className)}
      {...props}
    >
      {children}
    </RadixTabs.Content>
  );
}
