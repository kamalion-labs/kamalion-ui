import { useState, type HTMLAttributes, type ReactNode } from "react";
import { RotateCw } from "lucide-react";
import { cn } from "../../util";
import { Breadcrumb } from "../breadcrumb";
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

function PageContent({ className, children, ...props }: SlotProps) {
  return (
    <main
      className={cn("page-content flex-1 overflow-auto", className)}
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

function PageHeader({ className, children, ...props }: SlotProps) {
  const ctx = usePageContext();
  const meta = ctx?.meta;
  const showMeta = !children && (meta?.title || meta?.subtitle);

  return (
    <header
      className={cn(
        "page-header sticky top-0 z-10 flex flex-col gap-1 border-b border-(--color-panel-header-border) bg-(--color-panel-header-glass) px-6 py-4 backdrop-blur-(--backdrop-blur-header)",
        className,
      )}
      {...props}
    >
      {showMeta ? (
        <>
          {meta?.title ? <PageHeaderTitle>{meta.title}</PageHeaderTitle> : null}
          {meta?.subtitle ? (
            <PageHeaderSubtitle>{meta.subtitle}</PageHeaderSubtitle>
          ) : null}
        </>
      ) : (
        children
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
      <h2 className="text-lg font-semibold text-(--color-foreground)">
        {title}
      </h2>
      {description ? (
        <p className="max-w-md text-sm text-(--color-foreground-muted)">
          {description}
        </p>
      ) : null}
      {children}
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="mt-2 inline-flex items-center gap-2 rounded-(--radius-pill) bg-(--color-accent) px-4 py-2 text-sm font-medium text-(--color-accent-foreground) transition-colors hover:bg-(--color-accent-hover)"
        >
          <RotateCw className="size-4" />
          {retryLabel}
        </button>
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
export type { PageMeta } from "./context";
