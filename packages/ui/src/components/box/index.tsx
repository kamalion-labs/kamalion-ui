import type { ElementType } from "react";
import { cn } from "../../util";
import type { BoxProps, BoxElement } from "./types";

/**
 * Low-level polymorphic layout container. Renders a `div` by default; use the
 * `as` prop to render any intrinsic element while keeping typed props.
 */
export function Box<T extends BoxElement = "div">({
  as,
  className,
  children,
  ...props
}: BoxProps<T>) {
  const Component = (as ?? "div") as ElementType;
  return (
    <Component className={cn("box", className)} {...props}>
      {children}
    </Component>
  );
}

export type * from "./types";
