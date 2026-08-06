import type React from "react";

export interface CodeInlineProps
  extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  children?: React.ReactNode;
  ref?: React.Ref<HTMLElement>;
}

export interface CodeBlockProps
  extends React.HTMLAttributes<HTMLPreElement> {
  className?: string;
  classNameCode?: string;
  children?: React.ReactNode;
  ref?: React.Ref<HTMLPreElement>;
}
