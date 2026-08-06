import { Loader2 } from "lucide-react";
import { cn } from "../../util";
import type { LoadingGlobalProps, LoadingLocalProps, LoadingSize } from "./types";

const spinnerSize: Record<LoadingSize, string> = {
  sm: "size-4",
  md: "size-6",
  lg: "size-8",
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
        className={cn("size-10 animate-spin text-(--color-accent)", classNameSpinner)}
        aria-hidden="true"
      />
      {label ? (
        <span className="text-sm text-(--color-foreground)">{label}</span>
      ) : null}
      <span className="sr-only">Loading</span>
    </div>
  );
}

/**
 * Visual indicators for background activity. `Loading.Local` is an inline
 * spinner; `Loading.Global` is a full-page translucent overlay.
 */
export const Loading = Object.assign(LoadingLocal, {
  Local: LoadingLocal,
  Global: LoadingGlobal,
});

export type * from "./types";
