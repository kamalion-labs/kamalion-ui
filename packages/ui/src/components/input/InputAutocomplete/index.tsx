import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { cn } from "../../../util";
import { Popover } from "../../popover";
import { useControlGeometry } from "../context";
import { useInputField } from "../hooks";
import { FieldError } from "../shared";
import { controlVariants, type ControlShape, type ControlSize } from "../variants";

interface AutocompleteCtx {
  query: string;
  activeValue: string | null;
  select: (value: string) => void;
}
const AutocompleteContext = createContext<AutocompleteCtx | undefined>(undefined);
const useAutocompleteCtx = () => {
  const c = useContext(AutocompleteContext);
  if (!c)
    throw new Error(
      "Input.Autocomplete.Item must be used within Input.Autocomplete.",
    );
  return c;
};

export interface InputAutocompleteProps {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  emptyMessage?: string;
  /** Overrides the size inherited from the surrounding `<Input>`. */
  size?: ControlSize;
  /** Overrides the shape inherited from the surrounding `<Input>`. */
  shape?: ControlShape;
  className?: string;
  children?: ReactNode;
}

function InputAutocompleteRoot({
  value,
  onValueChange,
  placeholder,
  emptyMessage = "No results",
  size,
  shape,
  className,
  children,
}: InputAutocompleteProps) {
  const field = useInputField<string>({ value, onValueChange });
  const geometry = useControlGeometry({ size, shape });
  const [open, setOpen] = useState(false);
  const [activeValue, setActiveValue] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const query = field.value ?? "";

  const select = (next: string) => {
    field.setValue(next);
    setOpen(false);
    setActiveValue(null);
  };

  // A changed query re-filters the list, so the old highlight may no longer
  // exist. Reset rather than leave a highlight pointing at nothing.
  useEffect(() => setActiveValue(null), [query]);

  /**
   * Items filter themselves out during render, so the visible set is only
   * knowable from the DOM. Reading it on keydown is both simpler and more
   * correct than a render-time registration scheme.
   */
  const visibleValues = () =>
    Array.from(
      listRef.current?.querySelectorAll<HTMLElement>("[data-autocomplete-item]") ??
        [],
    ).map((el) => el.dataset.value ?? "");

  const move = (delta: number) => {
    const values = visibleValues();
    if (values.length === 0) return;
    const current = activeValue ? values.indexOf(activeValue) : -1;
    // Wraps at both ends, matching the Select and menu conventions.
    const next = (current + delta + values.length) % values.length;
    setActiveValue(values[next]);
    listRef.current
      ?.querySelector<HTMLElement>(`[data-value="${CSS.escape(values[next])}"]`)
      ?.scrollIntoView({ block: "nearest" });
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (!open) setOpen(true);
      else move(1);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      move(-1);
    } else if (event.key === "Enter") {
      if (open && activeValue) {
        event.preventDefault();
        select(activeValue);
      }
    } else if (event.key === "Escape") {
      setOpen(false);
      setActiveValue(null);
    }
  };

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <Popover.Anchor asChild>
          <input
            id={field.id}
            name={field.name}
            type="text"
            role="combobox"
            aria-expanded={open}
            aria-autocomplete="list"
            autoComplete="off"
            placeholder={placeholder}
            required={field.required}
            disabled={field.disabled}
            aria-invalid={field.invalid || undefined}
            value={query}
            onChange={(e) => {
              field.setValue(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            onKeyDown={onKeyDown}
            className={cn(controlVariants(geometry), className)}
          />
        </Popover.Anchor>
        <Popover.Content
          align="start"
          onOpenAutoFocus={(e) => e.preventDefault()}
          className="max-h-64 overflow-y-auto"
        >
          <AutocompleteContext.Provider value={{ query, activeValue, select }}>
            <AutocompleteList ref={listRef} emptyMessage={emptyMessage}>
              {children}
            </AutocompleteList>
          </AutocompleteContext.Provider>
        </Popover.Content>
      </Popover>
      <FieldError error={field.error} />
    </>
  );
}

function AutocompleteList({
  children,
  emptyMessage,
  ref,
}: {
  children?: ReactNode;
  emptyMessage: string;
  ref?: React.Ref<HTMLDivElement>;
}) {
  // Rendered items self-hide when they don't match; the empty state is a
  // sibling that only shows when nothing else rendered (`only:block`).
  return (
    <div ref={ref} role="listbox" className="flex flex-col">
      {children}
      <EmptyState emptyMessage={emptyMessage} />
    </div>
  );
}

function EmptyState({ emptyMessage }: { emptyMessage: string }) {
  return (
    <p className="autocomplete-empty hidden px-2 py-2 text-sm text-(--color-foreground-muted) only:block">
      {emptyMessage}
    </p>
  );
}

export interface InputAutocompleteItemProps {
  value: string;
  children?: ReactNode;
  className?: string;
}

function InputAutocompleteItem({
  value,
  children,
  className,
}: InputAutocompleteItemProps) {
  const { query, activeValue, select } = useAutocompleteCtx();
  const label = typeof children === "string" ? children : value;
  if (query && !label.toLowerCase().includes(query.toLowerCase())) {
    return null;
  }
  return (
    <button
      type="button"
      role="option"
      data-autocomplete-item=""
      data-value={value}
      // Keyboard navigation previously showed no highlight at all — only
      // `hover:` was styled, so arrow keys gave no visible feedback.
      data-highlighted={activeValue === value ? "" : undefined}
      aria-selected={activeValue === value}
      onClick={() => select(value)}
      className={cn(
        "flex w-full cursor-pointer items-center rounded-(--radius-inline) px-2 py-1.5 text-left text-sm outline-none transition-colors",
        "hover:bg-(--color-accent-soft) hover:text-(--color-accent)",
        "data-[highlighted]:bg-(--color-accent-soft) data-[highlighted]:text-(--color-accent)",
        className,
      )}
    >
      {children}
    </button>
  );
}

export const InputAutocomplete = Object.assign(InputAutocompleteRoot, {
  Item: InputAutocompleteItem,
});
