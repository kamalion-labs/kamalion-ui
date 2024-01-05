import React from "react";
import { cn } from "../../util/cn";

type BoxRootProps = React.HTMLAttributes<HTMLDivElement>;

export function BoxRoot({ className, children, ...rest }: BoxRootProps) {
  return (
    <div
      className={cn(
        "bg-[--box-background] drop-shadow-md",
        "rounded-md",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
