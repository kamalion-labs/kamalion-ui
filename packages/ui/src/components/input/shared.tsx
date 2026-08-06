import { cn } from "../../util";

/** Base classes shared by text-like control elements (input/textarea/select). */
export const controlBase = cn(
  "input-control w-full rounded-(--radius-card) border border-(--color-border) bg-(--color-surface-panel) text-(--color-foreground)",
  "px-3 py-2 text-sm",
  "placeholder:text-(--color-foreground-subtle)",
  "transition-colors outline-none",
  "focus:border-(--color-accent) focus:ring-2 focus:ring-(--color-accent-soft)",
  "disabled:cursor-not-allowed disabled:opacity-60",
  "aria-[invalid=true]:border-(--color-danger) aria-[invalid=true]:focus:ring-(--color-danger-soft)",
);

export function FieldError({ error }: { error?: string }) {
  if (!error) return null;
  return (
    <p className="input-error text-xs text-(--color-danger)" role="alert">
      {error}
    </p>
  );
}
