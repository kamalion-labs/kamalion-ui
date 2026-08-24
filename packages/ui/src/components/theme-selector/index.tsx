import { Moon, Sun } from "lucide-react";
import { cn } from "../../util";
import { useTheme } from "../theme";
import { Tooltip } from "../tooltip";

export interface ThemeSelectorProps {
  className?: string;
  classNameIcon?: string;
  /** Optional override for aria-label. */
  "aria-label"?: string;
  /** Legacy prop preserved for API compatibility. */
  hideSystem?: boolean;
}

/** Refined icon-only toggle button for switching between light and dark themes. */
export function ThemeSelector({
  className,
  classNameIcon,
  "aria-label": ariaLabel,
}: ThemeSelectorProps) {
  const { theme, setTheme } = useTheme();

  const isDark = theme === "dark";

  const handleToggle = () => {
    setTheme(isDark ? "light" : "dark");
  };

  const label =
    ariaLabel || (isDark ? "Alternar para tema claro" : "Alternar para tema escuro");

  return (
    <Tooltip>
      <Tooltip.Trigger asChild>
        <button
          type="button"
          aria-label={label}
          onClick={handleToggle}
          className={cn(
            "theme-selector inline-flex size-9 cursor-pointer items-center justify-center rounded-(--radius-pill)",
            "border border-(--color-border) bg-(--color-surface-panel-muted)/70 backdrop-blur-md",
            "text-(--color-foreground-muted) shadow-xs",
            "transition-all duration-200 ease-standard",
            "hover:bg-(--color-surface-panel) hover:text-(--color-foreground) hover:border-(--color-border-hover) hover:shadow-(--shadow-floating)",
            "active:scale-95 outline-none focus-ring",
            className,
          )}
        >
          {isDark ? (
            <Sun
              className={cn(
                "size-4 shrink-0 text-amber-400 transition-transform duration-300 hover:rotate-45",
                classNameIcon,
              )}
            />
          ) : (
            <Moon
              className={cn(
                "size-4 shrink-0 transition-transform duration-300 hover:-rotate-12",
                classNameIcon,
              )}
            />
          )}
        </button>
      </Tooltip.Trigger>
      <Tooltip.Content side="bottom" sideOffset={6}>
        {isDark ? "Tema Claro" : "Tema Escuro"}
      </Tooltip.Content>
    </Tooltip>
  );
}

