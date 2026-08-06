import { X } from "lucide-react";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { cn } from "../../util";
import { ToastContext, useToast } from "./context";
import { toastVariants } from "./variants";
import type { ToastItem, ToastOptions } from "./types";

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

  return (
    <li
      role="status"
      aria-live="polite"
      className={cn(
        toastVariants({ variant: item.variant }),
        "transition-all duration-200 ease-out",
        shown ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0",
      )}
    >
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        {item.title ? (
          <div className="text-sm font-semibold text-(--color-foreground)">
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
        className="shrink-0 rounded-(--radius-card) p-1 text-(--color-foreground-subtle) transition-colors hover:bg-(--color-surface-panel-muted) hover:text-(--color-foreground)"
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
          <ol className="toast-viewport fixed top-0 right-0 z-[100] flex max-h-screen w-full flex-col gap-2 p-4 sm:w-auto">
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
