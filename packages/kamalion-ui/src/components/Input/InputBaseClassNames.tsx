import { cn } from "../../util";

export const InputBaseClassNames = cn(
  "itc-input inline-flex h-8 w-full border border-(--border) rounded",
  "bg-(--input-background) text-(--input-foreground)",
  "placeholder:text-muted-foreground",
  "px-2 py-1 transition-colors",
  "file:border-0 file:bg-transparent file:text-sm file:font-medium",
  "focus:ring-0 focus:border-(--input-ring) outline-none",
  "disabled:cursor-not-allowed disabled:opacity-50",
);

export const InputTextBaseClassNames = cn(
  "border-0 p-0 disabled:cursor-text disabled:opacity-100 h-fit bg-transparent",
);
