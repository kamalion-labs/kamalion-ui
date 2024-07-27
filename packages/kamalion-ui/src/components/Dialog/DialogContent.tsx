import * as DialogPrimitive from "@radix-ui/react-dialog";
import React from "react";
import { DialogPortal } from "./DialogPortal";
import { DialogOverlay } from "./DialogOverlay";
import { FaXmark } from "react-icons/fa6";
import { cn } from "../..";

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />

    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "data-[state=open]:animate-in data-[state=open]:fade-in-0",
        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2",
        "data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%]",
        "gap-4 border bg-[--dialog-background] text-[--dialog-foreground] p-6 shadow-lg duration-200 sm:rounded-lg",
        "md:w-full max-h-[70%] overflow-y-auto",
        className
      )}
      {...props}
    >
      {children}

      <DialogPrimitive.Close
        className={cn(
          "ring-offset-background focus:ring-ring data-[state=open]:text-muted-foreground",
          "absolute right-4 top-4 rounded-sm opacity-70 transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2",
          "disabled:pointer-events-none data-[state=open]:bg-accent hover:opacity-100"
        )}
      >
        <FaXmark className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));

DialogContent.displayName = DialogPrimitive.Content.displayName;

export { DialogContent };
