import React from "react";

import { cn } from "../../util/cn";

type ButtonIconProps = React.HTMLAttributes<HTMLDivElement>;

export function ButtonIcon({ className, children, ...props }: ButtonIconProps) {
  return (
    <div className={cn("drop-shadow-md", className)} {...props}>
      {children}
    </div>
  );
}
