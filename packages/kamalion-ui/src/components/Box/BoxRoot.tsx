import React from "react";
import { cn } from "../../util/cn";

type BoxRootProps = React.HTMLAttributes<HTMLDivElement>;

export function BoxRoot({ className, children }: BoxRootProps) {
  return (
    <div className={cn("bg-[--box-background]", "rounded-md", className)}>
      {children}
    </div>
  );
}
