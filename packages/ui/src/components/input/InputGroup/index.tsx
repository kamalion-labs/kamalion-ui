import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../../util";
import { useControlGeometry } from "../context";
import {
  controlGroupVariants,
  type ControlShape,
  type ControlSize,
} from "../variants";

export interface InputGroupProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "size"> {
  /** Overrides the size inherited from the surrounding `<Input>`. */
  size?: ControlSize;
  /** Overrides the shape inherited from the surrounding `<Input>`. */
  shape?: ControlShape;
  className?: string;
  children?: ReactNode;
  ref?: React.Ref<HTMLDivElement>;
}

/**
 * Row container combining a control with leading/trailing add-ons
 * (Input.Icon, Input.Button). Nested `.input-control` elements are flattened
 * so the group border reads as one field, and focus is hoisted to the wrapper.
 */
export function InputGroup({
  size,
  shape,
  className,
  children,
  ref,
  ...props
}: InputGroupProps) {
  const geometry = useControlGeometry({ size, shape });

  return (
    <div
      ref={ref}
      className={cn(controlGroupVariants(geometry), className)}
      {...props}
    >
      {children}
    </div>
  );
}
