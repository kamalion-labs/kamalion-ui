import {
  Bell,
  CheckCircle2,
  Info,
  TriangleAlert,
  X,
  XCircle,
  type LucideIcon,
} from "lucide-react";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { cn } from "../../util";
import { ToastContext, useToast } from "./context";
import { toastIconChip, toastVariants } from "./variants";
import type { ToastItem, ToastOptions } from "./types";

/** Same glyph vocabulary as Alert, so the two read as one system. */
const iconByVariant: Record<string, LucideIcon> = {
  default: Bell,
  success: CheckCircle2,
  danger: XCircle,
  warning: TriangleAlert,
  info: Info,
};

export interface ToastProviderProps {
  children?: ReactNode;
  /** Default auto-dismiss duration in ms. Use Infinity to make toasts sticky. */
  duration?: number;
}

function ToastCard({
  item,
  onClose,
}: {
  item: ToastItem;
  onClose: (id: string) => void;
}) {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const shown = entered && item.open;
  const variant = item.variant ?? "default";
  const Icon = iconByVariant[variant] ?? Bell;

  return (
    <li
      role="status"
      aria-live="polite"
      className={cn(
        toastVariants({ variant: item.variant }),
        "transition-[transform,opacity] duration-(--duration-normal) ease-standard",
        shown
          ? "translate-x-0 scale-100 opacity-100"
          : "translate-x-2 scale-[0.98] opacity-0",
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "toast-icon flex size-8 shrink-0 items-center justify-center rounded-(--radius-control)",
          toastIconChip[variant],
        )}
      >
        <Icon className="size-4" />
      </span>

      <div className="flex min-w-0 flex-1 flex-col gap-0.5 pt-1">
        {item.title ? (
          <div className="text-sm font-semibold tracking-tight text-(--color-foreground)">
            {item.title}
          </div>
        ) : null}
        {item.description ? (
          <div className="text-sm text-(--color-foreground-muted)">
            {item.description}
          </div>
        ) : null}
      </div>

      <button
        type="button"
        aria-label="Close"
        onClick={() => onClose(item.id)}
        className={cn(
          "-mt-1 -mr-1 flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-(--radius-inline)",
          "text-(--color-foreground-subtle) transition-colors",
          "hover:bg-(--color-surface-panel-hover) hover:text-(--color-foreground)",
          "outline-none focus-ring",
        )}
      >
        <X className="size-4" />
      </button>
    </li>
  );
}

/**
 * Mounts the toast queue + viewport and provides `useToast`. Wrap your app
 * (or use `KamalionProvider`). Toasts render into a portal on `document.body`,
 * so the theme class must live on an ancestor of body (e.g. `<html>`).
 */
export function ToastProvider({ children, duration = 4000 }: ToastProviderProps) {
  const [items, setItems] = useState<ToastItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const remove = useCallback((id: string) => {
    setItems((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const dismiss = useCallback(
    (id: string) => {
      setItems((prev) =>
        prev.map((t) => (t.id === id ? { ...t, open: false } : t)),
      );
      // let the exit transition play before unmounting
      window.setTimeout(() => remove(id), 200);
    },
    [remove],
  );

  const toast = useCallback(
    (options: ToastOptions) => {
      const id = options.id ?? crypto.randomUUID();
      setItems((prev) => [...prev, { ...options, id, open: true }]);
      const ms = options.duration ?? duration;
      if (Number.isFinite(ms) && ms > 0) {
        window.setTimeout(() => dismiss(id), ms);
      }
      return id;
    },
    [duration, dismiss],
  );

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}
      {mounted &&
        createPortal(
          // `pointer-events-none` matters: on mobile this `<ol>` is full-width
          // and would otherwise swallow taps across the whole top strip even
          // with zero toasts queued. Each card re-enables events on itself.
          <ol className="toast-viewport pointer-events-none fixed top-0 right-0 z-100 flex max-h-screen w-full flex-col gap-2 p-4 sm:w-auto">
            {items.map((item) => (
              <ToastCard key={item.id} item={item} onClose={dismiss} />
            ))}
          </ol>,
          document.body,
        )}
    </ToastContext.Provider>
  );
}

export { useToast };
export type * from "./types";
