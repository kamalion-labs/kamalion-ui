import React from "react";
import { cn } from "../../util/cn";

type BoxContentProps = React.HTMLAttributes<HTMLDivElement>;

export function BoxContent({ className, children, ...rest }: BoxContentProps) {
  return (
    <div className={cn("p-3", className)} {...rest}>
      {children}
    </div>
  );
}
