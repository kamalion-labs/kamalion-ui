import * as TabsPrimitive from "@radix-ui/react-tabs";
import React from "react";
import { cn } from "../..";

export const TabsTrigger = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "itc-tabs-trigger",
      "inline-flex items-center justify-center whitespace-nowrap px-3 py-1.5 text-sm font-medium",
      "ring-offset-background transition-all rounded-md",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      "disabled:pointer-events-none disabled:opacity-50",
      "data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      "data-[state=inactive]:hover:cursor-pointer data-[state=inactive]:hover:text-foreground",
      className,
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;
