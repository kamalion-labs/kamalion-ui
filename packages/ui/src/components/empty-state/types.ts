import type React from "react";
import type { VariantProps } from "class-variance-authority";
import type { emptyStateVariants } from "./variants";

export interface EmptyStateProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "title">,
    VariantProps<typeof emptyStateVariants> {
  /**
   * Rendered element, not a component type — the chip sizes it. Falls back to
   * an inbox glyph so a bare <EmptyState> still reads as an empty surface.
   */
  icon?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Call-to-action slot. Pass a real <Button> so it inherits the system. */
  action?: React.ReactNode;
  className?: string;
  classNameIcon?: string;
  classNameTitle?: string;
  classNameDescription?: string;
  ref?: React.Ref<HTMLDivElement>;
}
