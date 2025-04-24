import { VariantProps } from "class-variance-authority";
export declare const buttonVariants: (props?: {
    variant?: "default" | "success" | "danger" | "accent" | "ghost";
    size?: "default" | "icon" | "sm" | "lg";
} & import("class-variance-authority/types").ClassProp) => string;
export type ButtonVariantsList = VariantProps<typeof buttonVariants>["variant"];
