import React from "react";
import { cn } from "../../util/cn";

const AlertDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("space-y-5 leading-none drop-shadow-md tracking-tight", className)}
      {...props}
      dangerouslySetInnerHTML={{ __html: children as string }}
    />
  ),
);
AlertDescription.displayName = "AlertDescription";

export { AlertDescription };
