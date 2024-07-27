import React from "react";

import { cn } from "../../util/cn";

type ButtonContentProps = React.HTMLAttributes<HTMLDivElement>;

export function ButtonContent({ className, children, ...props }: ButtonContentProps) {
  return (
    <div className={cn("drop-shadow-md", className)} {...props}>
      {children}
    </div>
  );
}
