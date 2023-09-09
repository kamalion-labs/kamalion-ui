import React from "react";
import { type VariantProps } from "class-variance-authority";
import { ButtonVariants } from "./ButtonVariants";
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof ButtonVariants> {
}
declare const ButtonRoot: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;
export { ButtonRoot };
