import type { ReactNode } from "react";
import { Tooltip } from "../tooltip";
import { ToastProvider } from "../toast";
import { ModalProvider } from "../modal";
import { ThemeProvider, type Theme } from "../theme";

export interface KamalionProviderProps {
  children?: ReactNode;
  /** Default toast auto-dismiss duration in ms. */
  toastDuration?: number;
  /** Initial theme. Defaults to "system". */
  defaultTheme?: Theme;
}

/**
 * Single mount point that wires the library's cross-cutting providers: Theme,
 * Tooltip, Toast (`useToast`), and Modal (`useModal`).
 */
export function KamalionProvider({
  children,
  toastDuration,
  defaultTheme,
}: KamalionProviderProps) {
  return (
    <ThemeProvider defaultTheme={defaultTheme}>
      <Tooltip.Provider>
        <ToastProvider duration={toastDuration}>
          <ModalProvider>{children}</ModalProvider>
        </ToastProvider>
      </Tooltip.Provider>
    </ThemeProvider>
  );
}
