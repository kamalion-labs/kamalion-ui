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
  const sep = separator ?? (
    <ChevronRight className="size-3.5 opacity-60" aria-hidden="true" />
  );

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
        // `-mx-1 px-1` keeps the focus ring off the text without shifting the
        // trail's optical alignment. The link had no focus indicator at all.
        "breadcrumb-link -mx-1 max-w-40 truncate rounded-(--radius-inline) px-1",
        "text-(--color-foreground-muted) transition-colors hover:text-(--color-foreground)",
        "outline-none focus-ring",
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
        "breadcrumb-current max-w-52 truncate font-medium text-(--color-foreground)",
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
