import { useState, type HTMLAttributes, type ReactNode } from "react";
import { RotateCw, TriangleAlert } from "lucide-react";
import { cn } from "../../util";
import { Breadcrumb } from "../breadcrumb";
import { Button } from "../button";
import { PageContext, usePageContext, type PageMeta } from "./context";
import { usePage } from "./hooks";

interface SlotProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: ReactNode;
}

function PageRoot({ className, children, ...props }: SlotProps) {
  const [meta, setMeta] = useState<PageMeta>({});
  return (
    <PageContext.Provider value={{ meta, setMeta }}>
      <div
        className={cn(
          "page flex h-full w-full overflow-hidden text-(--color-foreground)",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </PageContext.Provider>
  );
}

function PageWrapper({ className, children, ...props }: SlotProps) {
  return (
    <div
      className={cn("page-wrapper flex flex-1 overflow-hidden", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export interface PageContentProps extends SlotProps {
  /**
   * `plain` (default) is a bare scroll region — the pre-existing behaviour.
   * `panel` renders the elevated floating content surface the theme guide
   * describes, so consumers stop hand-rolling it in every app shell.
   */
  variant?: "plain" | "panel";
  /** Applies the standard content inset. */
  padded?: boolean;
}

function PageContent({
  variant = "plain",
  padded,
  className,
  children,
  ...props
}: PageContentProps) {
  return (
    <main
      className={cn(
        "page-content flex-1 overflow-auto",
        variant === "panel" &&
          "m-3 ml-0 rounded-(--radius-panel) border border-(--color-surface-panel-border) bg-(--color-surface-panel) shadow-(--shadow-overlay)",
        padded && "p-6",
        className,
      )}
      {...props}
    >
      {children}
    </main>
  );
}

function PageHeaderTitle({ className, children, ...props }: SlotProps) {
  return (
    <h1
      className={cn(
        "page-header-title text-xl font-semibold text-(--color-foreground)",
        className,
      )}
      {...props}
    >
      {children}
    </h1>
  );
}

function PageHeaderSubtitle({ className, children, ...props }: SlotProps) {
  return (
    <p
      className={cn(
        "page-header-subtitle text-sm text-(--color-foreground-muted)",
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
}

export interface PageHeaderProps extends SlotProps {
  /**
   * Right-aligned action cluster — search, filters, a primary button.
   *
   * Deliberately a prop rather than children: children *replace* the
   * `usePage()` metadata band, so an app shell that needed a search box in the
   * header would otherwise have to re-implement the title and subtitle itself
   * just to sit next to it. `actions` composes with the band instead.
   */
  actions?: ReactNode;
  classNameActions?: string;
}

function PageHeader({
  actions,
  classNameActions,
  className,
  children,
  ...props
}: PageHeaderProps) {
  const ctx = usePageContext();
  const meta = ctx?.meta;
  const showMeta = !children && (meta?.title || meta?.subtitle);

  const band = showMeta ? (
    <>
      {meta?.title ? <PageHeaderTitle>{meta.title}</PageHeaderTitle> : null}
      {meta?.subtitle ? (
        <PageHeaderSubtitle>{meta.subtitle}</PageHeaderSubtitle>
      ) : null}
    </>
  ) : (
    children
  );

  return (
    <header
      className={cn(
        "page-header sticky top-0 z-10 flex flex-col gap-1 border-b border-(--color-panel-header-border) bg-(--color-panel-header-glass) px-6 py-4 backdrop-blur-(--backdrop-blur-header)",
        className,
      )}
      {...props}
    >
      {actions ? (
        <div className="flex items-center gap-4">
          {/* min-w-0 so a long title truncates instead of shoving the
              actions off the right edge. */}
          <div className="flex min-w-0 flex-1 flex-col gap-1">{band}</div>
          <div
            className={cn(
              "page-header-actions flex shrink-0 items-center gap-2",
              classNameActions,
            )}
          >
            {actions}
          </div>
        </div>
      ) : (
        band
      )}
    </header>
  );
}

const PageHeaderWithParts = Object.assign(PageHeader, {
  Title: PageHeaderTitle,
  Subtitle: PageHeaderSubtitle,
  Breadcrumb: Breadcrumb,
});

function PageFooter({ className, children, ...props }: SlotProps) {
  return (
    <footer
      className={cn(
        "page-footer border-t border-(--color-border) px-6 py-3 text-sm text-(--color-foreground-muted)",
        className,
      )}
      {...props}
    >
      {children}
    </footer>
  );
}

function PageSidebarHeader({ className, children, ...props }: SlotProps) {
  return (
    <div
      className={cn(
        "page-sidebar-header border-b border-(--color-border) p-4 font-semibold",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function PageSidebarContent({ className, children, ...props }: SlotProps) {
  return (
    <div
      className={cn("page-sidebar-content flex-1 overflow-y-auto p-4", className)}
      {...props}
    >
      {children}
    </div>
  );
}

function PageSidebarFooter({ className, children, ...props }: SlotProps) {
  return (
    <div
      className={cn(
        "page-sidebar-footer border-t border-(--color-border) p-4",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function PageSidebar({ className, children, ...props }: SlotProps) {
  return (
    <aside
      className={cn(
        "page-sidebar flex w-80 flex-col overflow-hidden border-l border-(--color-surface-panel-border) bg-(--color-surface-panel)",
        className,
      )}
      {...props}
    >
      {children}
    </aside>
  );
}

const PageSidebarWithParts = Object.assign(PageSidebar, {
  Header: PageSidebarHeader,
  Content: PageSidebarContent,
  Footer: PageSidebarFooter,
});

export interface PageErrorProps extends Omit<SlotProps, "title"> {
  title?: ReactNode;
  description?: ReactNode;
  onRetry?: () => void;
  retryLabel?: string;
}

function PageError({
  title = "Something went wrong",
  description,
  onRetry,
  retryLabel = "Retry",
  className,
  children,
  ...props
}: PageErrorProps) {
  return (
    <div
      role="alert"
      className={cn(
        "page-error flex flex-1 flex-col items-center justify-center gap-3 p-10 text-center",
        className,
      )}
      {...props}
    >
      <span
        aria-hidden="true"
        className="mb-1 flex size-12 items-center justify-center rounded-(--radius-pill) bg-(--color-danger-soft) text-(--color-danger)"
      >
        <TriangleAlert className="size-6" />
      </span>
      <h2 className="text-lg font-semibold tracking-tight text-(--color-foreground)">
        {title}
      </h2>
      {description ? (
        <p className="max-w-md text-sm text-pretty text-(--color-foreground-muted)">
          {description}
        </p>
      ) : null}
      {children}
      {onRetry ? (
        // The real Button, not a local class string — so the retry action
        // inherits the system's geometry, focus ring and motion.
        <Button className="mt-2" onClick={onRetry}>
          <RotateCw className="size-4" />
          {retryLabel}
        </Button>
      ) : null}
    </div>
  );
}

/**
 * Application layout shell with navbar, header, content, sidebar, and footer
 * slots. Header metadata can be driven dynamically via `usePage`.
 */
export const Page = Object.assign(PageRoot, {
  Root: PageRoot,
  Wrapper: PageWrapper,
  Content: PageContent,
  Header: PageHeaderWithParts,
  Footer: PageFooter,
  Sidebar: PageSidebarWithParts,
  Error: PageError,
});

export { usePage };
// `usePage` is a setter; `usePageContext` is the matching reader, needed by
// consumers composing their own header chrome around the metadata.
export { usePageContext } from "./context";
export type { PageMeta, PageContextValue } from "./context";
