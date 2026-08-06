import type React from "react";

export type BoxElement = keyof React.JSX.IntrinsicElements;

export type BoxProps<T extends BoxElement = "div"> = {
  /** The HTML element or tag to render. Defaults to "div". */
  as?: T;
  className?: string;
  children?: React.ReactNode;
} & Omit<React.ComponentPropsWithRef<T>, "as">;
