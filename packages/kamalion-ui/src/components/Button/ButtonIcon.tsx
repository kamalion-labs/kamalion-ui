import React from "react";

import { cn } from "../../util/cn";

type ButtonIconProps = React.HTMLAttributes<HTMLDivElement>;

export function ButtonIcon({ className, children, ...props }: ButtonIconProps) {
  return (
    <div className={cn("itc-button-icon drop-shadow-md", className)} {...props}>
      {children}
    </div>
  );
}
