import { cva, VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
  `itc-button inline-flex w-fit items-center justify-center text-sm font-medium space-x-3 rounded px-3 py-1
  transition-all
  hover:cursor-pointer
  disabled:pointer-events-none disabled:opacity-50`,
  {
    variants: {
      variant: {
        default: `border border-(--border) bg-(--color-background) text-(--color-foreground)
          hover:bg-white active:bg-zinc-200
          dark:bg-(--color-background) dark:hover:bg-zinc-700`,
        accent: `text-accent-foreground bg-accent
          hover:bg-accent/70 active:bg-accent/90
          dark:text-foreground`,
        success: "text-white bg-emerald-400 hover:bg-emerald-500",
        danger: "text-white bg-red-400 hover:bg-red-500",
        ghost: "border-0 bg-transparent hover:font-bold",
      },
      size: {
        default: "h-8",
        sm: "h-7",
        lg: "h-9",
        icon: "h-8 w-8 min-w-fit py-0 px-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export type ButtonVariantsList = VariantProps<typeof buttonVariants>["variant"];