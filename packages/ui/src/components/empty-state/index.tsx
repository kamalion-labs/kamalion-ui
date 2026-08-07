import { Inbox } from "lucide-react";
import { cn } from "../../util";
import type { EmptyStateProps } from "./types";
import { emptyStateIconVariants, emptyStateVariants } from "./variants";

/**
 * The "nothing here yet" surface for lists, tables and detail panels.
 *
 * Deliberately not compound: an empty state is a fixed arrangement of icon,
 * title, description and one action, and subcomponents would invite layouts
 * that stop reading as the same thing across screens. The `className{Element}`
 * props cover per-screen tuning.
 */
export function EmptyState({
  icon,
  title,
  description,
  action,
  size = "md",
  className,
  classNameIcon,
  classNameTitle,
  classNameDescription,
  children,
  ref,
  ...props
}: EmptyStateProps) {
  return (
    <div
      ref={ref}
      className={cn(emptyStateVariants({ size }), className)}
      {...props}
    >
      <span
        aria-hidden="true"
        className={cn(emptyStateIconVariants({ size }), classNameIcon)}
      >
        {icon ?? <Inbox />}
      </span>

      <h3
        className={cn(
          "empty-state-title text-sm font-semibold text-(--color-foreground)",
          classNameTitle,
        )}
      >
        {title}
      </h3>

      {description ? (
        <p
          className={cn(
            "empty-state-description max-w-sm text-sm text-pretty",
            classNameDescription,
          )}
        >
          {description}
        </p>
      ) : null}

      {children}

      {action ? <div className="empty-state-action mt-2">{action}</div> : null}
    </div>
  );
}

export type * from "./types";
