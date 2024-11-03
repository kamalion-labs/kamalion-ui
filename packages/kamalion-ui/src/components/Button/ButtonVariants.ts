import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  `inline-flex min-w-[130px] items-center justify-center text-sm font-medium space-x-3 rounded px-3 py-1
  transition-all bg-[--button-background] text-[--button-foreground]
  focus-visible:ring-0 focus-visible:border-[--input-ring] focus-visible:outline-none
  disabled:pointer-events-none disabled:opacity-50`,
  {
    variants: {
      variant: {
        default: "bg-white hover:bg-zinc-100 active:bg-zinc-200 border",
        accent: `text-white bg-accent border-[--input-ring]
          hover:bg-accent/70 
          active:bg-accent/90 
          focus-visible:border-white`,
        success: "text-white bg-[--success] hover:bg-[--success-hover] active:bg-[--success-active]",
        danger: "text-white bg-[--danger] hover:bg-[--danger-hover] active:bg-[--danger-active]",
        ghost: "border-none hover:font-bold",
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
