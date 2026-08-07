import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { Monitor, Moon, Sun } from "lucide-react";
import { cn } from "../../util";
import { useTheme, type Theme } from "../theme";

export interface ThemeSelectorProps {
  className?: string;
  /** Styles each segment. Required by the Styling Exposition rule. */
  classNameItem?: string;
  classNameIcon?: string;
  classNameLabel?: string;
  /** Hide the "system" option. */
  hideSystem?: boolean;
}

const options: { value: Theme; label: string; icon: typeof Sun }[] = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
];

/** Segmented control for switching between light / dark / system themes. */
export function ThemeSelector({
  className,
  classNameItem,
  classNameIcon,
  classNameLabel,
  hideSystem,
}: ThemeSelectorProps) {
  const { theme, setTheme } = useTheme();
  const items = hideSystem
    ? options.filter((o) => o.value !== "system")
    : options;

  return (
    <ToggleGroup.Root
      type="single"
      value={theme}
      onValueChange={(v) => v && setTheme(v as Theme)}
      className={cn(
        "theme-selector inline-flex items-center gap-1 rounded-(--radius-pill) border border-(--color-border) bg-(--color-surface-panel-muted) p-1",
        className,
      )}
    >
      {items.map(({ value, label, icon: Icon }) => (
        <ToggleGroup.Item
          key={value}
          value={value}
          aria-label={label}
          className={cn(
            "theme-selector-item flex cursor-pointer items-center gap-1.5 rounded-(--radius-pill) px-2.5 py-1",
            "text-xs font-medium text-(--color-foreground-muted)",
            "transition-[color,background-color,box-shadow] ease-standard",
            "hover:text-(--color-foreground)",
            "data-[state=on]:bg-(--color-surface-panel) data-[state=on]:text-(--color-foreground) data-[state=on]:shadow-(--shadow-floating)",
            // The segments had no focus indicator at all.
            "outline-none focus-ring",
            classNameItem,
          )}
        >
          <Icon className={cn("size-3.5 shrink-0", classNameIcon)} />
          <span className={cn("hidden sm:inline", classNameLabel)}>{label}</span>
        </ToggleGroup.Item>
      ))}
    </ToggleGroup.Root>
  );
}
