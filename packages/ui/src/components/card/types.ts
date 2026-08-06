import type React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
  ref?: React.Ref<HTMLDivElement>;
}

export type CardSectionProps = CardProps;
