import React from "react";

import { type AlertVariantProps } from "./AlertVariants";
import { cn } from "../../util";

export type AlertIconProps = React.HTMLAttributes<HTMLDivElement> & AlertVariantProps;

export function AlertIcon({ className, children, ...props }: AlertIconProps) {
  return (
    <div className={cn("w-6 drop-shadow-md", className)} {...props}>
      {children}
    </div>
  );
}
