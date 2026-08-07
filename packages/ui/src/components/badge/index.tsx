import { cn } from "../../util";
import { badgeVariants } from "./variants";
import type { BadgeProps } from "./types";

/**
 * Compact label for counts, tags, status indicators, and categories.
 */
export function Badge({
  variant,
  size,
  dot,
  classNameDot,
  className,
  children,
  ref,
  ...props
}: BadgeProps) {
  return (
    <span
      ref={ref}
      className={cn(
        `badge-${variant ?? "default"}`,
        badgeVariants({ variant, size }),
        className,
      )}
      {...props}
    >
      {dot ? (
        <span
          aria-hidden="true"
          className={cn(
            // `bg-current` inherits the variant's tone, so a status dot never
            // needs its own colour map.
            "size-1.5 shrink-0 rounded-(--radius-pill) bg-current",
            classNameDot,
          )}
        />
      ) : null}
      {children}
    </span>
  );
}

export type * from "./types";
