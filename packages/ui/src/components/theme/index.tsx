import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Theme = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

export interface ThemeContextValue {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within a <ThemeProvider>.");
  }
  return ctx;
};

export interface ThemeProviderProps {
  children?: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

const prefersDark = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

/**
 * Manages the `.theme-light` / `.theme-dark` class on `<html>` (so portaled
 * content inherits tokens), persists the choice, and tracks system preference.
 */
const resolve = (theme: Theme): ResolvedTheme =>
  theme === "system" ? (prefersDark() ? "dark" : "light") : theme;

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "kamalion-theme",
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof localStorage === "undefined") return defaultTheme;
    return (localStorage.getItem(storageKey) as Theme | null) ?? defaultTheme;
  });
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(() =>
    resolve(theme),
  );

  // Single effect keyed on `theme`: applies the class + tracks system changes.
  // `setResolvedTheme` here can't re-trigger the effect (deps are [theme]).
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = () => {
      const next: ResolvedTheme =
        theme === "system" ? (mq.matches ? "dark" : "light") : theme;
      setResolvedTheme(next);
      const root = document.documentElement;
      root.classList.remove("theme-light", "theme-dark");
      root.classList.add(`theme-${next}`);
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [theme]);

  // Keep tabs in sync. `storage` only fires in *other* tabs, so this never
  // echoes the local `setTheme` write.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== storageKey) return;
      setThemeState((e.newValue as Theme | null) ?? defaultTheme);
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [storageKey, defaultTheme]);

  const setTheme = (next: Theme) => {
    setThemeState(next);
    try {
      localStorage.setItem(storageKey, next);
    } catch {
      /* ignore persistence failures (private mode, SSR) */
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
