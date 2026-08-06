import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { cn } from "../../../util";
import { Popover } from "../../popover";
import { useInputField } from "../hooks";
import { controlBase, FieldError } from "../shared";

interface AutocompleteCtx {
  query: string;
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
  className?: string;
  children?: ReactNode;
}

function InputAutocompleteRoot({
  value,
  onValueChange,
  placeholder,
  emptyMessage = "No results",
  className,
  children,
}: InputAutocompleteProps) {
  const field = useInputField<string>({ value, onValueChange });
  const [open, setOpen] = useState(false);
  const query = field.value ?? "";

  const select = (next: string) => {
    field.setValue(next);
    setOpen(false);
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
            className={cn(controlBase, className)}
          />
        </Popover.Anchor>
        <Popover.Content
          align="start"
          onOpenAutoFocus={(e) => e.preventDefault()}
          className="max-h-64 overflow-y-auto p-1"
        >
          <AutocompleteContext.Provider value={{ query, select }}>
            <AutocompleteList emptyMessage={emptyMessage}>
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
}: {
  children?: ReactNode;
  emptyMessage: string;
}) {
  // Rendered items self-hide when they don't match; if all hide, cmdk-less
  // empty detection is done via a wrapper that checks rendered output.
  return (
    <div className="flex flex-col">
      {children}
      <EmptyState emptyMessage={emptyMessage} />
    </div>
  );
}

function EmptyState({ emptyMessage }: { emptyMessage: string }) {
  // A sibling that shows only when no Item rendered visible content.
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
  const { query, select } = useAutocompleteCtx();
  const label = typeof children === "string" ? children : value;
  if (query && !label.toLowerCase().includes(query.toLowerCase())) {
    return null;
  }
  return (
    <button
      type="button"
      onClick={() => select(value)}
      className={cn(
        "flex w-full items-center rounded-(--radius-card) px-2 py-1.5 text-left text-sm outline-none transition-colors hover:bg-(--color-accent-soft) hover:text-(--color-accent)",
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
