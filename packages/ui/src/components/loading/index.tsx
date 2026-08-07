import { Loader2 } from "lucide-react";
import { cn } from "../../util";
import type {
  LoadingGlobalProps,
  LoadingLocalProps,
  LoadingSize,
  LoadingSkeletonProps,
  SkeletonVariant,
} from "./types";

const spinnerSize: Record<LoadingSize, string> = {
  sm: "size-4",
  md: "size-6",
  lg: "size-8",
  xl: "size-10",
};

function LoadingLocal({
  size = "md",
  label,
  className,
  classNameSpinner,
  ref,
  ...props
}: LoadingLocalProps) {
  return (
    <div
      ref={ref}
      role="status"
      aria-live="polite"
      className={cn(
        "loading-local inline-flex items-center gap-2 text-(--color-foreground-muted)",
        className,
      )}
      {...props}
    >
      <Loader2
        className={cn("animate-spin text-(--color-accent)", spinnerSize[size], classNameSpinner)}
        aria-hidden="true"
      />
      {label ? <span className="text-sm">{label}</span> : null}
      <span className="sr-only">Loading</span>
    </div>
  );
}

function LoadingGlobal({
  open = true,
  size = "xl",
  label,
  className,
  classNameSpinner,
  ref,
  ...props
}: LoadingGlobalProps) {
  if (!open) return null;
  return (
    <div
      ref={ref}
      role="status"
      aria-live="polite"
      className={cn(
        "loading-global fixed inset-0 z-50 flex flex-col items-center justify-center gap-3",
        "bg-(--color-window-glass) backdrop-blur-(--backdrop-blur-amount)",
        className,
      )}
      {...props}
    >
      <Loader2
        className={cn(
          "animate-spin text-(--color-accent)",
          spinnerSize[size],
          classNameSpinner,
        )}
        aria-hidden="true"
      />
      {label ? (
        <span className="text-sm text-(--color-foreground)">{label}</span>
      ) : null}
      <span className="sr-only">Loading</span>
    </div>
  );
}

const skeletonVariant: Record<SkeletonVariant, string> = {
  text: "h-4 w-full rounded-(--radius-inline)",
  circle: "size-10 rounded-(--radius-pill)",
  rect: "h-24 w-full rounded-(--radius-control)",
};

/**
 * Placeholder shape for content that is still loading.
 *
 * Prefer this over a centred spinner for list and table loading states: it
 * reserves the layout, so nothing jumps when the data resolves.
 */
function LoadingSkeleton({
  variant = "text",
  lines = 1,
  className,
  ref,
  ...props
}: LoadingSkeletonProps) {
  const base = cn(
    "loading-skeleton animate-pulse bg-(--color-surface-panel-muted)",
    skeletonVariant[variant],
  );

  if (variant === "text" && lines > 1) {
    return (
      <div
        ref={ref}
        aria-hidden="true"
        className={cn("flex flex-col gap-2", className)}
        {...props}
      >
        {Array.from({ length: lines }, (_, i) => (
          // Ragged last line reads as a paragraph rather than a solid block.
          <div key={i} className={cn(base, i === lines - 1 && "w-3/5")} />
        ))}
      </div>
    );
  }

  return <div ref={ref} aria-hidden="true" className={cn(base, className)} {...props} />;
}

/**
 * Visual indicators for background activity. `Loading.Local` is an inline
 * spinner, `Loading.Global` a full-page translucent overlay, and
 * `Loading.Skeleton` a layout-preserving content placeholder.
 */
export const Loading = Object.assign(LoadingLocal, {
  Local: LoadingLocal,
  Global: LoadingGlobal,
  Skeleton: LoadingSkeleton,
});

export type * from "./types";
