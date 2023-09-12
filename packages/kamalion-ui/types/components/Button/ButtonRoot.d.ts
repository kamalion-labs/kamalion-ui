import React from "react";
import { type VariantProps } from "class-variance-authority";
import { buttonVariants } from "./ButtonVariants";
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    isLoading?: boolean;
}
declare const ButtonRoot: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;
export { ButtonRoot };
