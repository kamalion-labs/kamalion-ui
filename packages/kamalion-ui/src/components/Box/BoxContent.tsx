import React from "react";
import { cn } from "../../util/cn";

type BoxContentProps = React.HTMLAttributes<HTMLDivElement>;

export function BoxContent({ className, children }: BoxContentProps) {
  return <div className={cn("p-3", className)}>{children}</div>;
}
