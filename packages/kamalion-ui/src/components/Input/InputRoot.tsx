import * as React from "react";
import { cn } from "../../util/cn";

type InputRootProps = React.HTMLAttributes<HTMLDivElement>;

export function InputRoot({ children, className, ...props }: InputRootProps) {
  const flexDirection = React.Children.toArray(children).some(
    (x: any) => x.type?.displayName === "InputCheckbox"
  )
    ? "flex-row space-x-2"
    : "flex-col gap-y-1";

  return (
    <div className={cn("flex", flexDirection, className)} {...props}>
      {children}
    </div>
  );
}
