import React from "react";
import { cn } from "../../util/cn";

const AlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5 ref={ref} className={cn("font-extrabold leading-none drop-shadow-md tracking-tight", className)} {...props} />
  ),
);
AlertTitle.displayName = "AlertTitle";

export { AlertTitle };
