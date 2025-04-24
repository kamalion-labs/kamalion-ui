"use client";

import { CgSpinnerTwo } from "react-icons/cg";
import { cn } from "../..";

export type LoadingGlobalProps = {
  className?: string;
}

export function LoadingLocal({ className }: LoadingGlobalProps) {
  return (
    <div
      className={cn(
        "itc-loading-local flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className
      )}
    >
      <CgSpinnerTwo className="animate-spin text-accent" size={24} />
    </div>
  );
}
