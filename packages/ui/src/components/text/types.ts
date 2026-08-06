import type React from "react";

export interface TextProps<E extends HTMLElement = HTMLElement>
  extends React.HTMLAttributes<E> {
  className?: string;
  children?: React.ReactNode;
  ref?: React.Ref<E>;
}
