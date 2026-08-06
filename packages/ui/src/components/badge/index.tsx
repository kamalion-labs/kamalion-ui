import { cn } from "../../util";
import { badgeVariants } from "./variants";
import type { BadgeProps } from "./types";

/**
 * Compact label for counts, tags, status indicators, and categories.
 */
export function Badge({ variant, className, children, ref, ...props }: BadgeProps) {
  return (
    <span
      ref={ref}
      className={cn(`badge-${variant ?? "default"}`, badgeVariants({ variant }), className)}
      {...props}
    >
      {children}
    </span>
  );
}

export type * from "./types";
