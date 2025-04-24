import React from "react";
import { type VariantProps } from "class-variance-authority";
declare const ButtonRoot: React.ForwardRefExoticComponent<React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<(props?: {
    variant?: "default" | "success" | "danger" | "accent" | "ghost";
    size?: "default" | "icon" | "sm" | "lg";
} & import("class-variance-authority/types").ClassProp) => string> & {
    isLoading?: boolean;
} & React.RefAttributes<HTMLButtonElement>>;
export { ButtonRoot };
