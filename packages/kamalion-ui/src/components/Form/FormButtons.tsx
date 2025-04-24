import React from "react";
import { cn } from "../../util/cn";

type FormButtonsProps = React.HTMLAttributes<HTMLDivElement> & {
  inline?: boolean;
};

export function FormButtons({ className, children, inline }: FormButtonsProps) {
  return <div className={cn("space-x-3", inline && "flex items-end", className)}>{children}</div>;
}
