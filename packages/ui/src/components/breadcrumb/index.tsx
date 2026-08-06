import { Children, Fragment, isValidElement } from "react";
import { ChevronRight } from "lucide-react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../../util";
import type {
  BreadcrumbCurrentProps,
  BreadcrumbItemProps,
  BreadcrumbLinkProps,
  BreadcrumbProps,
} from "./types";

function BreadcrumbRoot({
  separator,
  className,
  classNameList,
  children,
  ref,
  ...props
}: BreadcrumbProps) {
  const items = Children.toArray(children).filter(isValidElement);
  const sep = separator ?? <ChevronRight className="size-4" aria-hidden="true" />;

  return (
    <nav
      ref={ref}
      aria-label="Breadcrumb"
      className={cn("breadcrumb", className)}
      {...props}
    >
      <ol
        className={cn(
          "breadcrumb-list flex flex-wrap items-center gap-1.5 text-sm",
          classNameList,
        )}
      >
        {items.map((item, index) => (
          <Fragment key={index}>
            {item}
            {index < items.length - 1 && (
              <li
                aria-hidden="true"
                className="breadcrumb-separator text-(--color-foreground-subtle)"
              >
                {sep}
              </li>
            )}
          </Fragment>
        ))}
      </ol>
    </nav>
  );
}

function BreadcrumbItem({
  className,
  children,
  ref,
  ...props
}: BreadcrumbItemProps) {
  return (
    <li
      ref={ref}
      className={cn("breadcrumb-item inline-flex items-center", className)}
      {...props}
    >
      {children}
    </li>
  );
}

function BreadcrumbLink({
  asChild = false,
  className,
  children,
  ref,
  ...props
}: BreadcrumbLinkProps) {
  const Component = asChild ? Slot : "a";
  return (
    <Component
      ref={ref}
      className={cn(
        "breadcrumb-link text-(--color-foreground-muted) transition-colors hover:text-(--color-foreground)",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

function BreadcrumbCurrent({
  className,
  children,
  ref,
  ...props
}: BreadcrumbCurrentProps) {
  return (
    <span
      ref={ref}
      aria-current="page"
      className={cn(
        "breadcrumb-current font-medium text-(--color-foreground)",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}

/**
 * Hierarchical navigation trail. Separators are inserted automatically
 * between items.
 */
export const Breadcrumb = Object.assign(BreadcrumbRoot, {
  Item: BreadcrumbItem,
  Link: BreadcrumbLink,
  Current: BreadcrumbCurrent,
});

export type * from "./types";
