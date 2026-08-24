import { Search, X } from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "../../util";

export interface HeaderSearchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value?: string;
  onValueChange?: (value: string) => void;
  /** Custom keyboard shortcut badge string. Defaults to "⌘K" on Mac, "Ctrl K" on Windows/Linux. */
  shortcut?: string;
  className?: string;
  classNameInput?: string;
  icon?: ReactNode;
}

/**
 * Elegant glassmorphic search bar with global `Cmd+K` / `Ctrl+K` keyboard shortcut.
 */
export function HeaderSearch({
  value: valueProp,
  onValueChange,
  shortcut,
  placeholder = "Search…",
  className,
  classNameInput,
  icon,
  ...props
}: HeaderSearchProps) {
  const [internalValue, setInternalValue] = useState("");
  const value = valueProp ?? internalValue;
  const inputRef = useRef<HTMLInputElement>(null);

  const isMac =
    typeof navigator !== "undefined" &&
    /Mac|iPod|iPhone|iPad/.test(navigator.platform || "");
  const defaultShortcut = isMac ? "⌘K" : "Ctrl K";
  const displayShortcut = shortcut ?? defaultShortcut;

  // Listen globally for Cmd/Ctrl + K to focus the search bar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        inputRef.current?.select();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInternalValue(val);
    onValueChange?.(val);
  };

  const handleClear = () => {
    setInternalValue("");
    onValueChange?.("");
    inputRef.current?.focus();
  };

  return (
    <div
      className={cn(
        "group/search relative flex h-10 w-full max-w-md items-center rounded-(--radius-pill)",
        "border border-(--color-border) bg-(--color-surface-panel-muted)/60 backdrop-blur-md",
        "text-(--color-foreground) shadow-xs",
        "transition-all duration-200 ease-standard",
        "hover:border-(--color-border-hover) hover:bg-(--color-surface-panel)",
        "focus-within:border-(--color-accent) focus-within:bg-(--color-surface-panel) focus-within:shadow-(--shadow-floating) focus-within:ring-2 focus-within:ring-(--color-accent)/20",
        className,
      )}
    >
      <span className="pointer-events-none absolute left-3.5 flex items-center text-(--color-foreground-muted) transition-colors group-focus-within/search:text-(--color-accent)">
        {icon ?? <Search className="size-4 shrink-0" />}
      </span>

      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={cn(
          "h-full w-full rounded-(--radius-pill) bg-transparent pl-10 pr-16 text-sm font-medium text-(--color-foreground)",
          "placeholder:text-(--color-foreground-subtle)",
          "border-none outline-none focus:outline-none focus:ring-0",
          classNameInput,
        )}
        {...props}
      />

      {value ? (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 flex size-4 items-center justify-center rounded-full text-(--color-foreground-muted) transition-colors hover:bg-(--color-surface-panel-muted) hover:text-(--color-foreground)"
          aria-label="Clear search"
        >
          <X className="size-3" />
        </button>
      ) : (
        <kbd className="pointer-events-none absolute right-3 flex items-center justify-center rounded border border-(--color-border) bg-(--color-surface-panel)/80 px-1.5 py-0.5 text-[10px] font-mono font-medium text-(--color-foreground-muted) shadow-2xs select-none">
          {displayShortcut}
        </kbd>
      )}
    </div>
  );
}
