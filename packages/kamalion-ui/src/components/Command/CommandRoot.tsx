import { Command as CommandPrimitive } from "cmdk";
import * as React from "react";
import { cn } from "../..";

const CommandRoot = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
      className,
    )}
    {...props}
  />
));

CommandRoot.displayName = CommandPrimitive.displayName;

export { CommandRoot };
